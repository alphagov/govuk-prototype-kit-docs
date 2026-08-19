import { mkdir, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { glob } from 'glob'
import * as sass from 'sass'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

/**
 * @param {import("@11ty/eleventy/UserConfig")} eleventyConfig
 * @param {CompilationOptions} options
 */
export function setupStylesheetCompilation (eleventyConfig, { to }) {
  const assetsDir = join(eleventyConfig.dir.output, to)

  const stylesheetsGlob = `${eleventyConfig.dir.input}/../assets/**/*.scss`

  eleventyConfig.addWatchTarget(stylesheetsGlob)
  eleventyConfig.on('eleventy.before', async () => {
    // Get all Sass files in the source assets directory, excluding partials
    const files = await glob(stylesheetsGlob, {
      ignore: '**/_*'
    })

    compileStylesheets(files, assetsDir)
  })
}

async function compileStylesheets (files, outputDir) {
  // Loop through files
  for (const file of files) {
    // Get the filename and replace .scss with .css
    const sourceFileName = basename(file)
    const filename = sourceFileName.replace('.scss', '.css')

    // Compile Sass to CSS
    const css = await compileSassFile(file)

    // Create the output assets directory if it doesn't already exist
    await mkdir(`${outputDir}`, {
      recursive: true
    })

    // Write the CSS file
    await writeFile(`${outputDir}/${filename}`, css)
  }
}

async function compileSassFile (file) {
  const sassCompilationResult = sass.compile(file, {
    loadPaths: ['./node_modules/govuk-frontend/dist'],
    sourceMap: false,
    outputStyle: 'compressed',
    silenceDeprecations: ['import'],
    quietDeps: true // silence warnings from govuk-frontend
  })

  const postcssCompilationResult = await postcss([
    autoprefixer({
      // Use stylesheets Browserslist config
      env: 'stylesheets'
    }),
    cssnano
  ]).process(sassCompilationResult.css.toString(), { from: undefined })

  return postcssCompilationResult.css
}

/**
 * @typedef CompilationOptions
 * @property {string} to - Into the output directory to which assets should be compiled
 */
