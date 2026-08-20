import Nunjucks from 'nunjucks'

import { setupStylesheetCompilation } from './eleventy/stylesheets.js'

/**
 *  @param {import("@11ty/eleventy/UserConfig")} eleventyConfig
 */
export default function (eleventyConfig) {
  // Watch and compile Sass files on change
  eleventyConfig.addPlugin(setupStylesheetCompilation, { to: 'assets' })

  // Copy font and image assets from govuk-frontend to the project
  eleventyConfig.addPassthroughCopy({
    './node_modules/govuk-frontend/dist/govuk/assets': 'assets',
    './node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js': 'assets'
  })

  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addFilter('findByUrl', function (collection, url) {
    const page = collection.find(item => item.url === url)

    if (!page) {
      throw new Error(`${url} does not correspond to any page`)
    }
    return page
  })

  const nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader([
      'views',
      'node_modules/govuk-frontend/dist'
    ])
  )

  nunjucksEnvironment.addGlobal('govukRebrand', true)

  eleventyConfig.setLibrary('njk', nunjucksEnvironment)

  eleventyConfig.addGlobalData('layout', 'documentation_template.html')

  return {
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      layouts: '../views'
    }
  }
}
