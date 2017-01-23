/**
 * 404 page template
 */
import React, { Component, PropTypes } from 'react'
// import axios from 'axios'
import { twitterShare } from '../../utils/social/share'
import styles from './index.css'

// const log404Endpoint = process.env.API.ERROR

export default class PageError extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    errorText: PropTypes.string,
  }
  static defaultProps = {
    error: 404,
    errorText: 'Page Not Found',
  }
  componentDidMount() {
    const { error } = this.props
    const url = window.location.href
    if (error === 404 && !url.match(/localhost/)) {
      // axios({
      //   method: 'post',
      //   url: log404Endpoint,
      //   data: {
      //     url,
      //     referrer: document.referrer || window.localStorage.getItem('sls_last_page')
      //   },
      // }).then((response) => {
      //   console.log('404 recorded')
      //   console.log(response)
      //   console.log(response.data)
      // }).catch((err) => {
      //   console.log(err)
      // })
    }
  }
  render() {
    const { error, errorText } = this.props
    const tweet = twitterShare(
      'Hi @goServerless, It looks like this page is missing ☞( ͡° ͜ʖ ͡°)☞', // msg
      (typeof window !== 'undefined') ? window.location.href : 'localhost.com', // url
      ['FYI'] // hashtags
    )
    const content = (
      <div className={styles.content}>
        <div className={styles.message}>
          It seems you found a broken link. Do not hesitate to report this page!
        </div>
        <div>
          Tweet at <a target='_blank' rel='noopener noreferrer' href={tweet}>@goServerless</a> or&nbsp;
          <a
            href='https://github.com/serverless/site/issues'
            target='_blank'
            rel='noopener noreferrer'
          >
          open a github issue
          </a>
        </div>
        <div className={styles.otherLinks}>
          <a href='/' title='Go to serverless homepage'>
            Visit homepage
          </a>
        </div>
      </div>
    )
    return (
      <div className={styles.container}>
        <a href='/' title='Go to serverless homepage'>
          <img alt='Serverless logo' src={'https://www.fillmurray.com/130/130'} draggable='false' />
        </a>
        <div className={styles.text}>
          <p className={styles.title}>
            <strong>{error}</strong>
            {' '}
            {errorText}
          </p>
          {error === 404 && content}
        </div>
      </div>
    )
  }
}
