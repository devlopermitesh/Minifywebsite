import Modals from '@/components/Modals'
import { useAuthModel } from '@/hook/useAuthModel'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import {
    ThemeSupa,
  } from '@supabase/auth-ui-shared'
import SubscribeModel from '@/components/SubscribeModel'
import { useSubscribeModel } from '@/hook/useSubscribeModel'
  
const SubscribeProvider = () => {

  return (
    
<SubscribeModel/>

  )
}

export default SubscribeProvider