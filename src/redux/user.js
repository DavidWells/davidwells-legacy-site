import { getItem, removeItem } from '../utils/storage'
import { getXsrfToken } from '../utils/auth/xsrfToken'
import { isAuthenticated } from '../utils/auth/authToken'
import lock from '../utils/auth'

const isClient = typeof window !== 'undefined'

/* Constants */
const LOGIN_STARTED = 'LOGIN_STARTED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

/* Actions */
function loginStarted() {
  return {
    type: LOGIN_STARTED,
  }
}

export function loginSuccess(profile) {
  return {
    type: LOGIN_SUCCESS,
    profile
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

export function login() {
  const redirectURL = isClient && encodeURIComponent(window.location.href)
  // pass xsrf token through with state
  const state = `token=${getXsrfToken()}&url=${redirectURL}`
  const options = {
    auth: {
      params: {
        state,
        customValues: 'value1',
      },
    }
  }
  return dispatch => {
    if (isClient) {
      lock.show(options)
    }
    return dispatch(loginStarted())
    // login finishes via custom middleware
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logout() {
  return dispatch => {
    // remove auth0 localStorage items
    removeItem('id_token')
    removeItem('profile')
    return dispatch(logoutSuccess())
  }
}

function getProfile() {
  return getItem('profile')
}

/* Reducer */
export const initialAuthState = {
  isAuthenticated: isAuthenticated(),
  profile: getProfile(),
  loading: false,
  error: ''
}

export default function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.profile,
        loading: false,
        error: ''
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        profile: null,
        loading: false,
        error: action.error
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        profile: null
      }
    default:
      return state
  }
}
