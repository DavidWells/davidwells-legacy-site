/*
  Get referral data
*/
import { setItem, getItem } from '../../storage'
import { cleanURL } from '../../url'
import constants from '../constants'

const FIRST_REFERRING_SITE = constants.FIRST_REFERRING_SITE
const LAST_REFERRING_SITE = constants.LAST_REFERRING_SITE

const isExternalReferrer = () => {
  if (typeof document !== 'undefined' && document.referrer) {
    const port = window.document.location.port
    let ref = document.referrer.split('/')[2]
    if (port) {
      ref = ref.replace(`:${port}`, '')
    }
    return ref !== window.location.hostname
  }
  return false
}

const getFirstRef = () => {
  return getItem(FIRST_REFERRING_SITE)
}


export default function initializeReferralData() {
  if (isExternalReferrer()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Referring site', document.referrer) // eslint-disable-line
    }
    // console.log(document.referrer.split('/')[2])
    getFirstRef().then((site) => {
      if (!site) {
        setItem(FIRST_REFERRING_SITE, cleanURL(document.referrer))
      }
      setItem(LAST_REFERRING_SITE, cleanURL(document.referrer))
    })
  }
}
