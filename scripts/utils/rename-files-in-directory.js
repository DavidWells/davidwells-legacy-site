const dir = require('node-dir')
const fs = require('fs-extra')

module.exports = function renameFilesInDirectory(directoryPath, pattern, callBack) {
  dir.files(directoryPath, (err, files) => {
    if (err) {
      return callBack(err)
    }
    files.forEach((name) => {
      const newName = name.replace(pattern, '')
      if (name !== newName) {
        fs.copy(name, newName, (err) => {
          if (err) {
            console.log('error copying files')
            return callBack(err)
          }
        })
      }
    })
    callBack && callBack(null, files)
  })
}
