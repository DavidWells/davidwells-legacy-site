import React, { Component } from 'react'
import Post from '../Post'

export default class Talk extends Component {
  render() {
    return (
      <Post {...this.props} />
    )
  }
}
