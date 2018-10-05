/* eslint-disable no-console */
import React, { Component, PropTypes } from 'react'
import analyticsLib from 'analytics'
import googleAnalytics from 'analytics-plugin-ga'
import logger from './logger'
const isProduction = process.env.NODE_ENV === 'production'
const isClient = typeof window !== 'undefined'
const googleAnalyticsUA = process.env.GOOGLE_ANALYTICS_UA

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

window.analytics = analytics

export default class Analytics extends Component {

  componentWillMount() {
    if (isClient) {
      if (isProduction) {
        // ga('create', googleAnalyticsUA, 'auto')
        analytics.page()
        console.info('New pageview', window.location.href)
      }

      analytics.ready((action, store) => {
        console.log('Analyics are loaded')
      })
    }
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      if (isProduction) {
        // ga('set', 'page', window.location.pathname)
        // ga('send', 'pageview')
        analytics.page()
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
