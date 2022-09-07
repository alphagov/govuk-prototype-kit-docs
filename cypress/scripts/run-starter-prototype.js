const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const { promisify } = require('util')
const child_process = require('child_process') // eslint-disable-line camelcase

const execPromise = promisify(child_process.exec)

const defaultKitPath = path.join(os.tmpdir(), 'cypress/temp/test-project')

const testDir = path.resolve(process.env.KIT_TEST_DIR || defaultKitPath)

const kitModule = 'govuk-prototype-kit@0.0.1-alpha.3'

const npmInstall = (module) => execPromise(`cd ${testDir} && npm install ${module}`, { inherit: true })

const npx = (command) => execPromise(`npx ${kitModule} ${command}`, { cwd: testDir, env: { ...process.env, env: 'test' }, stdio: 'inherit' })

;(async () => {
  await fs.remove(testDir)
  await fs.ensureDir(testDir)
  await npx('install')
  await npmInstall('@govuk-prototype-kit/step-by-step@2')
  return npx('start')
})()
