/*eslint-disable */
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import enhanceCollection from 'phenomic/lib/enhance-collection'
import Page from '../../layouts/Page'
import Button from '../../components/Button'
import styles from './Work.css'

const numberOfLatestPosts = 40

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
      <Link to={page.__url}>
        <span className={styles.thumbnailWrapper}>
          <img className={styles.thumbnail} src={page.thumbnail} />
        </span>
        <div className={styles.details}>
          <h3>
            {page.title}
          </h3>
          <span className={styles.description}>
            {page.description}
          </span>
        </div>
        <Button className={styles.button}>
          View Project
        </Button>
      </Link>
    </li>
  )
}


export default class Work extends Component {
  static propTypes = {
    phenomicLoading: PropTypes.bool
  }
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }
  static loadingState = true
  constructor (props, context) {
    super(props, context)
    this.state = {
      display: 'list'
    }
  }
  toggleView = (e) => {
    console.log(e.target.dataset)
    this.setState({
      display: e.target.dataset.view
    })
  }
  render() {
    const { phenomicLoading, isLoading, params } = this.props
    const { display } = this.state
    const viewType = styles[display]
    const pageNumber = (params && params.page) ? parseInt(params.page, 10) : 0
    const pagination = numberOfLatestPosts * pageNumber
    const offset = pagination + numberOfLatestPosts
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: 'Portfolio' },
      sort: 'date',
      reverse: true,
    })
    .slice(pagination, offset)
    console.log('latestPosts', latestPosts)

    let renderContent = (
      <ul className={styles.postList}>
        {latestPosts.map((page, i) => (
          <Preview key={i} page={page} />
        ))}
      </ul>
    )

    const listActivce = (display === 'list') ? ` ${styles.active}` : ''
    const gridActivce = (display === 'grid') ? ` ${styles.active}` : ''
    return (
      <Page {...this.props} phenomicLoading={phenomicLoading}>
        portfolio
        <div className={styles.container}>
          <div className={styles.switcher + ' ' + viewType}>
            <div className={styles.options}>
              <div onClick={this.toggleView} className={styles.listToggle + listActivce}  data-view="list">
                <span data-view="list" className=""></span>
                <span data-view="list" className=""></span>
                <span data-view="list" className=""></span>
              </div>
              <div onClick={this.toggleView} className={styles.gridToggle + gridActivce} data-view="grid">
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
                <span data-view="grid" className="active"></span>
              </div>
            </div>

            {renderContent}
            
          </div>
        </div>
      </Page>
    )
  }
}