import {cookies} from 'next/headers' 
import {createServerClient} from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import {stripe} from '@/lib/stripe'
import { getUrl } from '@/lib/helpers'
import { retrievCustomer } from '@/lib/SupaBaseAdmin'

export async function POST(){
  const cookieStore = await cookies()
  try {
    const supabase=await createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { getAll: () => cookieStore.getAll(), setAll: (cookiesToSet) => { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {} } } });

    const {data:{user}}=await supabase.auth.getUser()
    if(!user) throw new Error('User not found')
    const customer=await retrievCustomer({uiid:user.id,email:user.email||''})
  console.log("customer",customer,user.id,user.email)
if(!customer) throw new Error('Customer not found')

    const session=await stripe.billingPortal.sessions.create({
      customer:customer,
      return_url:`${getUrl()}/account`
    })
    console.log("session",session)
    return NextResponse.json({url:session.url})
  } catch (error) {
    console.log(error)
    return NextResponse.json({"error":error}, {status:500})
  }

}