import { createSlice } from '@reduxjs/toolkit'
import { KEY_STORE } from '../../../common/constants'
import { saveDataLocal } from '../../../common/function'

const initialState = {
  modal: null,
  userData: null,
  userAdmin: {
    username: 'admin',
    role: 'admin',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE1ZWY1M2Q4NDM5NTU4ZTU2MTg3NzQiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkNDl3YVRvUGNuN2NBaWZRajE1N3lLT3FnQ1B5MXp4dkcubXJzTjJpSG5UQUJJUVV1NGJaZG0iLCJjcmVhdGVkQXQiOiIyMDI0LTAxLTE2VDAyOjUyOjAzLjQ0M1oiLCJ1cGRhdGVkQXQiOiIyMDI0LTAxLTE2VDAyOjUyOjAzLjQ0M1oiLCJfX3YiOjAsImlhdCI6MTcwNTM3NDE5NywiZXhwIjoyMDIwOTUwMTk3fQ.h3qiEReYRHruRCO3PfL84RQAkNTXl0g2ewLIzAexdGc',
  },
  acceptToken: null,
  language: 'en',
  sidebar: true,
  devMode: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      saveDataLocal(KEY_STORE.SET_USER, action.payload)
      state.userData = action.payload
    },
    setUserAdmin: (state, action) => {
      saveDataLocal(KEY_STORE.USER_ADMIN, action.payload)
      state.userAdmin = action.payload
    },
    setModal: (state, action) => {
      if (action.payload === null && state.modal?.afterClose) {
        state.modal?.afterClose()
      }
      state.modal = action.payload
    },
    setAcceptToken: (state, action) => {
      state.acceptToken = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar
    },
    setDevMode: (state, action) => {
      saveDataLocal(KEY_STORE.DEV_MODE, action.payload)
      state.devMode = action.payload
    },
    setLanguage: (state, action) => {
      saveDataLocal(KEY_STORE.SET_LANGUAGE, action.payload)
      state.language = action.payload
    },
  },
})

export const { setUserData, setModal, setAcceptToken, toggleSidebar, setLanguage, setUserAdmin, setDevMode } = appSlice.actions

export default appSlice.reducer
