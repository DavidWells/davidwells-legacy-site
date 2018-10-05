import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import enhanceCollection from 'phenomic/lib/enhance-collection'
import Page from '../../layouts/Page'
import Preview from './Preview'
import prepopulatedTalks from './prepopulated.json'
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
  renderLoadingState() {
    // If loading pageinated posts
    if (this.props.params && this.props.params.page) {
      const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const loadingPosts = dummy.map((item, i) => {
        return <Preview key={i} page={{ title: 'Loading...' }} isLoading />
      })
      return (
        <div className={styles.postList}>
          {loadingPosts}
        </div>
      )
    }

    // First page load prepopulated data
    const preloadedPosts = prepopulatedTalks.map((post, i) => {
      let data = {
        title: post.title,
        date: post.date,
        event: post.event
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
        <Preview key={i} page={data} isLoading />
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
      renderContent = this.renderLoadingState()
    }
    return (
      <Page {...this.props}>
        <h2 className={styles.pageTitle}>Talks & Workshops</h2>
        <span className={styles.pageSubTitle}>
          Serverless & Javascript UI/UX Training. <Link to='/contact'>Contact David</Link> to speak at your event.
        </span>
        <div className={styles.wrapper}>
          {renderContent}
        </div>
      </Page>
    )
  }
}
