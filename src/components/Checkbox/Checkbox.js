import React, { Component, PropTypes } from 'react'
import styles from './Checkbox.css'
// http://codepen.io/DavidWells/pen/PzvEWa
const propTypes = {
  children: PropTypes.any,
  checked: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
}
export default class Check extends Component {

  render() {
    const { name, label } = this.props
    return (
      <div className={styles.checkbox}>
        <input type='checkbox' id={name} name={name} />
        <div className={styles.check} />
        <label htmlFor={name}>{label}</label>
      </div>
    )
  }
}

Check.propTypes = propTypes
