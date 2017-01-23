import React, { Component, PropTypes } from 'react'
import SVG from 'react-svg-inline'
import styles from './SearchResult.css'
import AlgoliaLogo from '../../assets/images/algolia.svg'

export default class SearchResult extends Component {
  static propTypes = {
    hits: PropTypes.array.isRequired,
  };

  render() {
    const hits = this.props.hits

    return (
      <div>
        <h1 className={styles.title}>Kết quả tìm kiếm</h1>
        {hits.length <= 0 &&
          <span>Search results</span>}
        {hits.length > 0 &&
          this.props.hits.map((post, key) => {
            const data = {
              ...post,
              title: post._highlightResult.title.value,
              description: post._highlightResult.content.value,
              __url: `/${post.route}/`,
            }

            return (
              <div key={key}>
                search
                {data.name}
              </div>
            )
          })}
        <p className={styles.algolia}><SVG svg={AlgoliaLogo} /></p>
      </div>
    )
  }
}
