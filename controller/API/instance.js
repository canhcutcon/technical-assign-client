/* eslint-disable no-undef */
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_APP || 'http://localhost:3011',
})

export default axiosInstance
