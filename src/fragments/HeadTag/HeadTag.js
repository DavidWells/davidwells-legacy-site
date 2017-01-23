import React from 'react'
import Helmet from 'react-helmet'

const HeadTag = (_props) => {
  return (
    <div>
      <style>
        {'@-ms-viewport { width: device-width; }'}
      </style>
      <Helmet
        meta={[
          { property: 'og:site_name', content: process.env.SITENAME },
          { name: 'twitter:site', content: `@${process.env.TWITTER}` },
          {
            name: 'google-site-verification',
            content: '1HdFnJaYYEiONgCRl3fj7lQobYY4uXPe5L2-sTgNzKQ'
          },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]}
      />
    </div>
  )
}

export default HeadTag
