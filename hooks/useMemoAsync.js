import { useEffect, useState } from 'react'
const isPromise = (v) => typeof v === 'object' && typeof v.then === 'function'
export function useMemoAsync(factory, deps, initValue) {
  const [val, setVal] = useState(initValue)
  useEffect(() => {
    let cancel = false
    const func = factory()
    if (func === undefined || func === null) return
    if (isPromise(func)) {
      func.then((val) => {
        if (!cancel) {
          setVal(val)
        }
      })
    } else {
      setVal(func())
    }
    return () => {
      cancel = true
    }
  }, deps)
  return val
}
