/*
  Runs a middleware only once.
*/
const runMiddlewareOnce = (middleware) => {
  let hasBeenTriggered = false
  return (store) => (next) => (action) => {
    next(action)

    if (!hasBeenTriggered) {
      hasBeenTriggered = true
      middleware(store.dispatch)
    }
  }
}
export default runMiddlewareOnce
