/**
 * Cookie Fallbacks
 */
const isServer = typeof window === 'undefined'

export function createCookie(name, value, days) {
  if (isServer) return false
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = `; expires=${date.toGMTString()}`
  }
  document.cookie = `${name}=${value}${expires}; path=/`
}

export function readCookie(name) {
  if (isServer) return false
  const find = `${name}=`
  const allCookies = document.cookie.split(';')
  for (let i = 0; i < allCookies.length; i++) {
    let cookie = allCookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(find) === 0) {
      return cookie.substring(find.length, cookie.length)
    }
  }
  return null
}

export function eraseCookie(name) {
  createCookie(name, '', -1)
}

export function listCookies() {
  if (isServer) return false
  const cookies = {}
  document.cookie.split(';').forEach((cookie) => {
    const c = cookie.split('=')
    cookies[decodeURIComponent(c[0].replace(/^ /, ''))] = decodeURIComponent(c[1])
  })
  return cookies
}
