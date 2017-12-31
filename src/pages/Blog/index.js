import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import enhanceCollection from 'phenomic/lib/enhance-collection'
import Page from '../../layouts/Page'
import BlogPreview from './BlogPreview'
import prepopulatedPosts from './prepopulate.json'
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
  constructor(props, context) {
    super(props, context)
    // Get all markdown posts
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: 'Post' },
      sort: 'date',
      reverse: true,
    })
    // merge with external posts
    const allPosts = latestPosts.concat(externalPosts)
    // sort by date
    const sortedPosts = allPosts.sort((date1, date2) => {
      if (date1.date > date2.date) return -1
      if (date1.date < date2.date) return 1
      return 0
    })
    // cache posts
    this.allPosts = sortedPosts
  }
  renderLoadingState() {
    // If loading pageinated posts
    if (this.props.params && this.props.params.page) {
      const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const loadingPosts = dummy.map(() => {
        return <BlogPreview page={{ title: 'Loading...' }} isLoading />
      })
      return (
        <div className={styles.postList}>
          {loadingPosts}
        </div>
      )
    }

    // First page load prepopulated data
    const preloadedPosts = prepopulatedPosts.map((post) => {
      let data = {
        title: post.title
      }
      if (post.url && post.url.match(/davidwells\.io/)) {
        // internal url use react router link
        data = {
          ...data, ...{ __url: post.url }
        }
      } else {
        // external URL target blank link
        data = {
          ...data, ...{ url: post.url }
        }
      }
      return (
        <BlogPreview page={data} isLoading />
      )
    })
    // render prepopulated content
    return (
      <div className={styles.postList}>
        {preloadedPosts}
      </div>
    )
  }
  render() {
    const { isLoading, params } = this.props
    const pageNumber = (params && params.page) ? parseInt(params.page, 10) : 0
    const pagination = numberOfLatestPosts * pageNumber
    const offset = pagination + numberOfLatestPosts

    const sorted = this.allPosts.slice(pagination, offset)

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
      renderContent = this.renderLoadingState()
    }
    return (
      <Page {...this.props}>
        <h2 className={styles.pageTitle}>David's Blog</h2>
        <span className={styles.pageSubTitle}>
          Musings on code, product development & user experience
        </span>
        <div className={styles.wrapper}>
          {renderContent}
        </div>
      </Page>
    )
  }
}
