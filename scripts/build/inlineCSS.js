const path = require('path')
const fs = require('fs-extra')
const critical = require('critical')
const dir = require('node-dir')
const distPath = path.join(__dirname, '..', '..', 'dist')

function inlineCSS(filePath, callBack) {
  console.time('inlineCSS')
  dir.readFiles(filePath, {
    match: /.html$/,
    //exclude: /^\./
  }, (err, content, filename, next) => {
    if (err) throw err
    console.log('filename', filename)
    const directoryPath = path.dirname(filename)
    const newPath = path.join(directoryPath, 'index.html')
    // const newPath = path.join(directoryPath, 'index-critical.html')
    console.log('newPath', newPath)
    // fs.writeFileSync(filename, finalNewContent)
    critical.generate({
      inline: true,
      base: distPath,
      src: filename,
      dest: newPath,
      minify: true,
      width: 1300,
      height: 900
    }, (err, output) => {

    })
    next()
  },
    (err, files) => {
      if (err) {
        if (callBack) {
          callBack(err)
        }
      }
      if (callBack) {
        callBack(null, files)
      }
      console.log('files', files)
      console.timeEnd('inlineCSS')
    }
  )
}
inlineCSS(distPath)
