import { uniq } from 'lodash'
import { useState } from 'react'

const useLoadingKey = (initialState = []) => {
  const [loadingKey, setLoadingKey] = useState(initialState || [])

  const setLoading = (key = '', value) => {
    const newLoading = [...loadingKey]
    const indexOf = newLoading.indexOf(key.toLowerCase())
    if (indexOf === -1 && value) {
      newLoading.push(key.toLowerCase())
    } else if (!value && indexOf !== -1) {
      newLoading.splice(indexOf, 1)
    }
    setLoadingKey(uniq(newLoading))
  }

  const checkLoading = (key = '') => {
    return loadingKey.includes(key.toLowerCase())
  }

  return {
    checkLoading,
    setLoading,
  }
}

export default useLoadingKey
