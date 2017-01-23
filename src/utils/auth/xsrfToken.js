import { setItem, getItem } from '../storage'

const XSRF_TOKEN = 'xsrf_token'

const generateXsrfToken = () => (
  Math.random().toString(36).slice(2)
)

const setXsrfToken = () => {
  const newXsrfToken = generateXsrfToken()
  setItem(XSRF_TOKEN, newXsrfToken)
}

export const getXsrfToken = () => {
  return getItem(XSRF_TOKEN)
}

export const initializeXsrfToken = () => {
  if (!getXsrfToken()) {
    setXsrfToken()
  }
}
