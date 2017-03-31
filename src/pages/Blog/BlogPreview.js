import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './BlogPreview.css'

const propTypes = {
  page: PropTypes.object
}

const BlogPreview = ({ page }) => {
  if (page.draft) {
    return null
  }
  return (
    <div className={styles.post}>
      <Link className={styles.title} to={page.__url}>
        <h3>{page.title}</h3>
      </Link>
    </div>
  )
}

BlogPreview.propTypes = propTypes
export default BlogPreview
