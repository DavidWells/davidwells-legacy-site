
export default function handleClickOutside(elem, event) {
  const e = window.event || event

  let el = eventTarget(e)
  while (el !== null) {
    if (el === elem) {
      return false
    }
    el = el.parentNode
  }
  return true
}

function eventTarget(event) {
  let targ = event.target ? event.target : event.srcElement
  if (targ !== null) {
    if (targ.nodeType === 3) {
      targ = targ.parentNode
    }
  }
  return targ
}
