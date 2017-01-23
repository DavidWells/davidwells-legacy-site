import { loginSuccess, loginError } from '../../redux/user'
import getURLParams from '../urlHelpers'
import { setItem } from '../storage'
import { getXsrfToken } from './xsrfToken'
import lockInstance from './index'

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

const createOneShot = (middleware) => {
  let hasBeenTriggered = false
  return (store) => (next) => (action) => {
    next(action)

    if (!hasBeenTriggered) {
      hasBeenTriggered = true
      middleware(store.dispatch)
    }
  }
}

/*
  This function is called exactly once as soon as the first action
  runs through redux. Perfect moment to glue things together!

  someEventEmitter.addEventListener('change', (event) => {
      dispatch(someAction(event.value));
  });
*/
const authMiddleware = createOneShot((dispatch) => { // eslint-disable-line
  if (typeof window === 'undefined') {
    return false
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('authListener middleware added')
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

export default authMiddleware
