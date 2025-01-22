"use client"
import { User, useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

import { Subscription,UserDetails } from "@/types";
import React, { useContext, useEffect } from "react";

type UserContextType={
    accessToken: string | null;
    user:User | null;
    userDetails:UserDetails | null;
    isloading:boolean;
    subscription:Subscription | null;
}

export const UserContext=React.createContext<UserContextType|undefined>(undefined)

export interface Props{
[propsProvided:string]:any
}

export const UserProvider=(props:Props)=>{
    const {session,isLoading:isloadingUser,supabaseClient:supabase}=useSessionContext()
    const user= useSupaUser()
    const accessToken=session?.access_token ?? null
    const [isloadingData,setIsloadingData]=React.useState<boolean>(true)
    const [userDetails,setUserDetails]=React.useState<UserDetails | null>(null)
    const [subscription,setSubscription]=React.useState<Subscription | null>(null)
   
    const getUserDetails=()=>supabase.from('users').select('*').single()
    const getSubscription=()=>supabase.from('subscriptions').select('*,prices(*,products(*))').in('status',['active','trialing']).single()
   useEffect(()=>{
    if(user && isloadingData&& !userDetails && !subscription){
   setIsloadingData(true);
   Promise.allSettled([getUserDetails(),getSubscription()]).then((result)=>{
     const userDetailsPromise=result[0]  
     const subscriptionPromise=result[1]

     if(userDetailsPromise.status==='fulfilled')setUserDetails(userDetailsPromise.value.data as UserDetails)
     if(subscriptionPromise.status==='fulfilled')setSubscription(subscriptionPromise.value.data as Subscription)   
     setIsloadingData(false)
   })
    }
    else if(!user && !isloadingData && !isloadingUser){
        setUserDetails(null)
        setSubscription(null)
        setIsloadingData(false)
    
    }
   },[user,isloadingData])
    
const value={
    accessToken,
    user,
    userDetails,
    subscription,
    isloading:isloadingUser||isloadingData
}

return <UserContext.Provider value={value} {...props}/>
}

export const useUser=()=>{
    const context=useContext(UserContext)
    if(context===undefined){
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
} 