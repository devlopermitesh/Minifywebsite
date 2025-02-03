"use client"
import Modals from '@/components/Modals'
import { useuploadModel } from '@/hook/useUploadModel'
import { useRouter } from 'next/navigation'
import React,{ useState } from 'react'
import { SubmitHandler, useForm} from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/Input'
import Button from '@/components/Button'
import { twMerge } from 'tailwind-merge'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'react-toastify'
import uniqid from 'uniqid';
import { useUser } from '@/hook/useUser'
const uploadsongSchema=z.object({
    title: z.string().min(1).max(100).refine((value) => {  return !/[\\\"()]/.test(value);
    }, {
      message: "Title contains invalid characters: '\\', '\"', '(', ')'",
    })
      ,
  author: z.string().min(1).max(100),
  song: z.instanceof(File).refine(file => ['audio/mpeg', 'audio/wav', 'audio/ogg'].includes(file.type), {
    message: 'Invalid audio file type. Only MP3, WAV, or OGG are allowed.',
  }),
  image: z.instanceof(File).refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
    message: 'Invalid image file type. Only JPEG, PNG, or WebP are allowed.',
  }),


})
const UploadModelProvider = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {onClose,onOpen,isOpen}=useuploadModel((state)=>state)
    const superBaseClient=useSupabaseClient()
    const {user}=useUser()
    const router=useRouter()
    const methods = useForm<z.infer<typeof uploadsongSchema>>({
        resolver: zodResolver(uploadsongSchema),
        defaultValues: {
          title: "",
          author: "",
          song: undefined,
          image:undefined,
        
        },
      });
      const { register, handleSubmit, formState: { errors } ,setValue,reset} = methods;
const onSubmit: SubmitHandler<z.infer<typeof uploadsongSchema>> = async (data) => {
try {
  setIsSubmitting(true)
  //upload song to buckect
  const songId=uniqid()
  const { data:SondData, error:supaBaseError } = await superBaseClient
    .storage
    .from('songs')
    .upload(`song-${(data.title).replace(/\s+/g, '')}-${songId}`, data.song, {
      cacheControl: '3600',
      upsert: false
    })
  if(supaBaseError){
    console.log("SuperBaseError",supaBaseError)
  toast.error("something went wrong in song file", {theme:"colored"})
  return;
  }
  //upload Avatar File for song
  const imageId=uniqid()
  const { data:imageData, error:imageError } = await superBaseClient.storage.from('images').upload(`image-${data.title}-${imageId}`, data.image, {
    cacheControl: '3600',
    upsert: false
  })
  if(imageError){
    toast.error("something went wrong in Image", {theme:"colored"})
  return ;
  }
  //insert song to database
  const { error } = await superBaseClient
    .from('songs')
    .insert(
      {
        title: data.title,
        aurthor: data.author,
        song_path: SondData?.path,
        Image_path:imageData?.path,
        user_id:user?.id,
      }
    )
  if(error){
    toast.error(`something went wrong :${error.message}`, {theme:"colored"})
    return;
  }
  toast.success("Song uploaded successfully", {theme:"colored"})
  onClose()
  router.refresh()
  
} catch (error) {
  console.log("Error",error)
  toast.error("Something went wrong please try again latter", {theme:"colored"})
}
finally{
  setIsSubmitting(false)
  reset()
}
}
  return (
    <Modals title='Upload Song' description='upload an mp3 files 'isopen={isOpen} onchange={isOpen ? onClose : onOpen}>
    <form onSubmit={handleSubmit(onSubmit)} className=''>
    <Input placeholder='title ' id='title' type="text" disabled={isSubmitting} {...register('title')} />
    {(errors && <p className={twMerge('text-red-500 text-sm')}>{errors.title?.message}</p>)}
<br></br>
    <Input placeholder='author Name ' id='author' type='text' disabled={isSubmitting} {...register('author')} />
    {(errors && <p className={twMerge('text-red-500 text-sm')}>{errors.author?.message}</p>)}
    <br></br>
    <div className='pb-1'>
              Select a song file
            </div>
            <Input placeholder='song ' id='song' type='file' accept='.mp3'
             onChange={(e) => {
        const file = e.target.files?.[0];
          if (file) {
            setValue('song', file);
          }
        }}
         disabled={isSubmitting} />
            {errors.song && <p className={twMerge('text-red-500 text-sm')}>{errors.song?.message}</p>}
            <br />
            
            <div className='pb-1'>
              Select an image
            </div>
            <Input placeholder='Avatar for song ' id='image' type='file' accept='image/*'
             onChange={(e) => {
        const file = e.target.files?.[0];
          if (file) {
            setValue('image', file);
          }
        }}
         disabled={isSubmitting} />
            {errors.image && <p className={twMerge('text-red-500 text-sm')}>{errors.image?.message}</p>}
            <br />
            <br />
    <Button disabled={isSubmitting} type='submit'>
        Create
    </Button>
    </form>
</Modals>
  )
}

export default UploadModelProvider