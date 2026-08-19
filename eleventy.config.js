import Nunjucks from 'nunjucks'

import { setupStylesheetCompilation } from './eleventy/stylesheets.js'

/**
 *  @param {import("@11ty/eleventy/UserConfig")} eleventyConfig
 */
export default function (eleventyConfig) {
  // Watch and compile Sass files on change
  eleventyConfig.addPlugin(setupStylesheetCompilation, { to: 'assets' })

  const nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader([
      'docs/v13/views',
      'views/partials',
      'node_modules/govuk-frontend/dist'
    ])
  )

  eleventyConfig.setLibrary('njk', nunjucksEnvironment)

  eleventyConfig.addGlobalData('layout', 'layout.html')

  return {
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'docs/v13/documentation',
      layouts: '../views'
    }
  }
}
