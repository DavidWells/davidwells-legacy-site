/* Get browser Info */
export default function browserInfo() {
  return {
    userAgent: navigator.userAgent,
    cookies: navigator.cookieEnabled,
    java: navigator.javaEnabled(),
    dnt: navigator.doNotTrack,
    lang: navigator.language
  }
}
