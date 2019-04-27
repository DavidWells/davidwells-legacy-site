const path = require('path')
const globby = require('markdown-magic').globby
const fs = require('fs-extra')
const matter = require('gray-matter')

const projectRoot = path.join(__dirname, '..', '..')
const content = path.join(projectRoot, 'content')
const blogContentPath = path.join(content, 'blog')
const snippetsContentPath = path.join(content, 'snippets')
const externalContentPath = path.join(content, 'blog', 'external-posts.json')

const numberOfPosts = 20

module.exports = function prepopulateBlog() {
  console.log('prepopulate blog content')
  const externalContent = fs.readFileSync(externalContentPath, 'utf-8')
  const externalPosts = JSON.parse(externalContent)
  globby([`${blogContentPath}/*.md`, `${snippetsContentPath}/*.md`]).then((files) => {
    const markdownContent = []
    files.forEach((f) => {
      const fileContent = fs.readFileSync(f, 'utf-8')
      const item = matter(fileContent).data
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
      const one = new Date(a.date)
      const two = new Date(b.date)
      return one > two ? -1 : one < two ? 1 : 0 // eslint-disable-line
    }).slice(0, numberOfPosts)
    const prepopulatedPosts = JSON.stringify(lastTen, null, 2)
    fs.writeFileSync(
      path.join(projectRoot, 'src', 'pages', 'Blog', 'prepopulate.json'),
      prepopulatedPosts
    )
  })
}
