/*
  Generate JSON file of all blog authors
*/
const path = require('path')
const fs = require('fs-extra')
const dir = require('node-dir')
const config = require('./config')
const blogRepoPath = config.blogRepoPath
const authorDestinationPath = config.authorDataPath
const authorDataSRC = path.join(blogRepoPath, 'authors')

module.exports = function generateAuthorData() {
  dir.readFiles(authorDataSRC, {
    match: /.json$/,
    //exclude: /^\./
  }, (err, content, filename, next) => {
    if (err) throw err
    next()
  }, (err, files) => {
    if (err) {
      console.log(err)
    }
    const authorFileContents = {}
    for (let i = 0; i < files.length; i++) {
      const authorName = path.basename(files[i], '.json')
      const c = fs.readFileSync(files[i]).toString()
      authorFileContents[authorName] = JSON.parse(c)
    }
    fs.writeFileSync(authorDestinationPath, JSON.stringify(authorFileContents), 'utf-8', (error) => {
      if (error) {
        return console.log(error)
      }
      console.log(`${authorDestinationPath}/author.js file generated`)
    })
    console.log('Blog author data updated')
  }
  )
}
