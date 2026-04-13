/* eslint-env jest */

const childProcess = require('child_process')
const path = require('path')

describe('the build pipeline', () => {
  describe('generate assets', () => {
    it('can be run from the command line', () => {
      const proc = childProcess.spawnSync(
        'node', ['lib/build/generate-assets'],
        { cwd: path.resolve(__dirname, '..', '..'), encoding: 'utf8' }
      )

      expect(proc).toEqual(expect.objectContaining(
        { status: 0 }
      ))
    })
  })
})
