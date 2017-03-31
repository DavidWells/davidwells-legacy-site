/*eslint-disable */
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Page from '../../layouts/Page'
// import Default from '../../layouts/Default'
import styles from './Homepage.css'

export default class Homepage extends Component {
  static propTypes = {
    phenomicLoading: PropTypes.bool
  }
  static loadingState = true
  render() {
    const { phenomicLoading } = this.props
    return (
      <Page {...this.props} phenomicLoading={phenomicLoading}>
        <article>
          <h1>Heading 1 (in article) with <small>small text</small> and a <a href='#'>link</a></h1>
          <h2>Heading 2 (in article) with <small>small text</small> and a <a href='#'>link</a></h2>
          <h3>Heading 3 (in article) with <small>small text</small> and a <a href='#'>link</a></h3>
          <h4>Heading 4 (in article) with <small>small text</small> and a <a href='#'>link</a></h4>
          <h5>Heading 5 (in article) with <small>small text</small> and a <a href='#'>link</a></h5>
          <h6>Heading 6 (in article) with <small>small text</small> and a <a href='#'>link</a></h6>

          <h1>Hello World</h1>

          <p>Lorem ipsum dolor sit amet, <a>consectetur</a> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <blockquote>
            This is a blockquote
          </blockquote>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <hr />

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <ul>
            <li>In voluptate velit esse cillum</li>
            <li>In voluptate velit esse cillum</li>
            <li>In voluptate velit esse cillum</li>
          </ul>

          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </article>
      </Page>
    )
  }
}
