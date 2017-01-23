import React, { Component, PropTypes } from 'react'
/* include non SSR compatible library */
const Clipboard = (typeof window !== 'undefined') ? require('clipboard') : null

const propTypes = {
  children: PropTypes.any,
  text: PropTypes.string,
}
export default class Copy extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      copied: false
    }
    this.clipboardInstance = null
  }
  componentDidMount() {
    console.log('this refs', this.refs)
    this.clipboardInstance = new Clipboard(this.refs.copyElement)
    this.clipboardInstance.on('success', (e) => {
      console.info('Action:', e.action)
      console.info('Text:', e.text)
      console.info('Trigger:', e.trigger)

      e.clearSelection()
    })

    this.clipboardInstance.on('error', (e) => {
      console.error('Action:', e.action)
      console.error('Trigger:', e.trigger)
    })
  }
  componentWillUnmount() {
    this.clipboardInstance.destroy()
  }
  render() {
    const { text, children } = this.props
    let copyText
    if (text) {
      copyText = text
    } else if (children && typeof children === 'string') {
      copyText = children
    }
    return (
      <span ref='copyElement' data-clipboard-text={copyText}>
        {children}
      </span>
    )
  }
}

Copy.propTypes = propTypes
