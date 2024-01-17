import { CONNECTION_METHOD } from '@/common/constants'
import { useMemo } from 'react'

const useAuth = () => {
  const isSigned = useMemo(() => {}, [])
  return {
    isSigned,
    username: userData?.username,
    role: isSignedWithoutCheckChainId ? userData?.role : null,
  }
}

export default useAuth
