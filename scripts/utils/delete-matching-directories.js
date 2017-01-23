/*
Remove all directories that match a specific regex pattern
*/
const fs = require('fs-extra')
const dir = require('node-dir')

module.exports = function deleteMatchingDirectories(path, pattern, callBack) {
  dir.subdirs(path, (err, subdirs) => {
    if (err) {
      return callBack && callBack(err)
    }
    subdirs.filter((x) => {
      return x.match(pattern)
    }).forEach((dir) => {
      fs.removeSync(dir, (err) => {
        if (err) {
          return callBack && callBack(err)
        }
        console.log(`success! all directories matching ${pattern} removed`)
      })
    })
    callBack && callBack(null)
  })
}
