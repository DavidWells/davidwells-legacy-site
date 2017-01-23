/**
 * Auth0 Lock instance
 */
import { initializeXsrfToken, getXsrfToken } from './xsrfToken'
import { getVisitorID } from '../analytics/visitor'

if (!process.env.AUTH0_CLIENT_ID) {
  throw new Error('AUTH_CLIENT_ID is not defined in /src/_config.js file')
}
if (!process.env.AUTH0_DOMAIN) {
  throw new Error('AUTH_DOMAIN is not defined in /src/_config.js file')
}

let Auth0Lock
let lockInstance // eslint-disable-line

if (typeof window !== 'undefined') {
  Auth0Lock = require('auth0-lock').default // eslint-disable-line
  // init token
  initializeXsrfToken()
  const redirect = encodeURIComponent(window.location.href)
  const redirectURL = `${window.location.origin}/loading/`
  const state = `token=${getXsrfToken()}&url=${redirect}&other=lol`
  // Configure Auth0
  lockInstance = new Auth0Lock( // eslint-disable-line
    process.env.AUTH0_CLIENT_ID,
    process.env.AUTH0_DOMAIN, {
      auth: {
        redirectUrl: redirectURL,
        responseType: 'token',
        params: {
          state,
          analytics: {
            uuid: getVisitorID(),
            // first_url: 'heheheh',
            // first_referrer: 'xyz',
            // last_referrer: 'blah',
            // last_url: 'xyz',
            // num_visits: 2,
            // source: 'Direct Traffic',
            // unique_conversion_events: 'hdhdhd'
          },
          // scope: 'openid email_verified',
        },
      },
      theme: {
        logo: 'https://www.fillmurray.com/130/130',
        primaryColor: '#000'
      },
      languageDictionary: {
        title: 'Serverless'
      }
    })
}

export default lockInstance
