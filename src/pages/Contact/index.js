import React, { PropTypes, Component } from 'react' // eslint-disable-line
import Page from '../../layouts/Page'
import Form from '../../components/Form'
import TextInput from '../../components/TextInput' // eslint-disable-line
import formValidation from '../../utils/formValidation'
import Button from '../../components/Button'
import styles from './Contact.css'

export default class Contact extends Component {
  static hasLoadingState = true
  render() {
    // const { isLoading } = this.props
    return (
      <Page {...this.props} >
        <div className={styles.page}>
          <h1>Contact David</h1>
          <Form className={styles.form}>
            <TextInput
              name='name'
              validation={(v) => { return v && v.length }}
              placeholder='Name'
              required
            />
            <TextInput
              ref={(c) => { this.url = c }}
              name='email'
              validation={formValidation.isEmail}
              placeholder='Email'
              errorMessageClassName={styles.errorMessage}
              required
            />
            <textarea name='message' placeholder='What can I help you with?' />
            <div className={styles.button}>
              <Button>
                Get in touch
              </Button>
            </div>
          </Form>
        </div>
      </Page>
    )
  }
}
