import React, { PropTypes, Component } from 'react' // eslint-disable-line
import axios from 'axios'
import Page from '../../layouts/Page'
import Form from '../../components/Form'
import TextInput from '../../components/TextInput' // eslint-disable-line
import formValidation from '../../utils/formValidation'
import Button from '../../components/Button'
import styles from './Contact.css'

export default class Contact extends Component {
  static hasLoadingState = true
  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false,
      success: false
    }
  }

  handleSubmit = (event, data) => {
    event.preventDefault()

    if (!data || !data.name || !data.email || !data.message) {
      alert('Please enter name, email and message') // eslint-disable-line
      return false
    }

    this.setState({
      loading: true
    })

    console.log(data) // eslint-disable-line
    // handle data
    axios({
      method: 'post',
      url: 'https://opf3yjl84g.execute-api.us-west-1.amazonaws.com/prod/contact',
      data,
    }).then((response) => {
      if (response.data && response.data.data && response.data.data.MessageId) {
        console.log('creation succeed', response.data.MessageId)
        setTimeout(() => {
          this.setState({
            loading: false,
            success: true
          })
        }, 500)
      } else {
        this.setState({
          loading: false,
          error: true
        })
      }
    }).catch((error) => {
      this.setState({
        loading: false,
        error: true
      })
    })
  }
  renderLoader() {
    const { loading, success } = this.state
    if (success) {
      return null
    }
    if (loading) {
      return (
        <div className={styles.loader}>
          <div className={styles.text}>
            Contacting David...
          </div>
        </div>
      )
    }
  }
  renderForm() {
    const { success } = this.state
    if (success) {
      return (
        <div>
          <p>Thanks for reaching out!</p>
          <p>You can also ping me on Twitter <a href='https://twitter.com/davidwells' target='_blank' rel='noopener noreferrer'>@DavidWells</a></p>
        </div>
      )
    }
    return (
      <Form className={styles.form} onSubmit={this.handleSubmit} trimOnSubmit>
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
    )
  }
  render() {
    return (
      <Page {...this.props} >
        <div className={styles.page}>
          <h1>Contact David</h1>
          {this.renderLoader()}
          {this.renderForm()}
        </div>
      </Page>
    )
  }
}
