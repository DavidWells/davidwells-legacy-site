import { loginSuccess, loginError } from './user'
import runMiddlewareOnce from './utils/runMiddlewareOnce'
import getURLParams from '../utils/urlHelpers'
import { setItem } from '../utils/storage'
import { getXsrfToken } from '../utils/auth/xsrfToken'
import lockInstance from '../utils/auth'

const authMiddleware = runMiddlewareOnce((dispatch) => { // eslint-disable-line
  if (typeof window === 'undefined') {
    return false
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('axuthListener middleware added')
  }
  // register lock callback once
  lockInstance.on('authenticated', (authResult) => { // eslint-disable-line
    if (process.env.NODE_ENV === 'development') {
      console.log('authResult', authResult)
    }
    // Check xrsf token
    const stateValues = getURLParams(`http://dummy.com?${authResult.state}`)
    // if (!authResult.idTokenPayload.email_verified) {
    //   dispatch(loginError('email-not-verified'))
    //   return false
    // }

    if (authResult.idToken && stateValues.token === getXsrfToken()) {
      setItem('id_token', authResult.idToken)
      // return { authenticated: true }
    } else {
      dispatch(loginError('invalid-token'))
      alert('Error your authentication token is wrong. try logging in again') // eslint-disable-line
      handleAuthRedirect(stateValues.url)
      return false
    }
    // Async loads the user profile data
    lockInstance.getProfile(authResult.idToken, (error, profile) => { // eslint-disable-line
      if (error) {
        console.log('Error loading the Profile', error)
        return dispatch(loginError(error))
      }
      // set tokens
      setItem('profile', profile)
      dispatch(loginSuccess(profile))
      // redirect
      handleAuthRedirect(stateValues.url)
    })
  })
})

function handleAuthRedirect(url) {
  const redirect = new CustomEvent('reactRouterRedirect', { // eslint-disable-line
    detail: {
      url,
    },
    bubbles: false,
    cancelable: false
  })
  window.dispatchEvent(redirect)
}

export default authMiddleware
