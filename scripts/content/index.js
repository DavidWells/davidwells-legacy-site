/**
 * Blog build pipeline
 */
const fs = require('fs-extra') // eslint-disable-line
const path = require('path')
const asyncLib = require('async') // eslint-disable-line
const removeDateFromFileName = require('./remove-date-from-filename')
const prepopulateBlog = require('./prepopulateBlog')
const prepopulateTalks = require('./prepopulateTalks')
// const updateBlogFileContents = require('./update-blog-yaml')
// const generateAuthorData = require('./generate-author-data')

// set paths
const projectRoot = path.join(__dirname, '..', '..')
const content = path.join(projectRoot, 'content')
const contentDestination = path.join(projectRoot, 'dist-content')

console.log('content', content)
console.log('contentDestination', contentDestination)

asyncLib.waterfall([
  // Empty /content/blog
  function (next) {
    fs.emptyDir(contentDestination, (error) => {
      if (error) {
        console.log(`emptyDirectory fail! ${path}`)
        next(error)
      }
      next(null)
    })
  },
  function (next) {
    fs.copy(content, contentDestination, (error) => {
      if (error) {
        next(error)
      }
      next(null)
    })
  },
  // Update yaml content and add github paths
  // function (next) {
  //   updateBlogFileContents(config.blogSitePath, (err) => {
  //     if (err) return next(err)
  //     console.log('Updated Blog content successfully')
  //     next(null, 'three')
  //   })
  // },
  function (next) {
    removeDateFromFileName(contentDestination, (err, files) => {
      if (err) return next(err)
      console.log('Renamed content files successfully')
      next(null, 'done')
    })
  },
], (err, result) => {
  if (err) {
    console.log('err', err)
  }
  prepopulateBlog()
  prepopulateTalks()
  // generateAuthorData()
  // userNotice()
  console.log('Finished processing Blog posts')
})
