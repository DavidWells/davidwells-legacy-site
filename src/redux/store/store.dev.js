import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createStore from 'phenomic/lib/redux/createStore'
import * as phenomicReducers from 'phenomic/lib/redux/modules'
import authMiddleware from '../user-middleware'
import userReducer from '../user'

const extraMiddlewares = [thunk, authMiddleware]

export default function configureStore(preloadedState) {
  return createStore(
    combineReducers({
      ...phenomicReducers,
      auth: userReducer,
    }),
    preloadedState,
    extraMiddlewares,
  )
}

/*
function createLogger ({ getState, dispatch }) {
  return (next) =>
    (action) => {
      if (action.type === 'LOGIN_STARTED') {
        // alert('LOGIN_STARTED triggered') // eslint-disable-line
      }
      console.log('actionTYPE', action.type)

      const prevState = getState()
      const returnValue = next(action)
      const nextState = getState()
      const actionType = String(action.type)
      const message = `action ${actionType}`
      console.log('%c prev state', 'color: #9E9E9E', prevState)
      console.log('%c action', 'color: #03A9F4', action)
      console.log('%c next state', 'color: #4CAF50', nextState)
      console.log('message', message)
      return returnValue
    }
}*/
// createLogger
