// parse serve script args
// example: ./scripts/serve -- --mode production -- --inspect=5858
//    frontend args:    --mode production
//    app args:         --inspect=5858
const args = process.argv.slice(2)
let sepIndex = args.indexOf('--')
let frontendArgs = args.slice(sepIndex + 1)
sepIndex = frontendArgs.indexOf('--')
let appArgs = frontendArgs.splice(sepIndex)
appArgs.shift()
// TODO: allow custom args for course sandbox
const sandboxArgs = []

module.exports = {
    application: appArgs,
    frontend: frontendArgs,
    'course_sandbox': sandboxArgs
}
