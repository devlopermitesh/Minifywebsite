"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import { useAuthModel } from '@/hook/useAuthModel'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hook/useUser'
import { FaUserAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
interface HeaderProps {
 children:React.ReactNode   
 className?:string
}
const Header:React.FC<HeaderProps> = ({children,className}) => {
    const {onOpen}=useAuthModel((state)=>state)
    const superbaseclienrt=useSupabaseClient()
    const {user}=useUser()
    const router=useRouter()
 const handleLogout=async()=>{
const {error}=await superbaseclienrt.auth.signOut()
if(error){
    toast.error(error.message,{theme:"colored"})
}
else{
    toast.success("Logged out",{theme:"colored",})
}
router.refresh()     
 }

  return (
    <div className={twMerge('h-fit bg-gradient-to-t to-green-800 from-neutral-950 p-6',className)}>
{/* navbar */}
<div className='flex justify-between items-center w-full mb-4'>
    {/* buttons header  */}
    <div className='hidden md:flex gap-x-2 items-center'>
    <button className=' bg-black rounded-full hover:bg-neutral-900 transition border' onClick={()=>router.back()}>
<RxCaretLeft className='text-white ' size={35}/> 
</button>
<button className=' bg-black rounded-full hover:bg-neutral-900 transition border' onClick={()=>router.forward()}>
<RxCaretRight className='text-white ' size={35}/> 
</button>
    </div>
    {/* mobile view header  */}
    <div className='flex md:hidden gap-x-2 items-center '>
    <button className=' bg-white rounded-full p-2 hover:bg-neutral-100 transition border flex justify-center items-center' >
    <HiHome size={20} className='text-black '/>
    </button>
    <button className=' bg-white rounded-full p-2 hover:bg-neutral-100 transition border flex justify-center items-center' >
    <BiSearch size={20} className='text-black '/>
    </button>
    </div>
    <div className=' flex justify-between items-center gap-x-2'>
<>
{user ? (
    <div className="flex gap-x-2">
        <Button onClick={handleLogout} className="bg-white px-6 py-2">
            logout
        </Button>
        <Button className='border rounded-full ' onClick={()=>router.push(`/account`)} >
<FaUserAlt/>
        </Button>
    </div>
) : (
    <div className="flex gap-x-2">
        <Button onClick={() => { onOpen() }} className="bg-transparent text-neutral-300 font-medium">
            signup
        </Button>

        <Button onClick={() => { onOpen() }} className="bg-white px-6 py-2">
            login
        </Button>
    </div>
)}


  </>  </div>

</div>

{children}
    </div>
  )
}

export default Header