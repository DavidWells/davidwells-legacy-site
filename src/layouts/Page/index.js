import React, { Component, PropTypes } from 'react'
import { BodyContainer } from 'phenomic'
import classnames from 'classnames'
import { Link } from 'react-router'
import Svg from 'react-svg-inline'
import { getCurrentUrl } from '../../utils/url'
import twitterSVG from '../../assets/icons/twitter.svg'
import githubSVG from '../../assets/icons/github.svg'
// import facebookSVG from '../../assets/icons/facebook.svg'
import linkedInSVG from '../../assets/icons/linkedin.svg'
import Default from '../Default'
import ContentLoading from '../../components/ContentLoading/Paragraph'
import styles from './Page.css'

export default class Page extends Component {
  static hasLoadingState = true
  renderLinks() { // eslint-disable-line
    const { __url } = this.props
    const url = getCurrentUrl(__url)
    const links = [{
      text: 'Work',
      url: '/work/'
    }, {
      text: 'Talks',
      url: '/talks/'
    }, {
      text: 'Blog',
      url: '/blog/'
    }, {
      text: 'Contact',
      url: '/contact/'
    }]
    return links.map((link, i) => {
      let currentStyle
      if (typeof window !== 'undefined' && url.match(link.url)) {
        currentStyle = styles.currentURL
      }
      return (
        <Link key={i} to={link.url} className={currentStyle}>
          <span className={styles.pill}>{link.text}</span>
        </Link>
      )
    })
  }
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
            <div className={styles.sidebarFixed}>
              <figure className={styles.header}>
                <Link to='/'><h1>
                  David Wells
                </h1></Link>
                <h2>Full Stack Developer</h2>
                <h3>Serverless Architectures<br />User Experience & Product</h3>
                <span className={styles.mobileTag}>
                  Serverless, User Experience & Product
                </span>
              </figure>
              <nav className={styles.nav}>
                {this.renderLinks()}
              </nav>
              <div className={styles.social}>
                <a href='https://github.com/davidwells' target='_blank' rel='noopener noreferrer'>
                  <Svg svg={githubSVG} cleanup />
                </a>
                <a href='http://twitter.com/davidwells' target='_blank' rel='noopener noreferrer'>
                  <Svg className={styles.twitter} svg={twitterSVG} cleanup />
                </a>
                <a href='https://www.linkedin.com/in/davidgwells/' target='_blank' rel='noopener noreferrer'>
                  <Svg svg={linkedInSVG} cleanup />
                </a>
              </div>
            </div>
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
  head: PropTypes.object,
  __url: PropTypes.string,
  phenomicLoading: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
}
