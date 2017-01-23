import React, { PropTypes } from 'react'
import styles from './Icon.css'

const Icon = (props) => {
  const { children, className, size } = props
  const customSize = {
    height: size,
    width: size
  }

  let iconContents = (
    <use xlinkHref={`#${props.name}`} />
  )
  /* If inline SVG used render */
  if (children && (children.type === 'g' || children.type === 'svg')) {
    iconContents = children
  }

  return (
    <span className={styles.wrapper}>
      <svg style={customSize} className={`${className} ${styles.icon}`}>
        {iconContents}
      </svg>
    </span>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.element,
}
export default Icon
