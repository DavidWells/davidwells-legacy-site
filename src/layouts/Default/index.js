/**
 * Base Page template
 */
import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import { BodyContainer, joinUri } from 'phenomic'
import { setItem } from '../../utils/storage'
import styles from './Default.css'


const imgBase = 'https://s3-us-west-2.amazonaws.com/assets.davidwells.io'

const prefetches = [
  `${imgBase}/work/serverless-forms-service-logo.jpg`,
  `${imgBase}/work/serverless-onboarding-v2-thumb.jpg`,
  `${imgBase}/work/serverless-post-scheduler.jpg`,
  `${imgBase}/work/serverless-site-v2-thumbnail.jpg`,
  `${imgBase}/work/serverless-scope-logo.jpg`,
]

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
  /** if true, page will be full width */
  fullWidth: PropTypes.bool,
  className: PropTypes.string
}

class Default extends Component {
  componentDidMount() {
    // Set last page viewed for 404 tracker
    setItem('last_page_viewed', window.location.href)
  }
  render() {
    const {
      // __filename,
      __url,
      head,
      body,
      header,
      footer,
      children,
      className,
      fullWidth,
      isLoading
    } = this.props
    let metaTitle
    let meta
    const link = []
    let contentWrapperClass = (fullWidth) ? styles.fullWidth : styles.page
    let slugClass
    if (!isLoading && head) {
      metaTitle = head.metaTitle || head.title
      meta = [
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: metaTitle },
        {
          property: 'og:url',
          content: joinUri(process.env.PHENOMIC_USER_URL, __url),
        },
      { property: 'og:description', content: head.description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: metaTitle },
      { name: 'twitter:creator', content: `@${process.env.TWITTER}` },
      { name: 'twitter:description', content: head.description },
      { name: 'description', content: head.description },
      ]
      slugClass = `page${__url.replace(/\//g, '-').replace(/-$/g, '')}`
      if (head.fullWidth) {
        contentWrapperClass = (head.fullWidth) ? styles.fullWidth : styles.page
      }
    }
    // reset for loading state
    const bodyContent = body || ''
    /* Markdown content will display if it exists */
    const markdown = (
      <BodyContainer>
        {bodyContent}
      </BodyContainer>
    )

    let customScript
    let inlineScripts
    let inlineCSS
    /* if scripts field defined, inject it */
    if (head && head.scripts) {
      if (typeof head.scripts === 'string') {
        // add single script
        customScript = (
          <Helmet script={[{ src: head.scripts, type: 'text/javascript' }]} />
        )
      } else if (typeof head.scripts === 'object') {
        // add multiple
        customScript = head.scripts.map((script, i) => {
          return (
            <Helmet key={i} script={[{ src: script, type: 'text/javascript' }]} />
          )
        })
      }
    }
    /* if inlineJS defined, inject it */
    if (head && head.inlineJS) {
      inlineScripts = (
        <Helmet script={[{ type: 'text/javascript', innerHTML: head.inlineJS }]} />
      )
    }
    /* if inlineCSS defined, inject it */
    if (head && head.inlineCSS) {
      inlineCSS = (
        <Helmet
          style={[{
            cssText: head.inlineCSS
          }]}
        />
      )
    }

    if (prefetches && prefetches instanceof Array) {
      prefetches.forEach(prefetchLink => {
        link.push({ rel: 'prefetch', href: prefetchLink })
      })
    }

    const pageClass = (head) ? `layout-${head.layout.toLowerCase()}` : ''
    const classes = classnames(contentWrapperClass, slugClass, className)
    return (
      <div id='base' className={pageClass}>
        <Helmet title={metaTitle} meta={meta} link={link} />
        <div className={classes}>
          {header}
          {children || markdown}
          {footer}
        </div>
        {customScript}
        {inlineScripts}
        {inlineCSS}
      </div>
    )
  }
}

Default.propTypes = propTypes
export default Default
