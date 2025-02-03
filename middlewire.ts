import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function Middleware() {
  const cookieStore = await cookies()
    const supabaseClient =await createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { getAll: () => cookieStore.getAll(), setAll: (cookiesToSet) => { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {} } } });

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return NextResponse.redirect('/');
    return NextResponse.next();
}
