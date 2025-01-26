"use client"
import Box from '@/components/Box'

import Button from '@/components/Button'
import Header from '@/components/Header'
import { useSubscribeModel } from '@/hook/useSubscribeModel'
import { useUser } from '@/hook/useUser'
import { Postdata } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const router=useRouter()
  const [loading,setloading]=useState(false)
  const {subscription,user,isloading}=useUser()

useEffect(()=>{
    if(!isloading && !user){
router.replace('/')
    }
},[user,subscription,router,isloading])
const redirectTocustomerPortal=async()=>{
  setloading(true)
  try {
    const {url,error}=await Postdata("/api/create-portal-link")
    if(error) throw error
    window.location.assign(url)
  } catch (error) {
    console.log("Error",error)
    toast.error("Something went wrong ,try again later")
  }
  finally{
  setloading(false)
  }
}
  return (
    <Box>
<Header>
  <div className='mb-2 flex flex-col gap-y-6'>
    <h1 className='text-white font-semibold text-3xl'>Account Settings</h1>
    
    </div>
</Header>
<div className='mb-7 px-6 '>
  {!subscription && (<div className='flex flex-col gap-y-4'>
    <h1 className='text-white font-semibold text-3xl'>No Active Plan</h1>
  </div>)}
  {
    subscription && (<div className='flex flex-col gap-y-4 text-center items-center'>
      <h1 className='text-white font-semibold text-xl mx-auto'>You are currently on the {subscription?.prices?.product?.name} plan</h1>
      <Button disabled={loading} onClick={redirectTocustomerPortal} className='w-[300px] mx-auto'>Open customer portal</Button>
    </div>)
  }


      </div>
    </Box>
    )
}

export default Page