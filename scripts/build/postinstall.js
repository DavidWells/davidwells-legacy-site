// Post install to build components
const cwd = process.cwd()
const path = require('path')
const exec = require('child_process').exec
const fs = require('fs')
const rimraf = require('rimraf')
const blogConfig = require('../blog/config')
const blogRepoPath = blogConfig.blogRepoPath
const seperator = '--------------------------'

console.log('cwd', cwd)
if (process.env.IS_NETLIFY_ENV) {
  console.log('in NETLIFY CI context, don\'t clone stuff just download it')
} else if (cwd.indexOf('node_modules') > -1) {
  console.log('in node_module context, don\'t clone/download extra stuff')
} else {
  // in normal project site. check for blog-content folder
}
