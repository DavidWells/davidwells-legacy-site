import { setItemSync, getItemSync } from '../storage'

const XSRF_TOKEN = 'xsrf_token'

const generateXsrfToken = () => (
  Math.random().toString(36).slice(2)
)

const setXsrfToken = () => {
  const newXsrfToken = generateXsrfToken()
  setItemSync(XSRF_TOKEN, newXsrfToken)
}

export const getXsrfToken = () => {
  return getItemSync(XSRF_TOKEN)
}

export const initializeXsrfToken = () => {
  if (!getXsrfToken()) {
    setXsrfToken()
  }
}
