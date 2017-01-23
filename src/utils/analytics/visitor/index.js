import md5 from '../utils/md5'
import uuid from '../utils/uuid'
import { setItem, getItem } from '../../storage'
import getVisitorData from './getVisitorData'

const VISITOR_UNIQUE_ID = 'uid'
const VISITOR_UUID = 'uuid'

const generateVisitorID = (data) => {
  return md5(`${data.canvas
    }:${md5(data.fonts.join(':'))
    }:${JSON.stringify(data.screen)
    }:${JSON.stringify(data.browser)
    }:${JSON.stringify(data.webgl)
    }:${JSON.stringify(data.plugins)}`)
}

const setVisitorID = () => {
  const data = getVisitorData()
  const VisitorID = generateVisitorID(data)
  const VisitorUUID = uuid()
  setItem(VISITOR_UNIQUE_ID, VisitorID)
  setItem(VISITOR_UUID, VisitorUUID)
}

export const getVisitorID = () => {
  return getItem(VISITOR_UNIQUE_ID)
}

export const getVisitorUUID = () => {
  return getItem(VISITOR_UUID)
}

export const initializeVisitorID = () => {
  if (!getVisitorID()) {
    setVisitorID()
  }
}

// import getIPs from './ipData'
// var test = getIPs().then(function (rs) {
//   console.log('yay', rs)
//   return rs
// // do something with the result
// }).catch(function () {
// /* error :( */
// })
