"use client"
import React from "react"
import {UserProvider} from "./useUser"


export const UserProviderClient=({children}:{children:React.ReactNode})=>{
    return(<UserProvider >{children}</UserProvider>)
}

