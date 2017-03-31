import React, { PropTypes, Component } from 'react'
import Page from '../../layouts/Page'
import Form from '../../components/Form'
import TextInput from '../../components/TextInput' // eslint-disable-line
import formValidation from '../../utils/formValidation'
import Button from '../../components/Button'
import styles from './Contact.css'

console.log(formValidation)
export default class Contact extends Component {
  static propTypes = {
    phenomicLoading: PropTypes.bool
  }
  static loadingState = true
  render() {
    const { phenomicLoading } = this.props
    return (
      <Page {...this.props} phenomicLoading={phenomicLoading}>
        <Form className={styles.form}>
          <TextInput name='name' />
          <TextInput
            ref={(c) => { this.url = c }}
            name='url'
            validation={formValidation.isEmail}
            placeholder='Email'
            errorMessageClassName={styles.errorMessage}
            required
          />
          <textarea name='message' />
          <div className={styles.button}>
            <Button>
              Submit Resource
            </Button>
          </div>
        </Form>
        <span className={styles.label}>test</span>
      </Page>
    )
  }
}
