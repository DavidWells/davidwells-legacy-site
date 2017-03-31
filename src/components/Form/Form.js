import React, { PropTypes } from 'react'
import AutoForm from 'react-auto-form'

const Form = ({ onSubmit, onChange, children, className }) => {
  return (
    <AutoForm className={className} onChange={onChange} onSubmit={onSubmit}>
      {children}
    </AutoForm>
  )
}

Form.propTypes = {
  children: PropTypes.any,
  // event, name, data, change
  onChange: PropTypes.func,
  // event, data
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  // onBlur: PropTypes.func,
  // onFocus: PropTypes.func,
  // onKeyPress: PropTypes.func,
}

export default Form
