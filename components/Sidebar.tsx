"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import { HiHome,  } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SideBarItem from './SideBarItem';
import Library from './Library';
import { useUser } from '@/hook/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Songs } from '@/types_db';
import { twMerge } from 'tailwind-merge';
import usePlayer from '@/hook/usePlayer';
interface SidebarProps{
    children: React.ReactNode,


}
const Sidebar:React.FC<SidebarProps> = ({children}) => {
    const [songsUserId,setsongsUserId]=React.useState<Songs[]>([])
    const {user}=useUser()
    const player=usePlayer((state)=>state)
   const supabaseclient=useSupabaseClient()
    const pathname = usePathname();
    const Route=useMemo(()=>[
        {   icon:HiHome,
            label:"Home",
            active:pathname!=="/search",
            href:'/',

        },
        {  icon:BiSearch,
            label:"Search",
            active:pathname==="/search",
            href:'/search',
        }
    ],[pathname])
    useEffect(()=>{
      const getsongsByUserId=async()=>{
       try {
        const songs=await supabaseclient.from('songs').select('*').eq('user_id',user?.id).order('created_at',{ascending:false});
        if(songs.data){
          
       setsongsUserId(songs.data)
        }

       } catch (error) {
        console.log(error)
        setsongsUserId([])
       } 
      }
      getsongsByUserId()
    },[user,supabaseclient])
  return (
    <div className={twMerge(` flex h-full `,player.activeId && "h-[calc(100%-80px)]")}>
        <div className='hidden md:flex flex-col space-y bg-black w-[300px] p-2 '>
        <Box>
  <div className='flex flex-col gap-y-2 px-5 py-4'>
{Route.map((route)=>(<SideBarItem key={route.label}  {...route}></SideBarItem>))}
  </div>
    </Box>
    <Box className='h-full mt-2 overflow-y-auto'>
    <Library Songs={songsUserId}/>
    </Box>
        </div>
        <main className='h-full flex-1 overflow-y-auto py-2'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar