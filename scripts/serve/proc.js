// helper to spawn/fork a child_process
const proc = require('child_process')

async function run(mode, script, args, cwd, env) {
    const runFn = proc[mode]

    return new Promise((resolve, reject) => {
        const child = runFn(script, args, {
            stdio: 'inherit',
            windowsHide: false,
            env: {
                ...process.env,
                ...env
            },
            cwd
        })

        // handle process exiting
        ;['SIGINT', 'SIGTERM'].forEach(signal => {
            process.on(signal, () => {
                child.kill(signal)
            })
        })

        child.on('exit', code => {
            console.error('Child exited with code ' + code)
            process.exit(code)
        })

        if (mode === 'fork') {
            // handle resolve events
            child.on('message', m => {
                if (m.type === 'error') {
                    reject(m.content)
                }

                resolve(m.content)
            })
        }
    })
}

async function fork(script, args, cwd, env) {
    return run('fork', script, args, cwd, env)
}

async function spawn(script, args, cwd, env) {
    return run('spawn', script, args, cwd, env)
}

module.exports ={
    run,
    fork,
    spawn
}
