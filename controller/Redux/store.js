import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slice/appSlice'
import loadingReducer from './slice/loadingSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
