import { createCancelTokenHandler } from './utils'
import { REQUEST_TYPE } from 'common/constants'
import APIService from './index'

const UserAdminService = {
  login(username, password) {
    const apiUrl = `/admin/login`
    return APIService.request(REQUEST_TYPE.POST, apiUrl, this.login.name, cancelTokenHandlerObject, null, { username, password })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(UserAdminService)

export default UserAdminService
