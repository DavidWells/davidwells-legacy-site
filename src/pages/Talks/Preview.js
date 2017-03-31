import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './Preview.css'

const propTypes = {
  page: PropTypes.object
}

const Preview = ({ page }) => {
  if (page.draft) {
    return null
  }
  const pageDate = page.date ? new Date(page.date) : new Date()
  const date = new Date(pageDate.getTime() + Math.abs(pageDate.getTimezoneOffset() * 60000))
  const dateArray = date.toDateString().split(' ')
  dateArray.shift()
  return (
    <div className={styles.post}>
      <Link className={styles.title} to={page.__url}>
        <h3>{page.title}</h3>
        <span className={styles.meta}>{page.event} - {dateArray.join(' ')}</span>
      </Link>
    </div>
  )
}

Preview.propTypes = propTypes
export default Preview
