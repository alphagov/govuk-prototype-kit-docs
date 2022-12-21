// Core dependencies
const fs = require('fs')
const path = require('path')

// NPM dependencies
const express = require('express')
const router = express.Router()

// Local dependencies
const utils = require('../../lib/utils')

// version of Kit for docs
const kitVersion = require('./govuk-prototype-kit-version').version

router.all('*', function (req, res, next) {
  res.locals.releaseVersion = kitVersion
  next()
})

// Docs index
router.get('/', function (req, res) {
  const [originalPath, query] = req.originalUrl.split('?', 2)
  if (!originalPath.endsWith('/')) {
    const queryString = query ? `?${query}` : ''
    // redirect to /docs/ so we can use relative hrefs safely
    res.redirect(originalPath + '/' + queryString)
  } else {
    res.render('index')
  }
})

router.get('/install', function (req, res) {
  res.render('install')
})

// Pages in install folder are markdown
router.get('/install/:page', function (req, res) {
  // If the link already has .md on the end (for GitHub docs)
  // remove this when we render the page
  if (req.params.page.slice(-3).toLowerCase() === '.md') {
    req.params.page = req.params.page.slice(0, -3)
  }
  redirectMarkdown(req.params.page, res)
  var doc = fs.readFileSync(path.join(__dirname, '/documentation/install/', req.params.page + '.md'), 'utf8')
  const renderOptions = utils.getRenderOptions(doc)
  res.render('install_template', renderOptions)
})

// Examples - examples post here
router.post('/tutorials-and-examples', function (req, res) {
  res.redirect('tutorials-and-examples')
})

// Example routes

// Passing data into a page
router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { name: 'Foo' })
})

// Redirects

router.get('/examples/branching', function (req, res) {
  res.redirect('/docs/make-first-prototype/branching')
})

router.get('/making-pages', function (req, res) {
  res.redirect('/docs/make-first-prototype/create-pages')
})

router.get('/make-first-prototype/add-questions', function (req, res) {
  res.redirect('/docs/make-first-prototype/use-components')
})

router.get('/templates/check-your-answers', function (req, res) {
  res.redirect('/docs/templates/check-answers')
})

router.get('/publishing-on-heroku', function (req, res) {
  res.redirect('/docs/publishing')
})

router.get('/publishing-on-heroku-terminal', function (req, res) {
  res.redirect('/docs/publishing')
})

router.get('/privacy-policy', function (req, res) {
  res.redirect('/docs/privacy-notice')
})

router.get('/examples/pass-data', function (req, res) {
  res.redirect('/pass-data')
})

module.exports = router

// Strip off markdown extensions if present and redirect
var redirectMarkdown = function (requestedPage, res) {
  if (requestedPage.slice(-3).toLowerCase() === '.md') {
    res.redirect(requestedPage.slice(0, -3))
  }
  if (requestedPage.slice(-9).toLowerCase() === '.markdown') {
    res.redirect(requestedPage.slice(0, -9))
  }
}
