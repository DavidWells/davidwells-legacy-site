import React, { PropTypes } from 'react'
import Newsletter from '../Newsletter'

const NewsletterCTA = (props) => {
  return (
    <div className={props.className} style={props.style}>
      <h3>
        Stay up to date<br />
        Subscribe to the Newsletter
      </h3>
      <Newsletter />
    </div>
  )
}

NewsletterCTA.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}
export default NewsletterCTA
