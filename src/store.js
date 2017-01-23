/* eslint-disable */
/* Setup Store depending on NODE_ENV */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./redux/store/store.prod')
} else {
  module.exports = require('./redux/store/store.dev')
}
