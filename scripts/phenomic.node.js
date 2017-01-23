import phenomicStatic from 'phenomic/lib/static'
import routes from '../src/routes'
import configureStore from '../src/store'

const initialState = { ...(typeof window !== 'undefined') && window.__INITIAL_STATE__ }
const store = configureStore(initialState)

module.exports = (options) =>
  phenomicStatic({
    ...options,
    metadata: {
      empty: 'hi',
    },
    routes,
    store,
  })
