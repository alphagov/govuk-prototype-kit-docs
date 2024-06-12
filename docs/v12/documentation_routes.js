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

// Redirect to download the current release zip from GitHub,
// based on the version number from govuk-prototype-kit-version.json
router.get('/download', function (req, res) {
  res.redirect(
    `https://github.com/alphagov/govuk-prototype-kit/releases/download/v${kitVersion}/govuk-prototype-kit-${kitVersion}.zip`
  )
})

router.get('/update.sh', function (req, res) {
  res.redirect(
    `https://raw.githubusercontent.com/alphagov/govuk-prototype-kit/v${kitVersion}/update.sh`
  )
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

router.get('/make-first-prototype/make-first-prototype', function (req, res) {
  res.redirect('/docs/make-first-prototype/start')
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

module.exports = router
