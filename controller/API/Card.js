import { createCancelTokenHandler } from './utils'
import { REQUEST_TYPE } from 'common/constants'
import APIService from './index'

const CardService = {
  getAll(query) {
    const apiUrl = `/cards`
    return APIService.request(REQUEST_TYPE.GET, apiUrl, this.getAll.name, cancelTokenHandlerObject, query)
  },

  getOne(id) {
    const apiUrl = `/cards/${id}`
    return APIService.request(REQUEST_TYPE.GET, apiUrl, this.getOne.name, cancelTokenHandlerObject)
  },

  create(payload) {
    const apiUrl = `/cards`
    return APIService.request(REQUEST_TYPE.POST, apiUrl, this.create.name, cancelTokenHandlerObject, null, payload)
  },

  update(id, payload) {
    const apiUrl = `/cards/${id}`
    return APIService.request(REQUEST_TYPE.PUT, apiUrl, this.update.name, cancelTokenHandlerObject, null, payload)
  },

  deleteOne(id) {
    console.log('🚀 ~ delete ~ id:', id)
    const apiUrl = `/cards/${id}`
    return APIService.request(REQUEST_TYPE.DELETE, apiUrl, this.deleteOne.name, cancelTokenHandlerObject)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(CardService)

export default CardService
