const fs = require('fs')
const path = require('path')

const matter = require('gray-matter')
const { marked } = require('marked')

// Tweak the Markdown renderer
const defaultMarkedRenderer = marked.defaults.renderer || new marked.Renderer()

marked.use({
  renderer: {
    code (code, infostring, escaped) {
      let rawHtml = defaultMarkedRenderer.code(code, infostring, escaped)
      // Add a tabindex to the <pre> element, to allow keyboard focus / scrolling
      rawHtml = rawHtml.replace('<pre>', '<pre tabindex="0">')
      return rawHtml
    }
  }
})

exports.isMdView = function (mdDir, name) {
  const reqPath = path.join(mdDir, name + '.md')
  return fs.existsSync(reqPath)
}

exports.markdownEngine = (nunjucksEnv) => {
  return (filePath, options, callback) => {
    fs.readFile(filePath, (err, fileContents) => {
      if (err) return callback(err)
      const parsedFile = matter(fileContents)
      if (parsedFile.data.heading === undefined) {
        throw new Error(`${filePath} does not have a heading in its frontmatter`)
      }
      const layout = parsedFile.data.layout || 'documentation_template.html'
      marked(parsedFile.content, (err, html) => {
        if (err) return callback(err)
        nunjucksEnv.render(
          layout,
          { ...options, ...parsedFile.data, document: html },
          callback
        )
      })
    })
  }
}
