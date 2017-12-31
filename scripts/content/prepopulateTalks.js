const path = require('path')
const globby = require('markdown-magic').globby
const fs = require('fs-extra')
const matter = require('gray-matter')

const projectRoot = path.join(__dirname, '..', '..')
const content = path.join(projectRoot, 'content')
const talksContentPath = path.join(content, 'talks')

module.exports = function prepopulateTalks() {
  console.log('prepopulate Talk content')
  globby([`${talksContentPath}/*.md`]).then((files) => {
    const markdownContent = []
    files.forEach((f) => {
      const fileContent = fs.readFileSync(f, 'utf-8')
      const item = matter(fileContent).data
      const base = `${path.basename(path.dirname(f))}/${path.basename(f, '.md')}`
      const slug = base.replace(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-/g, '')
      const data = {
        title: item.title,
        date: item.date,
        event: item.event,
        url: `https://davidwells.io/${slug}`
      }
      if (item.date) {
        markdownContent.push(data)
      }
    })

    // show only past talks
    const pastTalks = markdownContent.filter((talk) => {
      if (!talk.date) {
        return false
      }
      const now = new Date().getTime()
      const talkTime = new Date(talk.date).getTime()
      return talkTime < now
    })
    // sort by date
    const lastTen = pastTalks.sort((a, b) => {
      const one = new Date(a.date)
      const two = new Date(b.date)
      return one > two ? -1 : one < two ? 1 : 0 // eslint-disable-line
    }).slice(0, 10)
    const prepopulatedPosts = JSON.stringify(lastTen, null, 2)
    fs.writeFileSync(
      path.join(projectRoot, 'src', 'pages', 'Talks', 'prepopulated.json'),
      prepopulatedPosts
    )
  })
}
