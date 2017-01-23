import React, { Component, PropTypes } from 'react'
import ga from 'react-google-analytics'
const InjectGoogleAnalytics = ga.Initializer
const isProduction = process.env.NODE_ENV === 'production'
const isClient = typeof window !== 'undefined'
const googleAnalyticsUA = process.env.GOOGLE_ANALYTICS_UA

class GoogleAnalyticsTracker extends Component {

  componentWillMount() {
    if (isClient) {
      if (isProduction) {
        ga('create', googleAnalyticsUA, 'auto')
      } else {
        console.info('ga.create', googleAnalyticsUA)
      }
      logPageview()
    }
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      logPageview()
    }
  }

  render() {
    return (
      <InjectGoogleAnalytics />
    )
  }
}

const logPageview = () => {
  if (isClient) {
    if (isProduction) {
      ga('set', 'page', window.location.pathname)
      ga('send', 'pageview')
    } else {
      console.info('New pageview', window.location.href)
    }
  }
}

GoogleAnalyticsTracker.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  params: PropTypes.object.isRequired,
}

export default GoogleAnalyticsTracker
