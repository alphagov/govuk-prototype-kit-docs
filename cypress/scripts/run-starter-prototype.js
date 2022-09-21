const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const child_process = require('child_process') // eslint-disable-line camelcase

const defaultKitPath = path.join(os.tmpdir(), 'cypress/temp/test-project')

const testDir = path.resolve(process.env.KIT_TEST_DIR || defaultKitPath)

const kitModule = 'govuk-prototype-kit@0.0.1-alpha.3'

const npmInstall = (module) => child_process.execSync(`cd ${testDir} && npm install ${module}`, { inherit: true })

const npx = (command) => child_process.execSync(`npx ${kitModule} ${command}`, { cwd: testDir, env: { ...process.env, env: 'test' }, stdio: 'inherit' })

fs.removeSync(testDir)
fs.ensureDirSync(testDir)
npx('install')
npmInstall('@govuk-prototype-kit/step-by-step@2')
npx('start')
