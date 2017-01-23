/*
  Load scripts
*/

if (typeof window !== 'undefined') {
  window.loadedScripts = {}
}

export function addScript(scriptSrc, cb) {
  if (window.loadedScripts[`'${scriptSrc}'`]) {
    /* script already loaded */
    return false
  }
  const s = document.getElementsByTagName('script')[0]
  const el = document.createElement('script')
  el.type = 'text/javascript'
  el.async = true
  el.src = scriptSrc
  el.id = scriptSrc
  el.addEventListener('load', (e) => {
    window.loadedScripts[`'${scriptSrc}'`] = true
    if (cb) {
      cb(null, e)
    }
  }, false)
  return s.parentNode.insertBefore(el, s)
}

export function removeScript(scriptSrc) {
  const script = document.getElementById(scriptSrc)
  script.parentElement.removeChild(script)
  delete window.loadedScripts[`'${scriptSrc}'`]
}
