const path = require('path')
const fs = require('fs-extra')
const dir = require('node-dir')
const matter = require('gray-matter')
const jsonToYaml = require('yamljs')
const config = require('./config')
const blogRepoPath = config.blogRepoPath
const grabDateRegex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/g

module.exports = function updateFileContents(filePath, callBack) {
  dir.readFiles(filePath, {
    match: /.md$/,
    //exclude: /^\./
  }, (err, content, filename, next) => {
    if (err) throw err

    // parse yaml frontmatter for title
    const item = matter(content).data


    item.gitLink = `/${path.parse(filename).base}`

    if (item.date) {
      item.date = formatDate(item.date)
    } else {
      // if no date yaml defined, use filename
      const date = filename.match(grabDateRegex)
      if (date) {
        item.date = date[0]
      }
    }

    const yaml = jsonToYaml.stringify(item)

    // regex patterns to match frontmatter
    // ---(\s*?.*?)*?---
    // ^(---)(\s*?.*?)*?(---)
    // ^---(\s*?.*?)*?---
    const newYamlContent = `---
${yaml}---`

    const finalNewContent = content.replace(/^---(\s*?.*?)*?---/, newYamlContent)

    // fs.writeFileSync(filename, finalNewContent)

    next()
  },
    (err, _files) => {
      if (err) {
        callBack(err)
      }
      callBack && callBack(null)
    }
  )
}

function formatDate(date) {
  let d = new Date(date),
    month = `${d.getMonth() + 1}`,
    day = `${d.getDate()}`,
    year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}
