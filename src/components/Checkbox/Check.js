import React, { Component, PropTypes } from 'react'
// import classnames from 'classnames'
import CheckComponent from './Checkbox'

const factory = (Check) => {
  class Checkbox extends Component {
    static propTypes = {
      checked: PropTypes.bool,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
      ]),
      name: PropTypes.string,
      onChange: PropTypes.func,
    };

    static defaultProps = {
      checked: false,
      className: '',
      disabled: false
    };

    handleToggle = (event) => {
      if (event.pageX !== 0 && event.pageY !== 0) {
        this.blur()
      }
      if (!this.props.disabled && this.props.onChange) {
        this.props.onChange(!this.props.checked, event)
      }
    };

    blur() {
      this.refs.input.blur()
    }

    focus() {
      this.refs.input.focus()
    }

    render() {
      const { onChange, name, label, className, ...others } = this.props // eslint-disable-line no-unused-vars
      return (
        <div className={className}>
          <Check
            checked={this.props.checked}
            disabled={this.props.disabled}
            name={name}
            label={label}
          />
        </div>
      )
    }
  }

  return Checkbox
}

const Checkbox = factory(CheckComponent)
export default Checkbox
