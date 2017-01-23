/**
 * Base Page template
 */
import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import { BodyContainer, joinUri } from 'phenomic'
import { setItem } from '../../utils/storage'
import getURLParams from '../../utils/urlHelpers'
import Header from '../../fragments/Header'
import Footer from '../../fragments/Footer'
import styles from './Default.css'

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
  phenomicLoading: PropTypes.bool,
  className: PropTypes.string
}

class Default extends Component {
  componentDidMount() {
    const urlParams = getURLParams(window.location.href)
    if (urlParams) {
      console.log('urlParams', urlParams)
    }
    // Set last page viewed for 404 tracker
    setItem('sls_last_page', window.location.href)
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

    let contentWrapperClass = (fullWidth) ? styles.fullWidth : styles.page
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
      if (head.fullWidth) {
        contentWrapperClass = (head.fullWidth) ? styles.fullWidth : styles.page
      }
    }
    /* const linkTags = [
      {
        'rel': 'canonical',
        'href': joinUri(process.env.PHENOMIC_USER_URL, __url)
      },
       link={linkTags}
    ]*/
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
    const pageClass = (head) ? `layout-${head.layout.toLowerCase()}` : ''
    const classes = classnames(contentWrapperClass, className)
    return (
      <div id='base' className={pageClass}>
        <Helmet title={metaTitle} meta={meta} />
        <Header />
        <div className={classes}>
          {header}
          {children || markdown}
          {footer}
        </div>
        <Footer />
        {customScript}
        {inlineScripts}
        {inlineCSS}
      </div>
    )
  }
}

Default.propTypes = propTypes
export default Default
