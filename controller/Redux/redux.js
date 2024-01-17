/* eslint-disable no-undef */
import { removeDataLocal } from '../../common/function'

import { setUserData } from './slice/appSlice'
import { setLoadingGlobal } from './slice/loadingSlice'
import { store } from './store'

export default class ReduxService {
  static async callDispatchAction(action) {
    store.dispatch(action)
  }

  static getBearerToken(tokenUserData = false) {
    const userAdmin = ReduxService.getUserAdmin()
    return `Bearer ${userAdmin.token}`
  }

  static getUserData() {
    const { app } = store.getState()
    const { userData } = app
    return userData
  }

  static getUserAdmin() {
    const { app } = store.getState()
    const { userAdmin } = app
    return userAdmin
  }

  static async updateUserData(data) {
    const userData = this.getUserData()
    const newUser = { ...userData, ...data }
    ReduxService.callDispatchAction(setUserData(newUser))
  }

  static async setLoadingGlobal(state) {
    ReduxService.callDispatchAction(setLoadingGlobal(state))
  }

  static async resetApp() {
    const { app } = store.getState()
  }

  static resetUser() {
    removeDataLocal(KEY_STORE.USER_SIGN)
    ReduxService.callDispatchAction(setUserData(null))
  }

  static async refreshUser() {
    const userData = this.getUserData()
    let newUser = {
      ...userData,
      ...resUser,
    }
    ReduxService.callDispatchAction(setUserData(newUser))
  }

  static logout() {
    ReduxService.resetUser()
  }
}
