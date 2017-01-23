/**
 * Blog build pipeline
 */
const fs = require('fs-extra') // eslint-disable-line
const path = require('path')
const asyncLib = require('async') // eslint-disable-line
const removeDateFromFileName = require('./remove-date-from-filename')
// const updateBlogFileContents = require('./update-blog-yaml')
// const generateAuthorData = require('./generate-author-data')

// set paths
const projectRoot = path.join(__dirname, '..', '..')
const blogContent = path.join(projectRoot, 'blog-content')
const blogDestination = path.join(projectRoot, 'content/blog/')

console.log('blogContent', blogContent)
console.log('blogDestination', blogDestination)

asyncLib.waterfall([
  // Empty /content/blog
  function (next) {
    fs.emptyDir(blogDestination, (error) => {
      if (error) {
        console.log(`emptyDirectory fail! ${path}`)
        next(error)
      }
      next(null)
    })
  },
  function (next) {
    fs.copy(blogContent, blogDestination, (error) => {
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
    removeDateFromFileName(blogDestination, (err, files) => {
      if (err) return next(err)
      console.log('Renamed Blog files successfully')
      next(null, 'done')
    })
  },
], (err, result) => {
  if (err) {
    console.log('err', err)
  }
  // generateAuthorData()
  // userNotice()
  console.log('Finished processing Blog posts')
})
