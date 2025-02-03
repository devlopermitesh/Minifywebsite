"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import liked from '../../asserts/Images/liked.png'
import { Songs } from '@/types_db'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hook/useUser'
import { BiLoader } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import SongContent from '../search/SongContent'
const Page= () => {
    const [loading,setisloading]=useState(true)
    const [songs,setSongs]=useState<Songs[]>([])
    const supabaseclient=useSupabaseClient()
    const {isloading,user}=useUser()
    const router=useRouter()
    const getlikedSongs=async()=>{
        try {
            setisloading(true)
            const {data,error}=await supabaseclient.from('liked_songs').select('*,songs(*)').eq("user_id",user?.id).order('created_at',{ascending:false})
            if(error){
                console.log(error)
                return
            }
           const likedsongs=data.map((song)=>song.songs).flat(1)
            setSongs(likedsongs)
        } catch (error) {
            console.log(error)
            setSongs([])
        }finally{
            setisloading(false)
        }
    }

    useEffect(()=>{
        if(!user && !isloading){
            router.replace('/')
        }
getlikedSongs()
    },[user?.id,supabaseclient,setSongs,getlikedSongs,isloading,router])
if(loading){
    return (<div className='flex justify-center items-center h-full w-full'>
<BiLoader className='animate-spin' size={24}/>
    </div>

    )
}
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header >
            <div className='flex flex-col md:flex-row items-center gap-x-5'>
                <div className='relative h-32 w-32 lg:w-44 lg:h-44 rounded-full overflow-hidden'>
                    <Image fill src={liked.src} alt='liked' className='object-cover'/>
                </div>
                <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
<p className='hidden md:block font-semibold text-sm'>Playlist</p> 
<h2 className='text-white text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl'>Liked Songs</h2>
                    </div>
                </div>
        </Header>
        <SongContent Songs={songs} />
        </div>
  )
}
export default Page