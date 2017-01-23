/**
 * Init algolia client search
 */
// import algoliasearch from 'algoliasearch'
const isClient = typeof window !== 'undefined'
// TODO: move this out to config
const algolia = {
  appId: 'VGEPIZHWY4',
  indexName: 'getstarted_actors',
  searchKey: '02f74b26f33b7d5e16b0558f4c24ec8f',
}
let algoliaClient
if (isClient) {
  // algoliaClient = algoliasearch(algolia.appId, algolia.searchKey)
}
export const client = algoliaClient
export const indexName = algolia.indexName
