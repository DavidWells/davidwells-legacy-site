/**
 * Project config
 * NOTE: No private data/keys should be stored here.
 */
module.exports = function siteConfig(isProduction) {
  return (
    {
      SITENAME: process.env.SITENAME || 'davidwells',
      TWITTER: process.env.TWITTER || 'DavidWells',
      GITHUB: process.env.GITHUB || 'DavidWells',
      DISQUS: process.env.DISQUS || 'davidwells',
      GOOGLE_ANALYTICS_UA: (isProduction) ? 'UA-29316392-1' : 'dev',
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || 'oXN9xzJCJAU5BJxftjS4DbGN5hNhGnhk',
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || 'serverlessdev.auth0.com',
      ALGOLIA_ADMIN: process.env.ALGOLIA_ADMIN || '1f21cf7b86876a3ac23e35b2657894aa',
      SEGMENT_KEY: process.env.SEGMENT_KEY || 'gNftvcGllpKZTe5PcAxF8pEoenLq32H0',
      /* Serverless API Gateway Endpoints */
      API: {
        ERROR: 'https://h413evrxuk.execute-api.us-west-2.amazonaws.com/dev/report',
        NEWSLETTER: 'https://3upqirwiuc.execute-api.us-west-2.amazonaws.com/dev/subscribe'
      }
    }
  )
}
