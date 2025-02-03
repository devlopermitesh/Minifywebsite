import { useAuthModel } from '@/hook/useAuthModel'
import { useuploadModel } from '@/hook/useUploadModel'
import { useUser } from '@/hook/useUser'
import { Songs } from '@/types_db'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import MediaItem from './MediaItem'
import useplaysong from '@/hook/useplaysong'
import { useSubscribeModel } from '@/hook/useSubscribeModel'

function Library({Songs}:{Songs:Songs[]}) {
  const {user,subscription}=useUser()
  
  const {onOpen}=useAuthModel((state)=>state)
  const {onOpen:subscribeOpen}=useSubscribeModel((state)=>state)
  const {onOpen:uploadOpen}=useuploadModel((state)=>state)
  const playSong=useplaysong({songs:Songs})
  const handleAdd=()=>{
    if(!user){
        return onOpen()
    }
 if(!subscription){
  return subscribeOpen()
 }

    uploadOpen()
    
  }

  return (
   <div className='flex flex-col relative z-10 '>
    <div className='flex justify-between items-center px-5 pt-4  '>
        <div className='inline-flex  items-center gap-x-2 '>
<TbPlaylist size={20}/>
<p className='text-neutral-400 font-medium text-md'>Your Library</p>

        </div>
        <AiOutlinePlus onClick={handleAdd} size={20} className='text-neutral-400 cursor-pointer hover:text-white transition z-50 '/>
    </div>
<div className='flex flex-col gap-y-2 mt-4 px-3'>
list of songs
<div className='w-full h-auto border border-neutral-800 flex flex-col gap-y-2 p-2'>


{Songs.map((song,index)=>(
  <div key={song.id} className='relative flex flex-row group truncate'>
    <MediaItem className='hover:bg-neutral-700 cursor-pointer  flex-1' key={song.id} keyvalue={index} Song={song} onclick={() => 
        {
            playSong(song.id)

        } 

        }
        />

</div>))}
</div>
</div>
   </div>
  )
}

export default Library