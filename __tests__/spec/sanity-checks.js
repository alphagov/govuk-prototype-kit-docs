/* eslint-env jest */

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const glob = require('glob')
const matter = require('gray-matter')
const request = require('supertest')
const sass = require('sass')

const app = require('../../server.js')
const utils = require('../../lib/utils')
const { generateAssets } = require('../../lib/build/tasks')

function readFile (pathFromRoot) {
  return fs.readFileSync(path.join(__dirname, '../../' + pathFromRoot), 'utf8')
}

/**
 * Basic sanity checks on the dev server
 */
describe('The Prototype Kit', () => {
  beforeAll(() => {
    generateAssets()
  })

  it('should generate assets into the /public folder', () => {
    assert.doesNotThrow(async function () {
      await utils.waitUntilFileExists(path.resolve(__dirname, '../../public/docs/v12/javascripts/docs.js'), 5000)
      await utils.waitUntilFileExists(path.resolve(__dirname, '../../public/docs/v12/images/unbranded.ico'), 5000)
      await utils.waitUntilFileExists(path.resolve(__dirname, '../../public/docs/v12/stylesheets/docs.css'), 5000)
    })
  })

  describe('index page', () => {
    it('should redirect to /docs/ if no path is given', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(302)
      expect(response.get('location')).toMatch('/docs/')
    })

    it('should send a well formed response', async () => {
      const response = await request(app).get('/docs/')
      expect(response.statusCode).toBe(200)
    })

    it('should return html file', async () => {
      const response = await request(app).get('/docs/')
      expect(response.type).toBe('text/html')
    })
  })

  describe('docs index page', () => {
    it('should send a well formed response', async () => {
      const response = await request(app).get('/docs/')
      expect(response.statusCode).toBe(200)
    })

    it('should return html file', async () => {
      const response = await request(app).get('/docs/')
      expect(response.type).toBe('text/html')
    })

    it('should redirect to /docs/ if no end slash is given', async () => {
      const response = await request(app).get('/docs')
      expect(response.statusCode).toBe(302)
      expect(response.get('location')).toMatch('/docs/')
    })
  })

  describe('tutorials and examples page', () => {
    it('should send a well formed response', async () => {
      const response = await request(app).get('/docs/tutorials-and-guides/')
      expect(response.statusCode).toBe(200)
    })

    it('should return html file', async () => {
      const response = await request(app).get('/docs/tutorials-and-guides/')
      expect(response.type).toBe('text/html')
    })

    it('should redirect to /docs/tutorials-and-guides/ if .html given', async () => {
      const response = await request(app).get('/docs/tutorials-and-guides.html')
      expect(response.statusCode).toBe(302)
      expect(response.get('location')).toMatch('/docs/tutorials-and-guides/')
    })

    it.skip('should redirect to /docs/tutorials-and-guides/ if no end slash is given', async () => {
      const response = await request(app).get('/docs/tutorials-and-guides')
      expect(response.statusCode).toBe(302)
      expect(response.get('location')).toMatch('/docs/tutorials-and-guides/')
    })
  })

  describe('getting started page', () => {
    it('should send a well formed response', async () => {
      const response = await request(app).get('/docs/install/getting-started/')
      expect(response.statusCode).toBe(200)
    })

    it('should return html file', async () => {
      const response = await request(app).get('/docs/install/getting-started/')
      expect(response.type).toBe('text/html')
    })

    it('should redirect to /docs/install/getting-started/ if .md given', async () => {
      const response = await request(app).get('/docs/install/getting-started.md')
      expect(response.statusCode).toBe(302)
      expect(response.get('location')).toMatch('/docs/install/getting-started/')
    })

    it.skip('should redirect to /docs/install/getting-started/ if no end slash is given', async () => {
      const response = await request(app).get('/docs/install/getting-started')
      expect(response.statusCode).toBe(302)
      expect(response.get('location')).toMatch('/docs/install/getting-started/')
    })
  })

  describe('search engine indexing', () => {
    it('should allow indexing of pages under /docs/', async () => {
      const response = await request(app).get('/docs/')
      expect(response.get('X-Robots-Tag')).toBeUndefined()
    })

    it('should not allow indexing of pages for specific versions', async () => {
      let response
      response = await request(app).get('/v12/docs/')
      expect(response.get('X-Robots-Tag')).toMatch('noindex')

      response = await request(app).get('/v12/docs/make-first-prototype/create-pages')
      expect(response.get('X-Robots-Tag')).toMatch('noindex')
    })
  })

  describe('update script', () => {
    it('should redirect to GitHub', async () => {
      const response = await request(app).get('/v12/docs/update.sh')
      expect(response.statusCode).toBe(302)
      expect(response.get('location')).toMatch(new RegExp('https://raw.githubusercontent.com/alphagov/govuk-prototype-kit/v[0-9]+.[0-9]+.[0-9]+/update.sh'))
    })

    it('should send a well formed response', async () => {
      const response = await request(app).get('/v12/docs/update.sh').redirects(1)
      expect(response.statusCode).toBe(200)
    })

    it('should return plain text file', async () => {
      const response = await request(app).get('/v12/docs/update.sh').redirects(1)
      expect(response.type).toBe('text/plain')
    })
  })

  describe('extensions', () => {
    it('should allow known assets to be loaded from node_modules', (done) => {
      request(app)
        .get('/extension-assets/govuk-frontend/dist/govuk/govuk-frontend.min.js')
        .expect('Content-Type', /application\/javascript; charset=UTF-8/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            assert.strictEqual('' + res.text, readFile('node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js'))
            done()
          }
        })
    })

    it('should allow known assets to be loaded from node_modules', (done) => {
      request(app)
        .get('/govuk/assets/images/favicon.ico')
        .expect('Content-Type', /image\/x-icon/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            assert.strictEqual('' + res.body, readFile('node_modules/govuk-frontend/dist/govuk/assets/images/favicon.ico'))
            done()
          }
        })
    })

    it('should not expose everything', function (done) {
      const consoleErrorMock = jest.spyOn(global.console, 'error').mockImplementation()

      request(app)
        .get('/govuk/assets/common.js')
        .expect(404)
        .end(function (err, res) {
          consoleErrorMock.mockRestore()
          if (err) {
            done(err)
          } else {
            done()
          }
        })
    })
  })

  const sassFiles = glob.sync('docs/*/assets/sass/*.scss')

  describe('docs/*/assets/sass/', () => {
    it.each(sassFiles)('%s renders to CSS without errors', async (file) => {
      return new Promise((resolve, reject) => {
        sass.render({
          file,
          quietDeps: true
        }, (err, result) => {
          if (err) {
            reject(err)
          } else {
            expect(result.css.length).toBeGreaterThan(1000)
            resolve()
          }
        })
      })
    })
  })

  describe('Documentation markdown page titles', () => {
    const markdownFiles = glob.sync('docs/*/documentation/**/*.md')
    it.each(markdownFiles)('%s has a title', (filepath) => {
      const file = readFile(filepath)
      const parsedFile = matter(file)
      expect(parsedFile.data.heading).toBeTruthy()
    })
  })
})
