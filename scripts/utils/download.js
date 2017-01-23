const download = require('download')

// if datatime > x redownload
module.exports = function downloadDocs(downloadUrl, outputPath, callBack) {
  const downloadOptions = {
    timeout: 30000,
    extract: true,
    strip: 1,
    mode: '755'
  }
  download(downloadUrl, outputPath, downloadOptions).then(() => {
    console.log(`${downloadUrl} downloaded, placed in ${outputPath}`)
    callBack && callBack(null)
  }).catch((error) => {
    if (error) {
      console.log(`download fail! ${downloadUrl}`)
      console.log(error)
      callBack(error)
    }
  })
}
