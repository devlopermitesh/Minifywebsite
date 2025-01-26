import Box from '@/components/Box';
import React from 'react'
import { BiLoader } from 'react-icons/bi';
const loading = () => {
  return (
    <Box className='flex items-center justify-center'>
        <BiLoader className='animate-spin' size={24}/>
    </Box>
  )
}

export default loading