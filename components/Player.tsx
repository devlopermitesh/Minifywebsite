"use client"
import { useAuthModel } from '@/hook/useAuthModel'
import { useLoadingSong } from '@/hook/useLoadingSong'
import usePlayer from '@/hook/usePlayer'
import { useUser } from '@/hook/useUser'
import { Songs } from '@/types_db'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import PlayerContent from './PlayerContent'

const Player = () => {
//   const { user } = useUser()
//   const { activeId } = usePlayer()
//   const supabaseClient = useSupabaseClient()
//   const [currentSong, setCurrentSong] = useState<Songs | null>(null)
//   const {onOpen}=useAuthModel()
const { user } = useUser()
const { activeId } = usePlayer()
const supabaseClient = useSupabaseClient()
const { onOpen } = useAuthModel()
const [currentSong, setCurrentSong] = useState<Songs | null>(null)
  const previewUrl =  useLoadingSong(currentSong)

  const getSongById = async (id: number) => {
    if (!user || !supabaseClient) return onOpen()

    try {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        toast.error("Error occurred while fetching song")
        return
      }

      if (data) {
        console.log("Your song is", data)
        setCurrentSong(data)
      }
    } catch (error) {
      console.error(error)
      toast.error("Error occurred while fetching song")
    }
  }

  useEffect(() => {
    if (activeId !== null) {
      getSongById(activeId)
    }
  }, [activeId, supabaseClient, user]) 

  if(!currentSong || !previewUrl || !activeId|| !user){
    return <div></div>

  }
  return (
    <div className='w-full h-[80px]  fixed bottom-0 left-0 right-0 bg-black text-white p-4 shadow-lg'>
     <PlayerContent Song={currentSong} keyIndex={previewUrl} SongUrl={previewUrl} />
    </div>
  )
}

export default Player
