
// NPM dependencies
const browserSync = require('browser-sync')

// Local dependencies
const server = require('./server.js')
const utils = require('./lib/utils.js')

// Set up configuration variables
var env = utils.getNodeEnv()

utils.findAvailablePort(server, function (port) {
  console.log('Listening on port ' + port + '   url: http://localhost:' + port)
  if (env === 'production') {
    server.listen(port)
  } else {
    server.listen(port - 50, function () {
      browserSync({
        proxy: 'localhost:' + (port - 50),
        port: port,
        ui: false,
        files: ['public/**/*.*', 'app/views/**/*.*'],
        ghostMode: false,
        open: false,
        notify: false,
        logLevel: 'error'
      })
    })
  }
})
