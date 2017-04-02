/**
 * Add callbacks to browser window visibility
 * @param {function} isVisibleCallback
 * @param {function} isHiddenCallback
 */

/*
Usage:

function visible(e) { console.log('visible') }
function hidden(e) { console.log('hidden') }

addVisiblityListener(visible, hidden)
*/

const addVisiblityListener = (isVisibleCallback, isHiddenCallback) => {
  const { visibilityChange, hidden } = getVenderVisiblityPrefixes()
  let documentHidden = document[hidden]
  document.addEventListener(visibilityChange, (e) => {
     /*! Listen for visibility changes */
    if (documentHidden !== document[hidden]) {
      if (document[hidden]) {
        // Document hidden
        isHiddenCallback && isHiddenCallback(e) // eslint-disable-line
      } else {
        // Document shown
        isVisibleCallback && isVisibleCallback(e) // eslint-disable-line
      }
      documentHidden = document[hidden]
    }
  })
}

const getVenderVisiblityPrefixes = () => {
  if (typeof document.hidden !== 'undefined') {
    return {
      hidden: 'hidden',
      visibilityChange: 'visibilitychange',
      visibilityState: 'visibilityState'
    }
  } else if (typeof document.mozHidden !== 'undefined') {
    return {
      hidden: 'mozHidden',
      visibilityChange: 'mozvisibilitychange',
      visibilityState: 'mozVisibilityState'
    }
  } else if (typeof document.msHidden !== 'undefined') {
    return {
      hidden: 'msHidden',
      visibilityChange: 'msvisibilitychange',
      visibilityState: 'msVisibilityState'
    }
  } else if (typeof document.webkitHidden !== 'undefined') {
    return {
      hidden: 'webkitHidden',
      visibilityChange: 'webkitvisibilitychange',
      visibilityState: 'webkitVisibilityState'
    }
  }
}

export default addVisiblityListener
