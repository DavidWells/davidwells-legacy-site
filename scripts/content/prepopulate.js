const globby = require('markdown-magic').globby
const fs = require('fs-extra')
const path = require('path')
const matter = require('gray-matter')

const projectRoot = path.join(__dirname, '..', '..')
const content = path.join(projectRoot, 'content')
const blogContentPath = path.join(content, 'blog')
const snippetsContentPath = path.join(content, 'snippets')
const externalContentPath = path.join(content, 'blog', 'external-posts.json')

module.exports = function prepopulateBlog() {
  console.log('prepopulateBlog start')
  const externalContent = fs.readFileSync(externalContentPath, 'utf-8')
  const externalPosts = JSON.parse(externalContent)
  globby([`${blogContentPath}/*.md`, `${snippetsContentPath}/*.md`]).then((files) => {
    let count = 0
    const markdownContent = []

    files.forEach((f) => {
      const content = fs.readFileSync(f, 'utf-8')
      const item = matter(content).data
      const base = `${path.basename(path.dirname(f))}/${path.basename(f, '.md')}`
      const slug = base.replace(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-/g, '')
      const data = {
        title: item.title,
        date: item.date,
        url: `https://davidwells.io/${slug}`
      }
      if (item.date) {
        markdownContent.push(data)
      }
    })

    const allPosts = markdownContent.concat(externalPosts)
    // sort by date
    const lastTen = allPosts.sort((a, b) => {
      a = new Date(a.date)
      b = new Date(b.date)
      return a > b ? -1 : a < b ? 1 : 0;
    }).slice(0, 10)
    const prepopulatedPosts =  JSON.stringify(lastTen, null, 2)
    fs.writeFileSync(
      path.join(projectRoot, 'src', 'pages', 'Blog', 'prepopulate.json'),
      prepopulatedPosts
    )
  })
}
