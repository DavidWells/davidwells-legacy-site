
const logMiddleware = store => next => action => {
  if (action.type) {
    console.log(`>> dispatching ${action.type}`, JSON.stringify(action))
  }
  return next(action)
}

export default logMiddleware
