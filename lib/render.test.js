/* eslint-env jest */
const fs = require('fs')

const render = require('./render')

describe('markdownEngine', () => {
  let md

  beforeEach(() => {
    jest.spyOn(fs, 'readFile').mockImplementation(
      (filePath, callback) => { callback(null, md) }
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('uses front matter to generate heading', () => {
    md = '---\n' +
      'heading: Share usage data\n' +
      '---\n' +
      'This is some content.'

    const mockRender = jest.fn()
    render.markdownEngine({ render: mockRender })(undefined, {}, jest.fn())

    const received = mockRender.mock.lastCall[1]

    expect(received).toHaveProperty('heading')
    expect(received.heading).toEqual('Share usage data')
  })

  it('uses front matter to generate title', () => {
    md = '---\n' +
      'heading: Share usage data\n' +
      'title: Share usage data\n' +
      '---\n' +
      'This is some content.'

    const mockRender = jest.fn()
    render.markdownEngine({ render: mockRender })(undefined, {}, jest.fn())

    const received = mockRender.mock.lastCall[1]

    expect(received).toHaveProperty('title')
    expect(received.title).toEqual('Share usage data')
  })

  it('throws an error if front matter title is not present', () => {
    md = '# This is a plain heading'

    const expectedError = new Error('docs/documentation/this-is-a-plain-heading.md does not have a heading in its frontmatter')

    expect(() => {
      render.markdownEngine({ render: jest.fn() })(
        'docs/documentation/this-is-a-plain-heading.md', {}, jest.fn()
      )
    }).toThrow(expectedError)
  })

  it('allows keyboard focus for code blocks', () => {
    md = '---\n' +
      'heading: test\n' +
      '---\n' +
      '```\n' +
      'This is a code block\n' +
      '```\n'

    const mockRender = jest.fn()
    render.markdownEngine({ render: mockRender })(undefined, {}, jest.fn())

    const { document } = mockRender.mock.lastCall[1]

    expect(document).toContain('<pre tabindex="0">')
  })
})
