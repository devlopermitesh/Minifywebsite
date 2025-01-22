import { useAuthModel } from '@/hook/useAuthModel'
import { useUser } from '@/hook/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

const LikeButton = ({songId,className}:{songId:number,className?:string}) => {
    const [isLiked, setIsLiked] = useState(false)
    const {user}=useUser()
    const supabaseclient=useSupabaseClient()
    const {onOpen}=useAuthModel()
    const router=useRouter()

    useEffect(()=>{
if(!user?.id){
return;
}
const FetchlikedSongs=async()=>{
try {
    const { data, error } = await supabaseclient
    .from('liked_songs')
    .select('*')
    .eq('user_id', user.id)
    .eq('song_id', songId)
    .single();

if(data && !error){
        setIsLiked(true)
}
} catch (error) {
    console.log(error)

}
finally{
router.refresh()
}
}
FetchlikedSongs()
    },[supabaseclient,user?.id,songId])
    const likeSong=async()=>{

try {
if(!user?.id){
    onOpen()
    return ;
}
   if(isLiked){
const {error}=await supabaseclient.from('liked_songs').delete().eq('user_id',user.id).eq('song_id',songId)
if(error){
    toast.error('Error occurred while unliking song')
    return;
   }
    toast.success('Song unliked')
    setIsLiked(false)
}
else{
const {error}=await supabaseclient.from('liked_songs').insert([{user_id:user.id,song_id:songId}])
if(error){
    toast.error('Error occurred while liking song')
    return ;
}
toast.success('Song liked')
setIsLiked(true)
}

} catch (error) {
    console.log(error)
    toast.error('Error occurred while liking song')
}
    }
  return (
    <button className={`mr-5 text-green-500 z-50 ${className}` } onClick={likeSong}>
        {isLiked ? <AiFillHeart className='text-green-500' size={24}/> : <AiOutlineHeart size={24}/>}
    </button>
  )
}

export default LikeButton