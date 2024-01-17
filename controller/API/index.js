import axiosInstance from './instance'
import QueryString from 'query-string'
import ReduxService from '../Redux/redux'
import { showNotificationError } from '@/common/function'

export default class APIService {
  static async request(method, apiUrl, name, cancelTokenHandlerObject, query, body, token = null) {
    const AUTH_TOKEN =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE1ZWY1M2Q4NDM5NTU4ZTU2MTg3NzQiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkNDl3YVRvUGNuN2NBaWZRajE1N3lLT3FnQ1B5MXp4dkcubXJzTjJpSG5UQUJJUVV1NGJaZG0iLCJjcmVhdGVkQXQiOiIyMDI0LTAxLTE2VDAyOjUyOjAzLjQ0M1oiLCJ1cGRhdGVkQXQiOiIyMDI0LTAxLTE2VDAyOjUyOjAzLjQ0M1oiLCJfX3YiOjAsImlhdCI6MTcwNTM3NDE5NywiZXhwIjoyMDIwOTUwMTk3fQ.h3qiEReYRHruRCO3PfL84RQAkNTXl0g2ewLIzAexdGc'
    let url = apiUrl
    if (query) {
      url = url + '?' + QueryString.stringify(query)
    }
    let config = {
      method,
      url,
    }
    if (cancelTokenHandlerObject) {
      config.cancelToken = cancelTokenHandlerObject[name].handleRequestCancellation().token
    }
    if (AUTH_TOKEN) {
      config.headers = {
        Authorization: AUTH_TOKEN,
      }
    }
    if (body) {
      config.data = body
    }
    return axiosInstance
      .request(config)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        if (error?.response?.status === 403) {
          showNotificationError('Your session has expired. Please sign in again to continue')
          ReduxService.logout()
        } else if (!error?.message?.includes('canceled')) {
          console.log(error?.response?.data?.message)
          showNotificationError(error?.response?.data?.message)
        }
        return null
      })
  }
}
