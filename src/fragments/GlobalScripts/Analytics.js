/* eslint-disable no-console */
import React from 'react'
import analytics from '../../utils/analytics'
const isProduction = process.env.NODE_ENV === 'production'
const isClient = typeof window !== 'undefined'

export default class Analytics extends React.Component {

  componentWillMount() {
    if (isClient) {
      if (isProduction) {
        console.log('analytics component loaded')
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
