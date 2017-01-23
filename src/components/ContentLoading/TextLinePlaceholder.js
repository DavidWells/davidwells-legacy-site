import React, { PropTypes } from 'react'
import styles from './TextLinePlaceholder.css' // eslint-disable-line

const TextLinePlaceholder = ({ width, height, marginBottom }) => {
  const setWidth = 100 - width
  return (
    <div className={styles.textPlaceholder}>
      <div style={{ height: `${height}px` }} className={styles.line} />
      <div style={{ width: `${setWidth}%` }} className={styles.lineCover} />
      <div style={{ height: `${marginBottom}px` }} />
    </div>
  )
}

TextLinePlaceholder.defaultProps = {
  width: 100,
  height: 13,
  marginBottom: 12, // effectively lineHeight
}

TextLinePlaceholder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginBottom: PropTypes.number
}

export default TextLinePlaceholder
