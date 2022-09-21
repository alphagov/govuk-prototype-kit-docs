const os = require('os')
const path = require('path')
const fs = require('fs-extra')
const child_process = require('child_process') // eslint-disable-line camelcase

const defaultKitPath = path.join(os.tmpdir(), 'cypress/temp/test-project')

const testDir = path.resolve(process.env.KIT_TEST_DIR || defaultKitPath)

const kitVersion = '0.0.1-alpha.3'
const kitModule = `govuk-prototype-kit@${kitVersion}`

const npmInstall = (module) => child_process.execSync(`cd ${testDir} && npm install ${module}`, { inherit: true })

const npx = (command) => child_process.execSync(`npx ${kitModule} ${command}`, { cwd: testDir, env: { ...process.env, env: 'test' }, stdio: 'inherit' })

fs.removeSync(testDir)
fs.ensureDirSync(testDir)
fs.writeJsonSync(path.join(testDir, 'usage-data-config.json'), { collectUsageData: false })
npx(`install ${kitVersion}`)
npmInstall('@govuk-prototype-kit/step-by-step@2')
npx('start')
