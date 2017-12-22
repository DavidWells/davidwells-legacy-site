import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import enhanceCollection from 'phenomic/lib/enhance-collection'
import Page from '../../layouts/Page'
import BlogPreview from './BlogPreview'
import externalPosts from '../../../content/blog/external-posts.json'
// import Newsletter from '../../fragments/Newsletter/Newsletter'
import styles from './Blog.css'

const numberOfLatestPosts = 25
// const isClient = typeof window !== 'undefined'

export default class BlogPage extends Component {
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
      filter: { layout: 'Post' },
      sort: 'date',
      reverse: true,
    })

    const allPosts = latestPosts.concat(externalPosts)
    const sorted = allPosts.sort((date1, date2) => {
      if (date1.date > date2.date) return -1
      if (date1.date < date2.date) return 1
      return 0
    }).slice(pagination, offset)

    let nextLink = <Link to={'/blog/page/1'}>Next</Link>
    let previousLink
    if (params && params.page) {
      const prevNum = ((pageNumber - 1) === 0) ? '' : `page/${pageNumber - 1}`
      nextLink = <Link to={`/blog/page/${pageNumber + 1}`}>Next</Link>
      previousLink = <Link to={`/blog/${prevNum}`}>Previous</Link>
    }
    let renderContent = (
      <div className={styles.postList}>
        {sorted.map((page, i) => (
          <BlogPreview key={i} page={page} />
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
          <BlogPreview page={{ title: 'loading...', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading....', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading...', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading....', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading...', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading....', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading...', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading....', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading...', description: text }} isLoading />
          <BlogPreview page={{ title: 'loading....', description: text }} isLoading />
        </div>
      )
    }
    return (
      <Page {...this.props}>
        <h2 className={styles.pageTitle}>David's Blog</h2>
        <span className={styles.pageSubTitle}>Musings on code, product development & user experience</span>
        <div className={styles.wrapper}>
          {renderContent}
        </div>
      </Page>
    )
  }
}
