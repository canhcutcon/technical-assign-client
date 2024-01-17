import ReduxService from '@/controller/Redux/redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { KEY_STORE } from '../common/constants'
import { getDataLocal } from '../common/function'
import { setDevMode, setLanguage, setUserAdmin, setUserData } from '../controller/Redux/slice/appSlice'
import { store } from '../controller/Redux/store'
import useLoading from './useLoading'

const initDataLocal = [
  { key: KEY_STORE.SET_USER, action: setUserData },
  { key: KEY_STORE.USER_ADMIN, action: setUserAdmin },
  { key: KEY_STORE.SET_LANGUAGE, action: setLanguage },
  // { key: KEY_STORE.SET_SETTING, action: setSetting },
  // { key: KEY_STORE.SET_CHAIN_CONNECTED, action: setChainConnected },
  { key: KEY_STORE.DEV_MODE, action: setDevMode },
]

const useInitialData = () => {
  const dispatch = useDispatch()
  const { setGlobalLoading } = useLoading()

  useEffect(() => {
    setTimeout(() => setGlobalLoading(false), 2000)
  }, [])

  useEffect(() => {
    const getData = async () => {
      setGlobalLoading(true)
      initDataLocal.map((item) => {
        let dataLocal = getDataLocal(item.key)
        if (dataLocal) {
          store.dispatch(item.action(dataLocal))
        }
      })
      // await Promise.allSettled([
      //   // ReduxService.detectConnectionMethod(),
      //   // ReduxService.getSetting(),
      //   // ReduxService.getSettingToken()
      // ])
      setGlobalLoading(false)
    }

    getData()
  }, [dispatch])
}

export default useInitialData
