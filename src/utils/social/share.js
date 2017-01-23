
function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']')
}

export function twitterShare(text, url, hashtags) {
  let hash = ''
  const base = `http://twitter.com/share?text=${encodeURIComponent(text)}`
  const link = (url) ? `&url=${url}` : ''
  if (hashtags) {
    if (typeof hashtags === 'string') {
      hash = `&hashtags=${hashtags}`
    } else {
      hash = `&hashtags=${hashtags.join(',')}`
    }
  }
  return `${base}${link}${hash}`
}

export function facebookShare(text, url) {
  const base = 'https://www.facebook.com/sharer/sharer.php?'
  const link = (url) ? `u=${url}` : ''
  const txt = (text) ? fixedEncodeURI(text) : ''
  return `${base}${link}${txt}`
}

/* https://www.facebook.com/sharer/sharer.php?u=https://crew.co/backstage/dispatch/what-does-unsplash-cost&t=What%20does%20Unsplash%20cost%3F

https://www.linkedin.com/shareArticle?summary=&title=What%20does%20Unsplash%20cost%3F&mini=true&url=https://crew.co/backstage/dispatch/what-does-unsplash-cost&source=
*/
