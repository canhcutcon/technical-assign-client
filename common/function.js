import { notification, message } from 'antd'
import { toast } from 'react-toastify'
import moment from 'moment'
import dayjs from 'dayjs'

export const showNotification = (title = null, description = '', type = 'open') => {
  let params = {
    placement: 'bottomRight',
    className: 'notification-class',
    bottom: 54,
    duration: 5,
  }
  if (title) {
    params['message'] = title
  }
  if (description) {
    params['description'] = description
  }
  notification[type](params)
}

export const destroyNotification = () => {
  notification.destroy()
}

export const saveDataLocal = (key, data) => {
  try {
    // eslint-disable-next-line no-undef
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

export const getDataLocal = (key) => {
  try {
    // eslint-disable-next-line no-undef
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.log(error)
    return null
  }
}

export const removeDataLocal = (key) => {
  try {
    // eslint-disable-next-line no-undef
    localStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const replaceAll = (str, find, replace) => {
  return typeof str === 'string' ? str.replace(new RegExp(escapeRegExp(find), 'g'), replace) : ''
}

export const lowerCase = (value) => {
  return typeof value === 'string' ? value.toLowerCase() : value
}

export const upperCase = (value) => {
  return value ? value.toUpperCase() : value
}

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min
}

export const roundingNumber = (number, rounding = 4) => {
  return Number(Number(number).toFixed(rounding))
}

export const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object
}

export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const detectErrorMessage = (err = null) => {
  if (err && err?.reason && typeof err?.reason === 'string') {
    return err.reason.split('execution reverted: ').join('')
  } else {
    return `Something went wrong !!`
  }
}

export const copyToClipboard = (text, needShow = true) => {
  const tmp = document.createElement('input')
  tmp.value = text
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  tmp.remove()
  needShow && message.success(`Copy: ${text}`)
}

export const isURL = (string) => {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const showNotificationError = (errorMessage = '') => {
  toast.error(errorMessage, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export const showNotificationSuccess = (message = '') => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const convertSecondToDay = (seconds) => {
  return Math.floor(seconds / (3600 * 24))
}

export const convertDayToSecond = (day) => {
  return Math.floor(day * (3600 * 24))
}

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const countDots = (strString, strLetter) => {
  let string = strString.toString()
  return (string.match(RegExp(strLetter, 'g')) || []).length
}

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  var re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(String(email).toLowerCase())
}

export const exchangeUnixTimeToDateTime = (time) => {
  time = moment.unix(time).toISOString()
  let now = moment()
  let hours = moment(now).diff(time, 'hours')
  let minutes = moment(now).diff(time, 'minutes')
  let seconds = moment(now).diff(time, 'seconds')
  if (minutes < 1) {
    return `${seconds} seconds ago`
  } else if (hours < 1) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return moment(time).format('YYYY/MM/DD')
  }
}
export const exchangeTimeStampToDateTime = (time) => {
  let now = moment()
  let hours = moment(now).diff(time, 'hours')
  let minutes = moment(now).diff(time, 'minutes')
  let seconds = moment(now).diff(time, 'seconds')
  if (minutes < 1) {
    return `${seconds} seconds ago`
  } else if (hours < 1) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return moment(time).format('YYYY/MM/DD')
  }
}

export const viewExternal = (url) => {
  window.open(url, '_blank')
}

export const formattedDate = (time) => {
  return dayjs(time).locale('en').format('YYYY/MM/DD HH:mm')
}
