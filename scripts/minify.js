const minify = require("babel-minify")

const dir = require('node-dir')
const fs = require('fs')
const path = require('path')
const dist = path.join(__dirname, '..', 'dist')
// Using Google Closure Compiler

dir.readFiles(dist, {
  match: /.js$/,
  //exclude: /^\./
}, (err, content, filename, next) => {
  if (err) throw err
  next()
},
  (err, files) => {
    console.log('compress', files[0])
    const contents = fs.readFileSync(files[0], 'utf-8')
    console.log('got contents')
    console.log('compressing js')
    const {code, map} = minify(contents, {
      mangle: {
        keepClassName: true
      }
    })

    fs.writeFileSync(files[0], code)
    console.log('finished writing new code')
  }
)
