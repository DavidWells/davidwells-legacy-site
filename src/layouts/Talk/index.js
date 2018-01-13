import React, { Component } from 'react'
import Post from '../Post'
// import styles from './Talk.css'

export default class Talk extends Component {
  static hasLoadingState = true
  render() {
    return (
      <Post {...this.props} />
    )
  }
}
