import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Button from '../../components/Button'
import Default from '../../layouts/Default'
import styles from './Homepage.css'

export default class Homepage extends Component {
  static propTypes = {
    phenomicLoading: PropTypes.bool
  }
  static loadingState = true
  render() {
    const { phenomicLoading } = this.props
    return (
      <Default {...this.props} phenomicLoading={phenomicLoading} fullWidth>
        <div className={styles.wrapper}>
          Homepage
          <Button>Button</Button>
          <Link to='/blog'>Blog</Link>
        </div>
      </Default>
    )
  }
}
