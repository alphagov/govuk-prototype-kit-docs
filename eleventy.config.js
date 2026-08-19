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
    './node_modules/govuk-frontend/dist/govuk/assets': 'assets'
  })

  eleventyConfig.addPassthroughCopy('src/images')

  const nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader([
      'docs/v13/views',
      'views/partials',
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
      layouts: '../docs/v13/views'
    }
  }
}
