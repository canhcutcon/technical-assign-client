import { useSelector, useDispatch } from 'react-redux'
import { setLoadingGlobal } from '@/controller/Redux/slice/loadingSlice'

const useLoading = () => {
  const loadingState = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  return {
    loading: loadingState.value,
    setGlobalLoading: (state) => {
      dispatch(setLoadingGlobal(state))
    },
  }
}

export default useLoading
