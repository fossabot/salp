// serves Vue.js frontends using vue-cli-service
const proc = require('./proc')

// handle invocation in child_process
if (process.env.SERVE_SCRIPT_CHILD_PROCESS) {
    const [name, path, args] = process.argv.slice(2)
    doServe(name, path, JSON.parse(args))

    return
}

async function doServe(name, path, args) {
    // resolve project paths
    const resolveOptions = {
        paths: [path]
    }

    const ServiceScript = require.resolve('@vue/cli-service/lib/Service', resolveOptions)
    const Service = require(ServiceScript)
    const MinimistScript = require.resolve('minimist', resolveOptions)

    // prepare vue-cli-service
    const service = new Service(process.env.VUE_CLI_CONTEXT || path)
    const serviceArgs = require(MinimistScript)(args, {
        boolean: [
            // build
            'modern',
            'report',
            'report-json',
            'watch',
            // serve
            'open',
            'copy',
            'https',
            // inspect
            'verbose'
        ]
    })

    // run serve command
    try {
        const { url } = await service.run('serve', serviceArgs, args)
        send({ type: 'success', content: url })
    } catch (e) {
        send({ type: 'error', content: e })
        process.exit(1)
    }

    function send(msg) {
        process.send(msg)
    }
}

async function serve(name, path, args) {
    const procArgs = [name, path, JSON.stringify(args)]

    return proc.fork(__filename, procArgs, path, {
        SERVE_SCRIPT_CHILD_PROCESS: true,
        IS_ELECTRON: true
    })
}

module.exports = serve
