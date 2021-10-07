import common from 'govuk-frontend/common'
import CookieBanner from './components/cookie-banner.js'
import Example from './components/example.js'
import AppTabs from './components/tabs.js'
import OptionsTable from './components/options-table.js'

var nodeListForEach = common.nodeListForEach

// // Add cookie message
CookieBanner.addCookieMessage()

// Initialise example frames
var $examples = document.querySelectorAll('[data-module="app-example-frame"]')
nodeListForEach($examples, function ($example) {
  new Example($example).init()
})

// Initialise tabs
var $tabs = document.querySelectorAll('[data-module="app-tabs"]')
nodeListForEach($tabs, function ($tabs) {
  new AppTabs($tabs).init()
})

// Open options table when detected in URL hash
// Do this after initialising tabs
OptionsTable.init()
