import React, { Component } from 'react'
// import FeedbackModal from '../../fragments/FeedbackModal'
import styles from './index.css'

export default class Footer extends Component {
  render() {
    return (
      <footer id='footer' className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href={'https://serverless.com'} className={styles.link}>
            <span className={styles.reference}>
              {'Serverless, Inc. © 2016'}
            </span>
          </a>
        </div>
      </footer>
    )
  }
}
