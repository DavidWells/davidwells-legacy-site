import React, { Component } from 'react'
import Page from '../Page'
import styles from './Portfolio.css'

export default class Portfolio extends Component {
  static hasLoadingState = true
  render() {
    return (
      <Page
        {...this.props}
        contentClassName={styles.content}
      />
    )
  }
}
