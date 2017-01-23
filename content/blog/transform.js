const globby = require('markdown-magic').globby
const fs = require('fs-extra')
const path = require('path')
const matter = require('gray-matter')

globby('*.md').then((files)=> {
  let count = 0
  const news = []
  files.forEach((f) => {
    const content = fs.readFileSync(f, 'utf-8')
    const item = matter(content).data

    if (item.external_post_url) {
      const url = item.external_post_url['0']
      const data = {
        title: item.title,
        date: item.date,
        url: url
      }
      //console.log(data)
      news.push(data)
      count++
      console.log(path.join(__dirname, f))

      // fs.removeSync(path.join(__dirname, f))
    }
  })
  // console.log('external', news)
  const newc =  JSON.stringify(news, null, 2)
//  console.log(newc)
  // fs.writeFileSync(path.join(__dirname, 'yextern.json'), newc)
  console.log('count', count)
})
