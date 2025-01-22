"use client"
import { useLoadingImage } from '@/hook/useLoadingImage'
import { Songs } from '@/types_db'
import Image from 'next/image'
import React from 'react'
import { FaPlay } from 'react-icons/fa'
interface SongitemProps{
 keyvalue:number,
 data:Songs ,
 onclick:()=>void

}
const Songitem:React.FC<SongitemProps> = ({data,onclick,keyvalue}) => {

    const imagePath =useLoadingImage(data)
  return (
    <div onClick={onclick} key={keyvalue} className='relative group flex flex-col items-center justify-center rounded-md bg-neutral-400/10 hover:bg-neutral-400/20 transition p-3'>
        <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
            <Image className='object-cover w-full h-full' src={(imagePath)?imagePath:"/images/liked.png"} width={100} height={100} alt='song image' />
        </div>
        <div className='flex flex-col items-start w-full p-4 gap-y-3'>
<p className='font-semibold truncate w-full'>{data.title}</p>
<sub className='font-semibold text-sm  text-neutral-400'>{data.aurthor}</sub>

 <div className='absolute right-5 mb-auto bottom-28 flex justify-center items-center drop-shadow-md hover:scale-110 opacity-0 group-hover:opacity-100 transition bg-green-500 rounded-full p-3 text-black '>
        <FaPlay />
        </div>
        </div>
    </div>
  )
}

export default Songitem