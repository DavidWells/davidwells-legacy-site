/* eslint-disable no-console */
import React from 'react'
import analyticsLib from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'
import logger from './logger'
const isProduction = process.env.NODE_ENV === 'production'
const isClient = typeof window !== 'undefined'
const googleAnalyticsUA = process.env.GOOGLE_ANALYTICS_UA

// start analytics
let analytics
if (isClient) {
  analytics = analyticsLib({
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
  window.analytics = analytics
}

export default class Analytics extends React.Component {

  componentWillMount() {
    if (isClient) {
      if (isProduction) {
        // ga('create', googleAnalyticsUA, 'auto')
        analytics.page() // eslint-disable-line
        console.info('New pageview', window.location.href)
      }

      if (analytics) {
        analytics.ready((action, store) => {
          console.log('Analyics are loaded')
        })
      }
    }
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      if (isProduction) {
        // ga('set', 'page', window.location.pathname)
        // ga('send', 'pageview')
        analytics.page() // eslint-disable-line
      } else {
        // console.info('New pageview', window.location.href)
      }
      console.info('New pageview', window.location.href)
    }
  }

  render() {
    return null
  }
}
