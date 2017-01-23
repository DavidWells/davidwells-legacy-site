/* Main entry of all requests */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom' // eslint-disable-line
import HeadTag from './fragments/HeadTag'
import Scripts from './fragments/GlobalScripts'
import SubscribeModal from './fragments/SubscribeModal'
import { initializeVisitorID } from './utils/analytics/visitor'
import initUAClasses from './utils/brower-detect'
/* Import global CSS before other components and their styles */
import './index.global.css'
import styles from './index.css'

if (typeof window !== 'undefined') {
  // expose React for app scripts
  window.React = React
  window.ReactDOM = ReactDOM
}

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /** React Router params **/
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
}

export default class App extends Component {
  componentDidMount() {
    initializeVisitorID()
    window.addEventListener('reactRouterRedirect', this.handleAuthRedirect, false)
    // add browser based classes
    initUAClasses()
  }
  componentWillUnmount() {
    window.removeEventListener('reactRouterRedirect', this.handleAuthRedirect)
  }
  handleAuthRedirect = (e) => {
    const redirectURL = e.detail.url
    this.props.history.push(redirectURL)
  }
  render() {
    const { location, params } = this.props
    const currentQuery = location && location.query
    return (
      <div>
        <HeadTag params={params} query={currentQuery} />
        <div className={styles.minHeight}>
          {this.props.children}
        </div>
        <SubscribeModal />
        <Scripts params={params} query={currentQuery} />
      </div>
    )
  }
}

App.propTypes = propTypes
