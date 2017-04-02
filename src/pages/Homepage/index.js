/*eslint-disable */
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Page from '../../layouts/Page'
// import Default from '../../layouts/Default'
import styles from './Homepage.css'

export default class Homepage extends Component {
  static hasLoadingState = true
  render() {
    return (
      <Page {...this.props} contentClassName={styles.content} />
    )
  }
}
