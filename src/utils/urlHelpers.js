/* possibly better solution: https://regex101.com/r/jH7sC7/1 */
// (.+)(\?)(.+)

function decode(s) {
  return decodeURIComponent(s).replace(/\+/g, ' ')
}

export default function getURLParams(url) {
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
  if (!params) { return false }
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
/*
var getParameterVal = function (name, string) {
  return (RegExp(name + '=' + '(.+?)(&|$)').exec(string) || [, false])[1]
}
*/
