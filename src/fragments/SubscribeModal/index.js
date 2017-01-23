import React, { Component } from 'react'
import Newsletter from '../../fragments/Newsletter'
import Modal from '../../components/Modal/Modal'
import styles from './SubscribeModal.css'

export default class FeedbackModal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      showModal: false,
    }
  }
  componentDidMount() {
    window.addEventListener('reactRouterRedirect', this.handleToggle, false)
  }
  componentWillUnmount() {
    window.removeEventListener('reactRouterRedirect', this.handleToggle)
  }
  handleToggle = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  render() {
    return (
      <Modal
        active={this.state.showModal}
        onEscKeyDown={this.handleToggle}
        onOverlayClick={this.handleToggle}
        title='Thanks for signing up for the Beta!'
      >
        <p className={styles.title}>
          You will be one of the first people to know when the platform beta is ready.
        </p>
        <div>
          <h3 className={styles.title}>
            In the meantime, Stay up to date with the&nbsp;
            <a
              href='https://github.com/serverless/serverless'
              target='_blank'
              rel='noopener noreferrer'
            >
              framework
            </a>
          </h3>
          <div className={styles.newsletterWrapper}>
            <Newsletter />
          </div>
        </div>
      </Modal>
    )
  }
}
