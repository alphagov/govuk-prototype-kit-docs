// Import happens in a browser so absolute path gives a consistent path
// eslint-disable-next-line import/no-absolute-path
import { initAll } from '/extension-assets/govuk-frontend/dist/govuk/govuk-frontend.min.js'

document.addEventListener('DOMContentLoaded', () => {
  initAll()
})
