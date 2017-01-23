import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import handleClickAway from '../../utils/handleClickAway'
import styles from './Header.css'

const propTypes = {
  fullWidth: PropTypes.bool
}

export default class Header extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      sideNavOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }
  componentDidMount() {
    document.body.addEventListener('click', this.closeNav)
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeNav)
  }
  closeNav(e) {
    const toggleNode = this.refs.toggle
    const isOutsideClick = handleClickAway(toggleNode, e)
    if (toggleNode && isOutsideClick) {
      this.setState({
        sideNavOpen: false
      })
    }
  }
  handleClick() {
    this.setState({
      sideNavOpen: !this.state.sideNavOpen
    })
  }
  render() {
    // const { fullWidth } = this.props
    // const { sideNavOpen } = this.state
    // const mobileNav = (sideNavOpen) ? styles.open : ''
    // const openClass = (sideNavOpen) ? styles.animate : ''
    // const containerStyle = (fullWidth) ? styles.fullWidth : ''
    return (
      <header className={styles.header}>
        <Link to='/'>home</Link>
      </header>
    )
  }
}

Header.propTypes = propTypes
