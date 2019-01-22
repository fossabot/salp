#!/usr/bin/env node
// manually run 'vue-cli-service serve' as a script
// mainly used by @salp/application to detect when to start electron
const path = require('path')
const Service = require('@vue/cli-service/lib/Service')


async function run() {
    const service = new Service(process.env.VUE_CLI_CONTEXT || path.resolve(__dirname, '../'))

    const rawArgv = process.argv.slice(2)
    const args = require('minimist')(rawArgv, {
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

    try {
        const { url } = await service.run('serve', args, rawArgv)
        send({ type: 'success', content: url })
    } catch (e) {
        send({ type: 'error', content: e })
        process.exit(1)
    }

    function send(msg) {
        if (typeof process.send === 'function') {
            process.send(msg)
        }
    }
}

return run()
