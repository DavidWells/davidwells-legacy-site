
/* fix URL encoding */
export function encode(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']')
}

export function cleanURL(url) {
  if (url) {
    return url.replace(/#[^#]*$/, '').replace(/\?[^\?]*$/, '')
  }
  if (typeof window === 'undefined') return false
  const { protocol, hostname, port, pathname } = window.location
  const portString = port ? `:${port}` : ''
  return `${protocol}//${hostname}${portString}${pathname}`
}

export function getParentUrl(url) {
  const arr = url.split('/')
  arr.pop()
  return arr.join('/')
}

export function getCurrentUrl(url) {
  if (url) return url
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }
  // for SSR
  return 'fakeURL'
}
