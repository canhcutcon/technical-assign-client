import { setLanguage as setLanguageRedux } from '@/controller/Redux/slice/appSlice'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import allMessages from 'static/lang'

const useLanguage = () => {
  const dispatch = useDispatch()
  const { language } = useSelector((state) => state.app)
  const messages = allMessages[language]

  const translate = useCallback(
    (keys, defaultValue = '') => {
      try {
        let result = allMessages[language]
        keys.split('.').forEach((key) => {
          result = result[key]
        })
        if (result) {
          return typeof result === 'string' ? result : JSON.stringify(result)
        }
        return defaultValue || ''
      } catch (error) {
        return defaultValue || ''
      }
    },
    [language]
  )

  const setLanguage = useCallback(
    (key) => {
      dispatch(setLanguageRedux(key))
    },
    [dispatch]
  )

  return {
    language,
    messages,
    translate,
    setLanguage,
  }
}

export default useLanguage
