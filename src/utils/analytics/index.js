import analyticsLib from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'

const isProduction = process.env.NODE_ENV === 'production'
const isClient = typeof window !== 'undefined'
const googleAnalyticsUA = process.env.GOOGLE_ANALYTICS_UA


const logger = store => next => action => {
  if (action.type) {
    console.log(`>> dispatching ${action.type}`, JSON.stringify(action))
  }
  return next(action)
}

// start analytics
const analytics = analyticsLib({
  app: 'davidwells',
  version: 1,
  plugins: [
    logger,
    googleAnalytics({
      trackingId: googleAnalyticsUA,
      autoTrack: true,
    }),
  ]
})

if (isClient) {
  window.analytics = analytics
  console.log('analytics loaded')
}

export default analytics
