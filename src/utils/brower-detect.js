/* eslint-disable */
/* Browser detection */
import classnames from 'classnames'


module.exports = function initUAClasses() {
  if (typeof window === 'undefined') {
    return false
  }
  const html = document.documentElement
  const uaClasses = getBrowserClassNames()
  const classes = classnames(html.className, uaClasses)
  html.className = classes
}

function getBrowserClassNames() {
  const ua = navigator.userAgent.toLowerCase()
  const is = (string) => {
    return ua.indexOf(string) > -1
  }
  const g = 'gecko'
  const w = 'webkit'
  const s = 'safari'
  const o = 'opera'
  const m = 'mobile'
  const js = [!/opera|webtv/i.test(ua) && /msie\s(\d)/.test(ua) ? `ie ie${RegExp.$1}` : is('firefox/2') ? `${g} ff2` : is('firefox/3.5') ? `${g} ff3 ff3_5` : is('firefox/3.6') ? `${g} ff3 ff3_6` : is('firefox/3') ? `${g} ff3` : is('gecko/') ? g : is('opera') ? o + (/version\/(\d+)/.test(ua) ? ` ${o}${RegExp.$1}` : /opera(\s|\/)(\d+)/.test(ua) ? ` ${o}${RegExp.$2}` : '') : is('konqueror') ? 'konqueror' : is('blackberry') ? `${m} blackberry` : is('android') ? `${m} android` : is('chrome') ?
  `${w} chrome` : is('iron') ? `${w} iron` : is('applewebkit/') ? `${w} ${s}${/version\/(\d+)/.test(ua) ? ` ${s}${RegExp.$1}` : ''}` : is('mozilla/') ? g : '', is('j2me') ? `${m} j2me` : is('iphone') ? `${m} iphone` : is('ipod') ? `${m} ipod` : is('ipad') ? `${m} ipad` : is('mac') ? 'mac' : is('darwin') ? 'mac' : is('webtv') ? 'webtv' : is('win') ? `win${is('windows nt 6.0') ? ' vista' : ''}` : is('freebsd') ? 'freebsd' : is('x11') || is('linux') ? 'linux' : '', 'js']
  return js.join(' ')
}
