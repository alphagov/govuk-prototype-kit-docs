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

exports.findViewName = function (mdDir, name) {
  for (const ext of ['.md.njk', '.md']) {
    const tryPath = path.join(mdDir, name + ext)
    if (fs.existsSync(tryPath)) {
      return tryPath
    }
  }
  return name
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

      try {
        const html = marked.parse(parsedFile.content)
        nunjucksEnv.render(
          layout,
          { ...options, ...parsedFile.data, document: html },
          callback
        )
      } catch (err) {
        callback(err)
      }
    })
  }
}

// Use with app.engine('.njk', nunjucksAndMarkdownEngine(nunjucksEnv))
// Express can't handle engine with multiple file extensions
exports.nunjucksAndMarkdownEngine = function (nunjucksEnv) {
  return (filePath, options, callback) => {
    fs.readFile(filePath, (err, fileContents) => {
      if (err) return callback(err)
      const parsedFile = matter(fileContents)
      if (parsedFile.data.heading === undefined) {
        throw new Error(`${filePath} does not have a heading in its frontmatter`)
      }
      const layout = parsedFile.data.layout || 'documentation_template.html'
      const nunjucksOptions = { ...options, ...parsedFile.data }

      nunjucksEnv.renderString(
        parsedFile.content,
        nunjucksOptions,
        (err, contentsAfterNunjucks) => {
          if (err) return callback(err)

          try {
            const contentsAfterMarkdown = marked.parse(contentsAfterNunjucks)
            nunjucksEnv.render(
              layout,
              { ...nunjucksOptions, document: contentsAfterMarkdown },
              (err, contentsAfterLayout) => {
                callback(err, contentsAfterLayout)
              }
            )
          } catch (err) {
            callback(err)
          }
        }
      )
    })
  }
}
