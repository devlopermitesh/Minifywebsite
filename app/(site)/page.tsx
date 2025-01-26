"use client"
import Header from "@/components/Header";
import LikeItem from "@/components/LikeItem";
import liked from "../../asserts/Images/liked.png"
import { useEffect, useState } from "react";
import { Songs } from "@/types_db";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import PageContent from "./PageContent";
export default function Home() {
  const [songs,setSongs]=useState<Songs[]>([])
  const supabaseClient=useSupabaseClient()
  useEffect(()=>{
    const Getsongs=async()=>{
      try {
      const songs=await supabaseClient.from('songs').select('*').order('created_at',{ascending:false}) as any; 
      console.log("songs",songs)

      if(songs){
setSongs(songs.data)
      }
      } catch (error) {
        console.error(error)
        setSongs([])
      }
    }
  Getsongs()
  },[setSongs,supabaseClient])

  return (
  <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
<Header>
  <h1 className="text-white font-bold text-2xl ">Welcome Back</h1>
<LikeItem image={liked.src} name=' Liked Songs' href='/liked'/>
  </Header>
  <div className="mt-2 mb-7 px-6">
    <div className="flex justify-start items-center  w-auto">
      <h1 className="text-white text-xl  font-semibold">Newest songs</h1>
    </div>
<PageContent Songs={songs}/>
    </div>
  </div>
  );
}
