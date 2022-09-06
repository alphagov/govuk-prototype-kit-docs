/* eslint-disable-next-line no-unused-vars */
const router = require('govuk-prototype-kit').requests.setupRouter()

router.get('/cypress-test', (req, res) => {
  const heading = 'CYPRESS TEST PAGE'
  res.send(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <title>${heading}</title>
        </head>
        <body>
            <h1>${heading}</h1>
        </body>
    </html>
`)
})
