import React, { PropTypes } from 'react'
import Analytics from './Analytics'

export default function GlobalScripts(props) {
  return (
    <div>
      <Analytics {...props} />
    </div>
  )
}
GlobalScripts.propTypes = {
  children: PropTypes.any
}
