import Modals from '@/components/Modals'
import { useAuthModel } from '@/hook/useAuthModel'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import {
    ThemeSupa,
  } from '@supabase/auth-ui-shared'
  
const AuthModelProvider = () => {
    const {isOpen,onClose,onOpen}=useAuthModel((state)=>state)
    const superbaseclient=useSupabaseClient()
    const router=useRouter()
    const {session}=useSessionContext()
useEffect(()=>{
if(session){
    router.refresh()
    onClose()
}
else{
    onOpen()
}
},[session,router,onClose])
  return (

    <Modals title='login Form' description='please login to continue ' isopen={isOpen} onchange={isOpen?onClose:onOpen}>
      <Auth magicLink theme='dark' supabaseClient={superbaseclient} appearance={{ theme: ThemeSupa }}  providers={['google', 'facebook']} />
    </Modals>
  )
}

export default AuthModelProvider