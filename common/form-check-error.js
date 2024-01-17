import { isJsonString, isURL, validateEmail } from './function'

export const checkRequire = (name, value) => {
  if (!value || value === '') {
    return `[name] is required`.replace('[name]', `${name}`)
  }
  if (Array.isArray(value) && value.length === 0) {
    return `[name] is required`.replace('[name]', `${name}`)
  }
  return null
}

export const checkEmail = (name, value) => {
  if (!value || validateEmail(value)) {
    return `Email invalid`
  }
  return null
}

export const checkUri = (name, value) => {
  if (value && (!isURL(value) || !value.includes('http'))) {
    return `[name] invalid uri`.replace('[name]', `${name}`)
  }
  return null
}

export const checkObj = (name, value) => {
  if (value && !isJsonString(value)) {
    return `[name] invalid object`.replace('[name]', `${name}`)
  }
  return null
}

export const checkNegative = (name, value) => {
  if (Number(value || 0) < 0) {
    return `[name] is negative`.replace('[name]', `${name}`)
  }
  return null
}
