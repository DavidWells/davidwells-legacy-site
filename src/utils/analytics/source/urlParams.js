/* get URL parameters as object */
import { setItem, getItem } from '../../storage'
import constants from '../constants'

const FIRST_CAMPAIGN_SOURCE = constants.FIRST_CAMPAIGN_SOURCE
const LAST_CAMPAIGN_SOURCE = constants.LAST_CAMPAIGN_SOURCE

export function getParams(url) {
  const urlParams = {}
  const pattern = /([^&=]+)=?([^&]*)/g
  let params
  let matches
  if (url) {
    const p = url.match(/\?(.*)/) // query
    params = (p && p[1]) ? p[1].split('#')[0] : ''
  } else {
    params = window.location.search.substring(1)
  }
  if (!params) return false
  while (matches = pattern.exec(params)) { // eslint-disable-line
    if (matches[1].indexOf('[') == '-1') { // eslint-disable-line
      urlParams[decode(matches[1])] = decode(matches[2])
    } else {
      const b1 = matches[1].indexOf('[')
      const aN = matches[1].slice(b1 + 1, matches[1].indexOf(']', b1))
      const pN = decode(matches[1].slice(0, b1))

      if (typeof urlParams[pN] !== 'object') {
        urlParams[decode(pN)] = {}
        urlParams[decode(pN)].length = 0
      }

      if (aN) {
        urlParams[decode(pN)][decode(aN)] = decode(matches[2])
      } else {
        Array.prototype.push.call(urlParams[decode(pN)], decode(matches[2]))
      }
    }
  }
  return urlParams
}

function decode(s) {
  return decodeURIComponent(s).replace(/\+/g, ' ')
}

const getFirstCampaign = () => {
  return getItem(FIRST_CAMPAIGN_SOURCE)
}

export default function initializeParamData() {
  const urlParams = getParams(window.location.href)
  if (urlParams) {
    getFirstCampaign().then((campaign) => {
      if (!campaign) {
        setItem(FIRST_CAMPAIGN_SOURCE, urlParams)
      }
      setItem(LAST_CAMPAIGN_SOURCE, urlParams)
    })
    // console.log('urlParams', urlParams) // eslint-disable-line
  } else {
    // console.log('no params')
  }
}
