"use client"
import React, { useEffect, useState } from 'react'
import Modals from './Modals'
import {Price, Product} from "@/types"
import { useUser } from '@/hook/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useAuthModel } from '@/hook/useAuthModel'
import Button from './Button'
import { toast } from 'react-toastify'
import { Postdata } from '@/lib/helpers'
import { getStripe } from '@/lib/stripeClient'
import { useSubscribeModel } from '@/hook/useSubscribeModel'

interface ProductWithPrice extends Product {
    prices:Price[]

}
const FormatPrice=(price:Price):string=>{
    const pricestring=new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,

    }).format((price.unit_amount ?? 0) / 100)
    return pricestring

}
const SubscribeModel = () => {
    const {onClose,isOpen,onOpen:onOpenSubscribe}=useSubscribeModel()
    const [products,setproducts]=useState<ProductWithPrice[]>([])
    const [loading,setloading]=useState<boolean>(false)
    const {user,subscription}=useUser()
    const supabaseuser= useSupabaseClient()
    const{onOpen}=useAuthModel()
const handleCheckout=async(price:Price)=>{

    setloading(true)
if(!user){
    setloading(false)
    return toast.error("Login to checkout",{theme:"colored"})
}
if(subscription){
    setloading(false)
    return toast("You are already subscribed",{theme:"colored"})
}
try {
    const {sessionId}=await Postdata("/api/create-checkout-session",{price})
    const stripe=await getStripe()
    stripe?.redirectToCheckout({sessionId})
        
} catch (error) {
    console.log("Error",error)
}finally{
    setloading(false)
}

}




    useEffect(()=>{
async function fetchProduct(){
try {
    if(!user|| !supabaseuser) {
        console.log("No user")
onOpen()
return 
    }
    const Products=await supabaseuser.from('products').select('*, prices(*)').eq('active', true).eq('prices.active', true).order('metadata->index').order("unit_amount", { foreignTable: "prices" });
    if(Products.error || !Products.data){
console.log(Products.error)
return undefined;
    }
setproducts(Products.data)

} 
catch (error) {
    console.log("Error ",error)
    setproducts([])
}
}
fetchProduct()

    },[user])

  return (
    <Modals title='Only for Premium user'  description='by subscribing you can get access to premium features' isopen={isOpen} onchange={(open)=>onClose()}>
        
{(products.length===0)?(
    <div >
        <p className='text-white text-center'>
            No products found
        </p>
        </div>
):(
    <div>
        
{ 
    products.map((product)=>{
        if(!product.prices || product.prices.length===0) return (<div key={product.id}><p className='text-white text-center'>No price found</p></div>);

        return (

            product.prices.map((price)=>(
                    <Button onClick={()=>(subscription)?(null):handleCheckout(price)}
                    disabled={loading}
                        key={price.id} 
                        className={`${
                            price.id === subscription?.price_id 
                            ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white' 
                            : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-neutral-300 shadow-lg'
                        } hover:from-green-500 hover:to-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 px-4 py-2 rounded-lg`}
                    >
                        {subscription?.price_id === price.id ? (
                            `You are already subscribed for ${FormatPrice(
                                price
                            )} ${price.currency}`
                        ) : (
                            `Subscribe for ${FormatPrice(price)} ${
                                price.currency
                            }`
                        )}
                    </Button>
                    
            ))
        )
        

    })
}
    </div>
)}
    </Modals>
  )
}

export default SubscribeModel