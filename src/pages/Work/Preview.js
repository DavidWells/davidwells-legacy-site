import React, { PropTypes } from 'react'
import Button from '../../components/Button'
import { Link } from 'react-router' // eslint-disable-line
import styles from './Preview.css'

const propTypes = {
  page: PropTypes.object
}

const Preview = ({ page }) => {
  if (page.draft) {
    return null
  }
  // const pageDate = page.date ? new Date(page.date) : new Date()
  // const date = new Date(pageDate.getTime() + Math.abs(pageDate.getTimezoneOffset() * 60000))
  // const dateArray = date.toDateString().split(' ')
  // dateArray.shift()
  return (
    <li className={styles.item}>
      <a href="http://davidwells.dev/portfolio/inbound-analytics/">
        <img
        className={styles.thumbnail} src="http://davidwells.io/wp-content/uploads/2016/05/easy-md.png" />
        <div className={styles.details}>
          <h3>
            Inbound Analytics
          </h3>
          <span className={styles.description}>
            Vanilla JavaScript Analytics library with zero dependancies.
          </span>
        </div>
        <Button className={styles.button}>
          View Project
        </Button>
      </a>
    </li>
  )
}

Preview.propTypes = propTypes
export default Preview
