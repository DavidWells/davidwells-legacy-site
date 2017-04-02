import React, { Component } from 'react'
import Post from '../Post'
// import styles from './Talk.css'

export default class Talk extends Component {
  render() {
    return (
      <Post {...this.props} />
    )
  }
}
