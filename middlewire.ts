import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextResponse,NextRequest } from "next/server";
export async function middleware(req:NextRequest) {
    const superBaseClient=await useSupabaseClient()
    const session=await superBaseClient.auth.getSession()
    return NextResponse.next()
}