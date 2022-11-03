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
const utils = require('./lib/utils.js')
const extensions = require('./lib/extensions/extensions.js')
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
var appViews = extensions.getAppViews([
  path.join(projectDir, '/app/views/'),
  path.join(projectDir, '/lib/')
])

var nunjucksConfig = {
  autoescape: true,
  noCache: true,
  watch: false // We are now setting this to `false` (it's by default false anyway) as having it set to `true` for production was making the tests hang
}

if (env === 'development') {
  nunjucksConfig.watch = true
}

nunjucksConfig.express = app

var nunjucksAppEnv = nunjucks.configure(appViews, nunjucksConfig)

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksAppEnv)

// Set views engine
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

// Redirect root to /docs
console.log('Running Prototype Kit website')

app.get('/', function (req, res) {
  res.redirect('/docs/')
})

// Allow search engines to index the Prototype Kit promo site
app.get('/robots.txt', function (req, res) {
  res.type('text/plain')
  res.send('User-agent: *\nAllow: /')
})

function createDocumentationApp (docsDir) {
  // Set up documentation app
  const documentationApp = express()

  var documentationViews = [
    path.join(__dirname, '/node_modules/govuk-frontend/'),
    path.join(__dirname, '/node_modules/govuk-frontend/components'),
    path.join(__dirname, docsDir, 'views/'),
    path.join(__dirname, '/lib/')
  ]

  nunjucksConfig.express = documentationApp
  var nunjucksDocumentationEnv = nunjucks.configure(documentationViews, nunjucksConfig)

  // Nunjucks filters
  utils.addNunjucksFilters(nunjucksDocumentationEnv)

  // Set views engine
  documentationApp.set('view engine', 'html')

  // Automatically store all data users enter
  utils.addCheckedFunction(nunjucksDocumentationEnv)

  // Clone app locals to documentation app locals
  // Use Object.assign to ensure app.locals is cloned to prevent additions from
  // updating the original app.locals
  documentationApp.locals = Object.assign({}, app.locals)
  documentationApp.locals.serviceName = 'Prototype Kit'

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
    if (!utils.matchMdRoutes(docsMdDir, req, res)) {
      utils.matchRoutes(req, res, next)
    }
  })

  return documentationApp
}

// Create separate router for docs
app.use('/docs', createDocumentationApp('./docs/v12'))

// Strip .html and .htm if provided
app.get(/\.html?$/i, function (req, res) {
  var path = req.path
  var parts = path.split('.')
  parts.pop()
  path = parts.join('.')
  res.redirect(path)
})

// Auto render any view that exists

// App folder routes get priority
app.get(/^([^.]+)$/, function (req, res, next) {
  utils.matchRoutes(req, res, next)
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

// Display error
app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(err.status || 500)
  res.send(err.message)
})

console.log('\nGOV.UK Prototype Kit docs')

module.exports = app
