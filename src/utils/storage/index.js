/**
  LocalForage with cookie fallbacks
*/
import localforage from 'localforage'
import { createCookie, readCookie, eraseCookie } from './cookie'
const isServer = typeof window === 'undefined'
const localStorageSupport = localStorageSupported()
const localForageSupport = storageSupported()

localforage.config({
  name: 'site',
})

export function setItem(key, value, callback) {
  if (isServer) return false
  if (localForageSupport) {
    // if callback return with callback else return Promise
    return (callback) ? localforage.setItem(key, value, callback) : localforage.setItem(key, value)
  }
  // no localForage support. Fallback to cookie
  try {
    createCookie(key, value)
    // default return promise
    return (callback) ? callback(value) : new Promise((resolve, reject) => resolve(value))
  } catch (e) {
    // Cookies failed set window.var
    window[key] = value
    return (callback) ? callback(value) : new Promise((resolve, reject) => resolve(value))
  }
}

export function getItem(key, callback) {
  if (isServer) return false
  if (localForageSupport) {
    // if callback return with cb or do promise
    return (callback) ? localforage.getItem(key, callback) : localforage.getItem(key)
  }
  // no localStorage support. Fallback to cookie
  try {
    const value = parse(readCookie(key))
    // if callback return with callback else return Promise
    return (callback) ? callback(value) : new Promise((resolve, reject) => resolve(value))
  } catch (e) {
    // Cookies failed use window.var
    const value = window[key]
    return (callback) ? callback(value) : new Promise((resolve, reject) => resolve(value))
  }
}

export function removeItem(key, callback) {
  if (isServer) return false
  if (localForageSupport) {
    // if callback return with callback else return Promise
    return (callback) ? localforage.removeItem(key, callback) : localforage.removeItem(key)
  }
  // no localStorage support. Fallback to cookie
  try {
    eraseCookie(key)
    // if callback return with callback else return Promise
    return (callback) ? callback(true) : new Promise((resolve, reject) => resolve(true))
  } catch (e) {
    // Cookies failed nullify window.var
    window[key] = null
    // if callback return with callback else return Promise
    return (callback) ? callback(true) : new Promise((resolve, reject) => resolve(true))
  }
}

export function setItemSync(key, value) {
  if (isServer) return false
  if (localStorageSupport) {
    const item = JSON.stringify(value)
    window.localStorage.setItem(key, item)
    return parse(item)
  }
  // no localStorage support. Fallback to cookie
  try {
    createCookie(key, value)
  } catch (e) {
    // no cookie support. Fallback to window
    window[key] = value
  }
  return value
}

export function getItemSync(key) {
  if (isServer) return false
  if (localStorageSupport) {
    return parse(window.localStorage.getItem(key))
  }
  // no localStorage support. Fallback to cookie
  try {
    return parse(readCookie(key))
  } catch (e) {
    // no cookie support. Fallback to window
    return (window[key]) ? (window[key]) : null
  }
}

export function removeItemSync(key) {
  if (isServer) return false
  if (localStorageSupport) {
    return localStorage.removeItem(key)
  }
  // no localStorage support. Fallback to cookie
  try {
    eraseCookie(key)
  } catch (e) {
    // no cookie support. Fallback to window
    window[key] = null
  }
  return null
}

function storageSupported() {
  const { INDEXEDDB, WEBSQL, LOCALSTORAGE, supports } = localforage
  return supports(INDEXEDDB) || supports(WEBSQL) || supports(LOCALSTORAGE)
}

function localStorageSupported() {
  if (isServer) return false
  if ('localStorage' in window) {
    try {
      if (typeof localStorage === 'undefined' || typeof JSON === 'undefined') return false
      // test for safari private
      const CHECK_PRIVATE_SAFARI = Math.floor(Math.random() * 1e10)
      localStorage.setItem(CHECK_PRIVATE_SAFARI, '1')
      localStorage.removeItem(CHECK_PRIVATE_SAFARI)
    } catch (err) {
      return false
    }
    return true
  }
}

function parse(result) {
  let value
  try {
    value = JSON.parse(result)
    if (typeof value === 'undefined') {
      value = result
    }
    if (value === 'true') {
      value = true
    }
    if (value === 'false') {
      value = false
    }
    if (parseFloat(value) === value && typeof value !== 'object') {
      value = parseFloat(value)
    }
  } catch (e) {
    value = result
  }
  return value
}

export { createCookie, readCookie, eraseCookie } from './cookie'
