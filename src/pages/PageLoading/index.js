import React from 'react'
import Helmet from 'react-helmet'
import Header from '../../fragments/Header'
import Footer from '../../fragments/Footer'
import styles from './index.css'

const PageLoading = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Helmet title={'Loading...'} />
      <Header />
      <div className={styles.loader}>
        <div className={styles.spinner} />
      </div>
      <Footer />
    </div>
  )
}

export default PageLoading
