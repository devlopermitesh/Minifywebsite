import { Database } from "@/types_db";
import { createBrowserClient } from "@supabase/ssr";
import Stripe from "stripe";
import { TodateTime } from "./helpers"; 
import {stripe} from "./stripe"
export const supabaseAdmin = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const upsertProductRecords = async (product: Stripe.Product) => {
  try {
    const ProductData: Database['public']['Tables']['products']['Insert'] = {
      id: product.id ?? '',
      name: product.name,
      description: product.description ?? '',
      active: product.active,
      image: product.images?.[0] ?? '',
      metadata: product.metadata ?? null,
    };
  
    if (!ProductData.id) {
      throw new Error('Product ID is required');
    }

    const { error } = await supabaseAdmin.from("products").upsert([ProductData]);

    if (error) {
      throw error;
    }

    console.log("Product upserted successfully", product);
  } catch (error) {
    console.log("Error upserting product", product, error);
  }
};


const upertPriceRecords = async (price: Stripe.Price) => {
    try {
 const PriceData:Database['public']['Tables']['prices']['Insert']={
id:price.id,
product_id:price.product as string,
active:price.active,
currency:price.currency,
//they sorry a typo 
// @ts-ignore
description:price.nickname??'',
type:price.type,
unit_amount:price.unit_amount ?? undefined,
interval: price.recurring?.interval ?? 'month', 
interval_count: price.recurring?.interval_count ?? 1,
trial_period_days:price.recurring?.trial_period_days ?? 14,
metadata:price.metadata,
 }
        const {error}=await supabaseAdmin.from("prices").upsert([PriceData])
        if(error){
            throw error
        }
        console.log("Price upserted successfully", price);
    } catch (error) {
        console.log("Error upserting payment", price, error);
    }
}

const retrievCustomer=async({email,uiid}:{email:string,uiid:string})=>{
 try {
 const {data,error}=await supabaseAdmin.from('customers').select('stripe_customer_id').eq('id',uiid).single()  
 if(error || !data.stripe_customer_id){
  const customerData:{metadata:{supabaseUUID:string},email?:string}= {
    metadata:{supabaseUUID:uiid}}
    if(email) customerData.email=email
    const customer= await stripe.customers.create(customerData);
    const {error:SupabaseError}=await supabaseAdmin.from('customers').insert([{id:uiid,stripe_customer_id:customer.id}])
    if(SupabaseError) throw SupabaseError
    return customer.id

} 

 return data?.stripe_customer_id
 } catch (error) {
    console.log("Error upserting payment", error);
    return undefined;
 }   
}

const copyBillingDetails=async({uiid,payment_method}:{uiid:string,payment_method:Stripe.PaymentMethod})=>{
  //get customer
  //get important details from payment.billing_details(name,phone,address)
  //update customer to strip
  //update user to supabase
  const customer=payment_method.customer as string
  const {name,address,phone}=payment_method.billing_details
  if(!name || !address || !phone) return ;
  //@ts-ignore
  await stripe.customers.update(customer,{name:name??'',phone:phone??'',address:address??{}})
  const {data,error}=await supabaseAdmin.from('users').update({billing_details:{...address},payment_method:{...payment_method[payment_method.type]}}).eq('id',uiid)
  if(error ||!data){
    throw error
  }
return data
}

const manageSubscriptionStatusChange=async(subscriptionId:string,customerId:string,createAction=false)=>{
  //get customer from supabase
  //retrieve subscritpion details(current status, next payment date, amount, billing cycle, customer ka information)
  //create subscriptionsDAta
  //insert into supabase


  try {
    const {data:CustomerData,error:CustomerError}=await supabaseAdmin.from('customers').select('id').eq('stripe_customer_id',customerId).single()
    if(CustomerError) throw CustomerError;
    const {id:uuid}=CustomerData;

    const subscription=await stripe.subscriptions.retrieve(subscriptionId,{expand:['customer','default_payment_method']})
    console.log("i received subscription  from strip",subscription)

    const subscriptionData:Database['public']['Tables']['subscriptions']['Insert']={
    id:subscription.id,
    user_id:uuid,
    metadata:subscription.metadata,
    status: (subscription.status === 'active' || subscription.status === 'trialing' || subscription.status === 'canceled' || subscription.status === 'incomplete' || subscription.status === 'incomplete_expired' || subscription.status === 'past_due' || subscription.status === 'unpaid') ? subscription.status : null,
    price_id:subscription.items.data[0].price.id,
    //@ts-ignore
    quantity:subscription.quantity || 0,
    created:TodateTime(subscription.created).toISOString(),
    cancel_at_period_end:subscription.cancel_at_period_end,
    cancel_at:subscription.cancel_at ? TodateTime(subscription.cancel_at).toISOString():null,
    canceled_at:subscription.canceled_at ? TodateTime(subscription.canceled_at).toISOString():null,
    current_period_end:TodateTime(subscription.current_period_end).toISOString(),
    current_period_start:TodateTime(subscription.current_period_start).toISOString(),
    ended_at:subscription.ended_at ? TodateTime(subscription.ended_at).toISOString():null,
    trial_end:subscription.trial_end ? TodateTime(subscription.trial_end).toISOString():null,
    trial_start:subscription.trial_start ? TodateTime(subscription.trial_start).toISOString():null,
    }
console.log("here what i save in supabase",subscriptionData);

const {data,error}=await supabaseAdmin.from("subscriptions").insert([subscriptionData])
if(error){
  throw error
}

console.log("Subscription upserted successfully for user",uuid, subscription)

if(createAction && subscription.default_payment_method && uuid){
  await copyBillingDetails({uiid:uuid,payment_method:subscription.default_payment_method as Stripe.PaymentMethod})

}


  } catch (error) {
    console.log("Error upserting payment subscription Status", error);
  }

}

export {
  upsertProductRecords,
  upertPriceRecords,
  retrievCustomer,
  copyBillingDetails,
  manageSubscriptionStatusChange

}
