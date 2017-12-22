import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import enhanceCollection from 'phenomic/lib/enhance-collection'
import Page from '../../layouts/Page'
import Preview from './Preview'
import styles from './Talks.css'

const numberOfLatestPosts = 100

export default class Talks extends Component {
  static hasLoadingState = true
  static propTypes = {
    isLoading: PropTypes.bool
  }
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const { isLoading, params } = this.props
    const pageNumber = (params && params.page) ? parseInt(params.page, 10) : 0
    const pagination = numberOfLatestPosts * pageNumber
    const offset = pagination + numberOfLatestPosts
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: 'Talk' },
      sort: 'date',
      reverse: true,
    })
    .slice(pagination, offset)
    let nextLink = <Link to={'/talks/page/1'}>Next</Link>
    let previousLink
    if (params && params.page) {
      const prevNum = ((pageNumber - 1) === 0) ? '' : `page/${pageNumber - 1}`
      nextLink = <Link to={`/talks/page/${pageNumber + 1}`}>Next</Link>
      previousLink = <Link to={`/talks/${prevNum}`}>Previous</Link>
    }
    let renderContent = (
      <div className={styles.postList}>
        {latestPosts.map((page, i) => (
          <Preview key={i} page={page} />
        ))}
        <div className={styles.pageination}>
          {previousLink}
          {nextLink}
        </div>
      </div>
    )
    if (isLoading) {
      const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae mauris arcu, eu pretium nisi. Praesent fringilla ornare ullamcorper. Pellentesque diam orci, sodales in blandit ut, placerat quis felis.'
      renderContent = (
        <div className={styles.postList}>
          <Preview page={{ title: 'loading...', description: text }} isLoading />
          <Preview page={{ title: 'loading....', description: text }} isLoading />
          <Preview page={{ title: 'loading...', description: text }} isLoading />
          <Preview page={{ title: 'loading....', description: text }} isLoading />
          <Preview page={{ title: 'loading...', description: text }} isLoading />
          <Preview page={{ title: 'loading....', description: text }} isLoading />
        </div>
      )
    }
    return (
      <Page {...this.props}>
        <h2 className={styles.pageTitle}>Talks and Workshops</h2>
        <span className={styles.pageSubTitle}>
          David's public talks on development, UX, and beyond
        </span>
        <div className={styles.wrapper}>
          {renderContent}
        </div>
      </Page>
    )
  }
}
