/*
  Remove UTM tokens from URL
*/
const removeUTM = () => {
  if (typeof window !== 'undefined') {
    if (window.location.search.indexOf('utm_') !== -1 && window.history && history.replaceState) {
      const cleanURL = window.location.toString().replace(/(\&|\?)utm([_a-z0-9=\.]+)/g, '')
      history.replaceState({}, '', cleanURL)
    }
  }
}
export default removeUTM
