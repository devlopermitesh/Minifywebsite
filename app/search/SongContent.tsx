import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import TopSearch from '@/components/TopSearch'
import useplaysong from '@/hook/useplaysong'
import { Songs } from '@/types_db'
import React from 'react'
import { FaPlay } from 'react-icons/fa'
interface SongContentProps {
    Songs:Songs[],
    className?:string
}
const SongContent : React.FC<SongContentProps> = ({Songs,className}) => {
    const playSong = useplaysong({ songs: Songs });
    if(Songs.length===0){
        return <div className=' w-full h-auto py-10 text-3xl text-neutral-200 font-semibold text-center'>No results found</div>
    }
  return (
<div className='w-full flex flex-row h-auto justify-around  mt-10'>
    <div className='  w-1/2 px-3 py-2 hidden lg:block'>
    <h2 className='text-neutral-200 text-2xl font-semibold'>Top result</h2>
        <TopSearch data={Songs[0]} onclick={() => playSong(Songs[0].id)} />
    </div>
    <div className=' w-full lg:w-1/2 '>
    <h2 className='text-neutral-200 text-2xl font-semibold hover:underline'>Songs</h2>
<div className='flex flex-col gap-4 h-96 overflow-y-auto '>
{Songs.map((song,index)=>(<div key={song.id} className='relative flex flex-row group'>
    <FaPlay className='absolute top-5 left-5 z-50 opacity-0 group-hover:opacity-100'/>
    <MediaItem className='hover:bg-neutral-700 cursor-pointer  flex-1' key={song.id} keyvalue={index} Song={song} onclick={() => playSong(song.id)} />
<LikeButton songId={song.id}/>
<div>

</div>
</div>))}

 </div>
    </div>
</div>

  )
}

export default SongContent