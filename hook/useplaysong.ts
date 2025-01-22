import React from "react"
import { useUser } from "./useUser"
import { useAuthModel } from "./useAuthModel"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Songs } from "@/types_db"
import usePlayer from "./usePlayer"
const useplaysong=({songs}:{songs:Songs[]})=>{
const player=usePlayer()
 const {user}=useUser()
 const {onOpen}=useAuthModel()   
 const supaBaseClient=useSupabaseClient()

 const PlaySong=async(id:number)=>{
    if(!user || !supaBaseClient) return onOpen()
player.setActiveId(id)
player.setIds(songs.map(song=>song.id))
 }
 return PlaySong
}
export default useplaysong