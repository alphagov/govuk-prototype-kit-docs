// Core dependencies
const path = require('path')
const url = require('url')

// NPM dependencies
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

// Run before other code to make sure variables from .env are available
dotenv.config()

// Local dependencies
const extensions = require('./lib/extensions/extensions')
const utils = require('./lib/utils')
const render = require('./lib/render')
const { projectDir } = require('./lib/path-utils')

const app = express()

// Set up configuration variables
var env = utils.getNodeEnv()
const useHttps = process.env.USE_HTTPS
  ? process.env.USE_HTTPS.toLowerCase() === 'true'
  : true

// Force HTTPS on production. Do this before using basicAuth to avoid
// asking for username/password twice (for `http`, then `https`).
var isSecure = (env === 'production' && useHttps)
if (isSecure) {
  app.use(utils.forceHttps)
  app.set('trust proxy', 1) // needed for secure cookies on heroku
}

// Add variables that are available in all views
app.locals.asset_path = '/public/'
// extensionConfig sets up variables used to add the scripts and stylesheets to each page.
app.locals.extensionConfig = extensions.getAppConfig()

// use cookie middleware for reading authentication cookie
app.use(cookieParser())

const sessionName = 'govuk-prototype-kit-docs'
const sessionHours = 20
const sessionMaxAge = 1000 * 60 * 60 * sessionHours
const sessionOptions = {
  cookie: {
    maxAge: sessionMaxAge,
    secure: isSecure
  },
  name: sessionName,
  saveUninitialized: false,
  secret: sessionName
}

// Save session data in memory
app.use(session({
  ...sessionOptions,
  store: new MemoryStore({ checkPeriod: sessionMaxAge }),
  resave: false
}))

// Middleware
app.use(require('./lib/middleware/extensions/extensions.js'))

// Set up App
app.set('views', extensions.getAppViews([
  path.join(projectDir, '/app/views/'),
  path.join(projectDir, '/lib/')
]))

var nunjucksConfig = {
  autoescape: true,
  noCache: true,
  watch: false // We are now setting this to `false` (it's by default false anyway) as having it set to `true` for production was making the tests hang
}

if (env === 'development') {
  nunjucksConfig.watch = true
}

var nunjucksAppEnv = nunjucks.configure(app.get('views'), nunjucksConfig)

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

// Set view engines
app.engine('.html', function (filePath, options, callback) {
  nunjucksAppEnv.render(filePath, options, callback)
})
app.set('view engine', 'html')

// Middleware to serve static assets
app.use('/public', express.static(path.join(projectDir, '/public')))

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Automatically store all data users enter
app.use(utils.autoStoreData)
utils.addCheckedFunction(nunjucksAppEnv)

console.log('Running Prototype Kit website')

if (env === 'production' && process.env.HEROKU_APP_NAME && process.env.HEROKU_CUSTOM_DOMAIN) {
  // Direct users away from govuk-prototype-kit.herokuapp.com and towards prototype-kit.service.gov.uk
  app.use(function (req, res, next) {
    if (req.get('Host') === process.env.HEROKU_APP_NAME + '.herokuapp.com') {
      res.redirect(301, req.protocol + '://' + process.env.HEROKU_CUSTOM_DOMAIN + req.originalUrl)
    } else {
      next()
    }
  })
}

// Redirect root to /docs
app.get('/', function (req, res) {
  res.redirect('/docs/')
})

// Allow search engines to index the Prototype Kit promo site
app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nAllow: /')
})

function createDocumentationApp (docsDir, { latest = false, locals = {} }) {
  // Set up documentation app
  const documentationApp = express()

  documentationApp.set('views', [
    path.join(__dirname, '/node_modules/govuk-frontend/dist'),
    path.join(__dirname, '/node_modules/govuk-frontend/dist/components'),
    path.join(__dirname, docsDir, 'views/'),
    path.join(__dirname, 'views/layouts/'),
    path.join(__dirname, 'views/partials/'),
    path.join(__dirname, '/lib/'),
    path.join(__dirname, 'docs', 'shared', 'views')
  ])

  var nunjucksDocumentationEnv = nunjucks.configure(documentationApp.get('views'), nunjucksConfig)

  nunjucksDocumentationEnv.addGlobal('govukRebrand', true)

  // Nunjucks filters
  utils.addNunjucksFilters(nunjucksDocumentationEnv)

  // Set view engines
  documentationApp.engine('.html', (filePath, options, callback) => {
    nunjucksDocumentationEnv.render(filePath, options, callback)
  })
  documentationApp.engine('.md', render.markdownEngine(nunjucksDocumentationEnv))
  documentationApp.engine('.njk', render.nunjucksAndMarkdownEngine(nunjucksDocumentationEnv))
  documentationApp.set('view engine', 'html')

  // Automatically store all data users enter
  utils.addCheckedFunction(nunjucksDocumentationEnv)

  // Clone app locals to documentation app locals
  // Use Object.assign to ensure app.locals is cloned to prevent additions from
  // updating the original app.locals
  documentationApp.locals = Object.assign({}, app.locals)
  documentationApp.locals.serviceName = 'Prototype Kit'
  documentationApp.locals.docsLatestVersion = !!latest
  Object.assign(documentationApp.locals, locals)

  // Make the request base URL available to templates so we can construct links properly
  documentationApp.all('*', (req, res, next) => {
    res.locals.baseUrl = req.baseUrl
    next()
  })

  // Docs under the /docs namespace
  const documentationRoutes = require(path.resolve(docsDir, 'documentation_routes.js'))
  documentationApp.use('/', documentationRoutes)

  // Documentation  routes
  const docsMdDir = path.resolve(docsDir, 'documentation')
  documentationApp.get(/^([^.]+)$/, function (req, res, next) {
    // get the URL path without the leading or trailing slashes
    let name = req.path
    if (name.startsWith('/')) { name = name.slice(1) }
    if (name.endsWith('/')) { name = name.slice(0, -1) }

    res.render(render.findViewName(docsMdDir, name), (err, str) => {
      if (err && err.view) {
        console.log(err.message)
        return next()
      } else if (err) {
        return next(err)
      } else {
        res.send(str)
      }
    })
  })

  return documentationApp
}

// Prevent search indexing of specific versions of docs
app.use('/v*/docs', function (req, res, next) {
  res.set('X-Robots-Tag', 'noindex')
  next()
})

// Add redirect from v12 /install to v13 /create-new-prototype
app.get('/docs/install', (req, res) => {
  res.redirect('/docs/create-new-prototype')
})

// Add redirect from v12 /routes to v13 /create-routes
app.get('/docs/routes', (req, res) => {
  res.redirect('/docs/create-routes')
})

// Add redirect from /templates url to v12 docs for now
// TODO: figure out what to do with templates
app.use('/docs/templates', (req, res, next) => {
  res.redirect('/v12/docs/templates' + req.path)
})

// Create separate routers for each version of docs
app.use('/v12/docs',
  createDocumentationApp(
    './docs/v12',
    { locals: { docsVersionName: 'versions 7, 8, 9, 10, 11 and 12' } }
  )
)
app.use(['/v13/docs', '/docs'],
  createDocumentationApp(
    './docs/v13',
    { latest: true, locals: { docsVersionName: 'version 13' } }
  )
)

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.') + '/'
  res.redirect(path)
})

// Strip .md if provided
app.get(/\.md$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.') + '/'
  res.redirect(path)
})

// Redirect all POSTs to GETs - this allows users to use POST for autoStoreData
app.post(/^\/([^.]+)$/, function (req, res) {
  res.redirect(url.format({
    pathname: '/' + req.params[0],
    query: req.query
  })
  )
})

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error(`Page not found: ${req.path}`)
  err.status = 404
  next(err)
})

console.log('\nGOV.UK Prototype Kit docs')

module.exports = app
