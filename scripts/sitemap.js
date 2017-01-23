/**
 * Generates sitemap
 */
const fs = require('fs-extra')
const dir = require('node-dir')
const sm = require('sitemap')
const path = require('path')
const packageInfo = require('../package.json')
const distPath = path.join(__dirname, '..', 'dist')
const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap.xml')

function getAllUrls(filePath, callBack) {
  dir.readFiles(filePath, {
    match: /.html$/,
    //exclude: /^\./
  }, (err, content, filename, next) => {
    if (err) throw err
    next()
  },
    (err, files) => {
      if (err) {
        callBack(err)
      }
      const urls = files.map((file, i) => {
        return {
          url: path.dirname(file.split('dist')[1]),
          changefreq: 'weekly',
          priority: 0.8,
          lastmodrealtime: true,
          lastmodfile: file
        }
      })
      callBack && callBack(null, urls)
    }
  )
}

getAllUrls(distPath, (err, urls) => {
  if (err) {
    console.log(err)
    return false
  }
  const options = {
    hostname: `${packageInfo.homepage}/`,
    cacheTime: 600000,  // 600 sec cache period
    urls
  }
  // Creates a sitemap object given the input configuration with URLs
  const sitemap = sm.createSitemap(options)
  // Generates XML with a callback function
  sitemap.toXML((err, xml) => {
    if (!err) {
      // console.log(xml)
    }
  })
  // Gives you a string containing the XML data
  const xml = sitemap.toString()
  // write sitemap to file
  fs.writeFileSync(sitemapPath, xml, 'utf-8', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('Sitemap Built!')
  })
})
