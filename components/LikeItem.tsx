"use client"
import Image from 'next/image'
import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
interface LikeItemProps {
image:string,
name:string,
href:string,

}
const LikeItem:React.FC<LikeItemProps> = ({image,name,href}) => {
    const router=useRouter()
    const onClick=()=>{
router.push(href)
    }
  return (
    <button onClick={onClick} className='relative group flex items-center rounded-md space-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-7  '>
        <div className='relative min-h-[64px] flex '>
<Image src={image} alt='like image ' width={64} height={64} className='object-cover'></Image>
<p className='font-medium truncate py-5'>
{name}</p>
        </div>
         {/* like button  */}
        <div className='absolute right-0 flex justify-center items-center drop-shadow-md hover:scale-110 opacity-0 group-hover:opacity-100 transition bg-green-500 rounded-full p-2 '>
        <FaPlay />
        </div>

    </button>
  )
}

export default LikeItem