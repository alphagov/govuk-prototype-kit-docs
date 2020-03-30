/* eslint-env jest */

const metalsmith = require('metalsmith')
const lunr = require('lunr')
const plugin = require('./index.js')
const extractPageHeadings = require('../extract-page-headings/index.js')
const inplace = require('metalsmith-in-place')

describe('metalsmith-lunr-index plugin', () => {
  let searchIndex
  let documentStore

  beforeAll((done) => {
    metalsmith('lib/metalsmith-lunr-index/fixtures')
      .use(extractPageHeadings())
      .use(inplace({
        pattern: '**/*.njk'
      }))
      .use(plugin())
      .build((err, files) => {
        if (err) {
          return done(err)
        }
        const searchIndexContents = files['search-index.json']['contents']
        const { index, store } = JSON.parse(searchIndexContents)
        documentStore = store

        searchIndex = lunr.Index.load(index)

        done()
      })
  })

  describe('the generated document store', () => {
    it('only contains HTML files', () => {
      const paths = Object.keys(documentStore)

      expect(paths).not.toContain('image.jpg')
    })

    it('does not contain files that are not in any section', () => {
      const paths = Object.keys(documentStore)

      expect(paths).not.toContain('example.html')
    })

    it('does not contain files that are not in included sections', () => {
      const paths = Object.keys(documentStore)

      expect(paths).not.toContain('about-larry.html')
    })

    it('contains the page and heading level 2 entry', () => {
      const withPageHeadingDocument = Object.values(documentStore).find(document => {
        return document.title === 'Heading level 2'
      })

      expect(withPageHeadingDocument.path).toEqual('with-page-headings.html/#heading-level-2')
    })
  })

  describe('the generated index', () => {
    it('stores the page heading of the page in the metadata', () => {
      const searchResults = searchIndex.search('heading')
      const resultRef = searchResults[0].ref

      expect(documentStore[resultRef].title).toEqual('Heading level 2')
    })
  })
})
