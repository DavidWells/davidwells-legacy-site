import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './BlogPreview.css'

const propTypes = {
  page: PropTypes.object
}

const BlogPreview = ({ page }) => {
  if (page.draft || !page.title) {
    return null
  }
  let link = (
    <Link className={styles.title} to={page.__url}>
      <h3>{page.title}</h3>
    </Link>
  )
  if (page.url) {
    link = (
      <a className={styles.title} target='_blank' rel='noopener noreferrer' href={page.url}>
        <h3>{page.title}</h3>
      </a>
    )
  }
  return (
    <div className={styles.post}>
      {link}
    </div>
  )
}

BlogPreview.propTypes = propTypes
export default BlogPreview
