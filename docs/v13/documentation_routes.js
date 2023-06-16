// NPM dependencies
const express = require('express')
const router = express.Router()

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

// Examples - examples post here
router.post('/tutorials-and-guides', function (req, res) {
  res.redirect('tutorials-and-guides')
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

router.get('/install/introduction', function (req, res) {
  res.redirect('/docs/install/getting-started')
})

router.get('/install/developer-install-instructions', function (req, res) {
  res.redirect('/docs/install/getting-started-advanced')
})

router.get('/tutorials-and-examples', function (req, res) {
  res.redirect('/docs/tutorials-and-guides')
})

router.get('/install/node', function (req, res) {
  res.redirect('/docs/install/getting-started')
})

router.get('/install/requirements', function (req, res) {
  res.redirect('/docs/install/getting-started')
})

router.get('/about', function (req, res) {
  res.redirect('/docs')
})

module.exports = router
