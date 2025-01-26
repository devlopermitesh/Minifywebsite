import React from 'react'
import Box from '../components/Box'
import { BiLoader } from 'react-icons/bi';
const loading = () => {
  return (
    <Box>
        <BiLoader className='animate-spin' size={24}/>
    </Box>
  )
}

export default loading