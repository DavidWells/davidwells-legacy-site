/*
Animation Utils
*/

export const addAnimationEvent = (element, type, callback) => {
  handleAnimationEvent('add', element, type, callback)
}
export const removeAnimationEvent = (element, type, callback) => {
  handleAnimationEvent('remove', element, type, callback)
}

function handleAnimationEvent(action, element, type, callback) {
  let animationType = type
  const prefix = ['webkit', 'moz', 'MS', 'o', '']
  const handler = (action === 'add') ? 'addEventListener' : 'removeEventListener'
  for (let p = 0; p < prefix.length; p++) {
    if (!prefix[p]) {
      animationType = type.toLowerCase()
    }
    element[handler](prefix[p] + animationType, callback, false)
  }
}
