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
          console.log('Analyics loaded')
        })
      }
    }
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      if (isProduction) {
        analytics.page() // eslint-disable-line
      }
      console.info('New pageview', window.location.href)
    }s
  }

  render() {
    return null
  }
}
