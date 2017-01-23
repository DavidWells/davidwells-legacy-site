import 'whatwg-fetch'
import phenomicClient from 'phenomic/lib/client'
import routes from '../src/routes'
import configureStore from '../src/store'
import { initialAuthState } from '../src/redux/user'
const windowState = (typeof window !== 'undefined') ? window.__INITIAL_STATE__ : {}
const authState = {
  auth: initialAuthState
}
const initialState = {
  ...windowState,
  ...authState // hydrate auth state
}
const store = configureStore(initialState)

// dispatch to attach auth0 middleware handler
store.dispatch({
  type: 'APP_INIT'
})

phenomicClient({
  metadata: {
    empty: 'hi',
  },
  routes,
  store,
})

// hot loading
// md files → JSON && generate collection + hot loading for dev
let mdContext = require.context('../content', true, /\.md$/)
mdContext.keys().forEach(mdContext)
if (module.hot) {
  const mdHotUpdater = require('phenomic/lib/client/hot-md').default // eslint-disable-line
  module.hot.accept(mdContext.id, () => {
    mdContext = require.context('../content', true, /\.md$/)
    const requireUpdate = mdHotUpdater(mdContext, window.__COLLECTION__, store)
    mdContext.keys().forEach(requireUpdate)
  })
}
