import md5 from '../utils/md5'
import uuid from '../utils/uuid'
// import getIPs from './ipData'
import { setItem, getItem } from '../../storage'
import { cleanURL } from '../../url'
import getVisitorData from './getVisitorData'
import constants from '../constants'

const VISITOR_UNIQUE = constants.VISITOR_UNIQUE
const VISITOR_UUID = constants.VISITOR_UUID
const FIRST_PAGE_SEEN = constants.FIRST_PAGE_SEEN
const LAST_PAGE_SEEN = constants.LAST_PAGE_SEEN

const generateVisitorID = (data) => {
  return md5(`${data.canvas
    }:${md5(data.fonts.join(':'))
    }:${JSON.stringify(data.screen)
    }:${JSON.stringify(data.browser)
    }:${JSON.stringify(data.webgl)
    }:${JSON.stringify(data.plugins)}`)
}

const generateUniqueID = () => {
  const data = getVisitorData()
  const uniqueID = generateVisitorID(data)
  return uniqueID
}

export const getUniqueID = () => {
  return getItem(VISITOR_UNIQUE)
}

export const getPageFirstSeen = () => {
  return getItem(FIRST_PAGE_SEEN)
}

export const getVisitorUUID = () => {
  return getItem(VISITOR_UUID)
}

export const initializeVisitorID = () => {
  if (process.env.NODE_ENV === 'development') {
    console.time('track') // eslint-disable-line
  }
  const uuId = getVisitorUUID().then((id) => {
    if (id) return Promise.resolve(id)
    const VisitorUUID = uuid()
    return setItem(VISITOR_UUID, VisitorUUID)
  })
  const uniqueID = getUniqueID().then((id) => {
    if (id) Promise.resolve(id)
    const uID = generateUniqueID()
    return setItem(VISITOR_UNIQUE, uID)
  })
  const pageFirstSeen = getPageFirstSeen().then((p) => {
    if (p) return Promise.resolve(p)
    return setItem(FIRST_PAGE_SEEN, cleanURL())
  })
  // Make API call
  Promise.all([uuId, uniqueID, pageFirstSeen]).then(values => {
    // console.log(values)
    // remote request
    if (process.env.NODE_ENV === 'development') {
      console.timeEnd('track') // eslint-disable-line
    }
  }).catch(reason => {
    console.log(reason) // eslint-disable-line
  })
  // const ips = getIPs().then((ip) => {
  //   return setItem(VISITOR_TRAITS, ip)
  // })
  // on page load set last page seen
  setItem(LAST_PAGE_SEEN, cleanURL())
}

export const setPageViews = () => {
  setItem(LAST_PAGE_SEEN, cleanURL())
}
