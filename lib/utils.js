// Core dependencies
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// NPM dependencies
const { get: getKeypath } = require('lodash')
const portScanner = require('portscanner')
const inquirer = require('inquirer')

// Are we running on Glitch.com?
const onGlitch = function () {
  // there isn't an official way to check, but this was recommended
  // https://support.glitch.com/t/detect-if-app-is-running-on-glitch/3120
  return Boolean(process.env.PROJECT_REMIX_CHAIN)
}

exports.onGlitch = onGlitch

// Get a normalised form of NODE_ENV
//
// Returns a lower-case string representing the environment the node.js app
// is running in. Normally this will be one of `production`, `development`,
// or `test`, although it can be any lower-case string. In most
// circumstances the value is derived from the environment variable
// NODE_ENV, defaulting to `development` if that is not set.
exports.getNodeEnv = function () {
  const glitchEnv = onGlitch() ? 'production' : false // Glitch doesn't set NODE_ENV, but we want to treat it as production
  const env = (process.env.NODE_ENV || glitchEnv || 'development').toLowerCase()
  return env
}

// Require core filters and then add the methods to Nunjucks environment
exports.addNunjucksFilters = function (env) {
  var coreFilters = require('./core_filters.js')(env)
  Object.keys(coreFilters).forEach(function (filterName) {
    env.addFilter(filterName, coreFilters[filterName])
  })
}

// Add Nunjucks function called 'checked' to populate radios and checkboxes
exports.addCheckedFunction = function (env) {
  env.addGlobal('checked', function (name, value) {
    // Check data exists
    if (this.ctx.data === undefined) {
      return ''
    }

    // Use string keys or object notation to support:
    // checked("field-name")
    // checked("['field-name']")
    // checked("['parent']['field-name']")
    name = !name.match(/[.[]/g) ? `['${name}']` : name
    var storedValue = getKeypath(this.ctx.data, name)

    // Check the requested data exists
    if (storedValue === undefined) {
      return ''
    }

    var checked = ''

    // If data is an array, check it exists in the array
    if (Array.isArray(storedValue)) {
      if (storedValue.indexOf(value) !== -1) {
        checked = 'checked'
      }
    } else {
      // The data is just a simple value, check it matches
      if (storedValue === value) {
        checked = 'checked'
      }
    }
    return checked
  })
}

// Find an available port to run the server on
exports.findAvailablePort = function (app, callback) {
  var port = null

  // When the server starts, we store the port in .port.tmp so it tries to restart
  // on the same port
  try {
    port = Number(fs.readFileSync(path.join(__dirname, '/../.port.tmp')))
  } catch (e) {
    port = process.env.PORT ? Number(process.env.PORT) : 3000
  }

  console.log('')

  // Check port is free, else offer to change
  portScanner.findAPortNotInUse(port, port + 50, '127.0.0.1', function (error, availablePort) {
    if (error) { throw error }
    if (port === availablePort) {
      // Port is free, return it via the callback
      callback(port)
    } else {
      // Port in use - offer to change to available port
      console.error('ERROR: Port ' + port + ' in use - you may have another prototype running.\n')

      // Ask user if they want to change port
      inquirer.prompt([{
        name: 'changePort',
        message: 'Change to an available port?',
        type: 'confirm'
      }]).then(answers => {
        if (answers.changePort) {
          // User answers yes
          port = availablePort
          fs.writeFileSync(path.join(__dirname, '/../.port.tmp'), port.toString())
          console.log('Changed to port ' + port)

          callback(port)
        } else {
          // User answers no - exit
          console.log('\nYou can set a new default port in server.js, or by running the server with PORT=XXXX')
          console.log("\nExit by pressing 'ctrl + c'")
          process.exit(0)
        }
      })
    }
  })
}

// Redirect HTTP requests to HTTPS
exports.forceHttps = function (req, res, next) {
  if (req.protocol !== 'https') {
    console.log('Redirecting request to https')
    // 302 temporary - this is a feature that can be disabled
    return res.redirect(302, 'https://' + req.get('Host') + req.url)
  }

  // Mark proxy as secure (allows secure cookies)
  req.connection.proxySecure = true
  next()
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
exports.sleep = sleep

async function waitUntilFileExists (filename, timeout) {
  await sleep(500)
  const fileExists = fs.existsSync(filename)
  if (!fileExists) {
    if (timeout > 0) {
      return waitUntilFileExists(filename, timeout - 500)
    } else {
      throw new Error(`File ${filename} does not exist`)
    }
  }
}

exports.waitUntilFileExists = waitUntilFileExists

// Store data from POST body or GET query in session
var storeData = function (input, data) {
  for (var i in input) {
    // any input where the name starts with _ is ignored
    if (i.indexOf('_') === 0) {
      continue
    }

    var val = input[i]

    // Delete values when users unselect checkboxes
    if (val === '_unchecked' || val === ['_unchecked']) {
      delete data[i]
      continue
    }

    // Remove _unchecked from arrays of checkboxes
    if (Array.isArray(val)) {
      val = val.filter((item) => item !== '_unchecked')
    } else if (typeof val === 'object') {
      // Store nested objects that aren't arrays
      if (typeof data[i] !== 'object') {
        data[i] = {}
      }

      // Add nested values
      storeData(val, data[i])
      continue
    }

    data[i] = val
  }
}

// Middleware - store any data sent in session, and pass it to all views
exports.autoStoreData = function (req, res, next) {
  if (!req.session.data) {
    req.session.data = {}
  }

  storeData(req.body, req.session.data)
  storeData(req.query, req.session.data)

  // Send session data to all views

  res.locals.data = {}

  for (var j in req.session.data) {
    res.locals.data[j] = req.session.data[j]
  }

  next()
}

exports.encryptPassword = function (password) {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  return hash.digest('hex')
}
