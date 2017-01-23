const dir = require('node-dir')
const fs = require('fs-extra')
// remove YYYY-MM-DD from filename
const replacePattern = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-/g

module.exports = function removeDateFromFileName(directoryPath, callBack) {
  dir.files(directoryPath, (err, files) => {
    if (err) {
      throw err
    }
    files.forEach((name) => {
      const newName = name.replace(replacePattern, '')
      if (name !== newName) {
        fs.copy(name, newName, (err) => {
          if (err) {
            console.log('error copying files')
            return callBack(err)
          }
          // remove old post
          fs.removeSync(name)
        })
      }
    })
    callBack && callBack(null)
  })
}
