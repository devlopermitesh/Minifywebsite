import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {stripe} from "../../../lib/stripe"
import {getUrl} from "../../../lib/helpers"
import {retrievCustomer} from "../../../lib/SupaBaseAdmin"

export async function POST(request: NextRequest) {
    const {price,quantity=1,metadata={}}=await request.json();
    const cookieStore = await cookies()
  try {
    
   const supabase =await createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { getAll: () => cookieStore.getAll(), setAll: (cookiesToSet) => { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {} } } });
   const {data:{user}}=await supabase.auth.getUser()
   const customer=await retrievCustomer({
    uiid:user?.id || '', 
    email:user?.email||''
   })
 const session=await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    customer:customer || '',
    mode:"subscription",
    allow_promotion_codes:true,
    subscription_data:{
        metadata
    },
    success_url: `${getUrl()}/account`,
    cancel_url: `${getUrl()}`,
    line_items: [
        {
            price:price.id,
            quantity:quantity
        }
    ]
 })
return NextResponse.json({sessionId:session.id})

  } catch (error) {
    console.log(error)
    return NextResponse.json({"Internal Error":error},{status:500})
  }
}
