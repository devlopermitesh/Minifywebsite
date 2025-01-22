"use client"
import React, { useState } from 'react'
import { createBrowserClient} from '@supabase/ssr'
import { Database } from "@/types_db"
import {SessionContextProvider} from "@supabase/auth-helpers-react"
const SuperBaseProvider = ({children}:{children:React.ReactNode}) => {
    const [superbaseClient]=useState(()=>createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!))
return (
    <SessionContextProvider supabaseClient={superbaseClient}>
        {children}
    </SessionContextProvider>
)
}

export default SuperBaseProvider