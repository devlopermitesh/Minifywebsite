import { useLoadingImage } from '@/hook/useLoadingImage'
import { Songs } from '@/types_db'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const MediaItem = ({keyvalue, Song,className,onclick}:{Song:Songs,keyvalue:number,className?:string,onclick?:(id:number)=>void}) => {
    const public_url=useLoadingImage(Song)
  return (
    <div key={keyvalue} className={twMerge(`flex items-center gap-x-2`,className)} onClick={()=>onclick && onclick(Song.id)}>
  <Image 
    src={public_url ? public_url : "/images/liked.png"} 
    alt={Song.title} 
    width={50} 
    height={50} 
    className="rounded-md transition-all duration-300" 
  />
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>

<div className='flex flex-col'>
<p className='text-white text-sm group-hover:underline truncate'>{Song.title}</p>
<p className='text-neutral-400 text-sm truncate'>{Song.aurthor}</p>
    </div>
    </div>
  )
}

export default MediaItem