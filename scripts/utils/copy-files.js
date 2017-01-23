const fs = require('fs-extra')

module.exports = function copyFiles(oldPath, newPath, callBack) {
  fs.copy(oldPath, newPath, (error) => {
    if (error) {
      console.error(error)
      callBack && callBack(error)
    }
    callBack && callBack(null)
  })
}
