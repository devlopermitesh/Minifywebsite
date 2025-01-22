"use client"

import Modals from '@/components/Modals'
import React, { useEffect } from 'react'
import AuthModelProvider from './AuthModelProvider'
import UploadModelProvider from './UploadModelProvider'

const ModalProvider = () => {
    const [isMounted,setIsMounted]=React.useState(true)
useEffect(()=>setIsMounted(true),[])

    if(!isMounted) return null

  return (<>
       <AuthModelProvider/>
       <UploadModelProvider/>
       </>
  )
}

export default ModalProvider