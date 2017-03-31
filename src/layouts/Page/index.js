import React, { Component, PropTypes } from 'react'
import { BodyContainer } from 'phenomic'
import classnames from 'classnames'
import { Link } from 'react-router'
import Default from '../Default'
import ContentLoading from '../../components/ContentLoading/Paragraph'
import styles from './Page.css'

export default class Page extends Component {
  static hasLoadingState = true
  render() {
    const {
      head,
      body,
      isLoading,
      loadingData,
      className,
      contentClassName
    } = this.props
    let title = (head) ? head.title : 'Default Loading Title' // eslint-disable-line

    if (loadingData && loadingData.title) {
      title = loadingData.title
    }

    if (!isLoading && head) {
      title = head.title
    }

    /* Markdown content will display if it exists */
    const bodyContent = body || '' // reset for loading state
    let markdown = (
      <BodyContainer>
        {bodyContent}
      </BodyContainer>
    )

    if (isLoading) {
      markdown = <ContentLoading numberOfLines={30} />
    }

    const classes = classnames(styles.postPage, className)
    const contentClasses = classnames(styles.content, contentClassName)
    return (
      <Default {...this.props} className={classes} fullWidth>
        <div className={styles.wrapper}>
          <div className={styles.sidebar}>
            <figure className={styles.header}>
              <a href='http://davidwells.io'>David Gregory Wells</a>
              <h1>David Wells</h1>
              <h2>Javascript Developer</h2>
              <h3>San Francisco</h3>
            </figure>
            <nav className={styles.nav}>
              <Link to='/work'><span className={styles.pill}>Work</span></Link>
              <Link to='/blog'><span className={styles.pill}>Blog</span></Link>
              <Link to='/talks'><span className={styles.pill}>Talks</span></Link>
              <Link to='/contact'><span className={styles.pill}>Contact</span></Link>
            </nav>
          </div>
          <div className={contentClasses}>
            {this.props.children || markdown}
          </div>
        </div>
      </Default>
    )
  }
}

Page.propTypes = {
  head: PropTypes.object.isRequired,
  __url: PropTypes.string,
  phenomicLoading: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
}
