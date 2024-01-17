import { REQUEST_TYPE } from 'common/constants'

const UploadService = {
  async upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    const url = process.env.NEXT_PUBLIC_API_APP || 'http://localhost:3011'
    const resData = await fetch(`${url}/upload/file`, {
      method: REQUEST_TYPE.POST,
      headers: {},
      body: formData,
    })
    const res = await resData.json()
    console.log('🚀 ~ upload ~ res:', res)
    return res || null
  },
}

export default UploadService
