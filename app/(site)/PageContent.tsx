"use client"
import { Songs } from '@/types_db'
import React from 'react'
import Songitem from './Songitem'
import useplaysong from '@/hook/useplaysong'
interface PageContentProps {
 Songs:Songs[]   
}
const PageContent:React.FC<PageContentProps> = ({Songs}) => {
  const  PlaySong =useplaysong({songs:Songs})
    if(Songs.length===0){
        return(
            <p className='mt-4 text-neutral-400'>no songs is there</p>
        )
    }
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-4'>
        {Songs.map((song)=>(<Songitem key={song.id} data={song} onclick={()=>{PlaySong(song.id)}} keyvalue={song.id}></Songitem>))}
    </div>
  )
}

export default PageContent