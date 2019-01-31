const path = require('path')
const fs = require('fs')

class CodeInjectionWebpackResolverPlugin {
    constructor(ctx, prefix, injectors) {
        this.ctx = ctx
        this.prefix = prefix
        this.injectors = {}

        const { writeTmp } = createTemp(ctx.cwd)
        this.writeTmp = writeTmp

        injectors = injectors || []
        injectors.forEach(this.registerInjector.bind(this))
    }

    registerInjector(injector) {
        const info = injector(this.ctx)

        this.injectors[info.name] = info.apply
    }

    get source() {
        return 'resolve'
    }

    get target() {
        return 'file'
    }

    apply(resolver) {
        const target = resolver.ensureHook(this.target)
        resolver.getHook(this.source).tapPromise('CodeInjectionWebpackResolverPlugin', this.handleResolve.bind(this, resolver, target))
    }

    async handleResolve(resolver, target, request, resolveContext) {
        if (!request.request.startsWith(this.prefix)) {
            return
        }

        const injectorName = request.request.replace(this.prefix + '/', '')
        if (!(this.injectors.hasOwnProperty(injectorName))) {
            throw new Error(`Injector "${injectorName}" was not registered`)
        }

        const code = await this.injectors[injectorName](resolveContext)
        const file = await this.writeTmp(injectorName, code)

        const changedRequest = {
            ...request,
            path: file,
        }

        return await asyncDoResolve(resolver, target, changedRequest, `injected code from "${injectorName}`, resolveContext)
    }
}

function asyncDoResolve(resolver, target, request, message, resolveContext) {
    return new Promise((resolve, reject) => {
        resolver.doResolve(target, request, message, resolveContext, (err, res) => {
            if (err) {
                reject(err)
            }

            resolve(res)
        })
    })
}

function createTemp(srcDir) {
    const cachePath = path.resolve(srcDir, 'node_modules/.cache')

    if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath)
    }

    const tmpPath = path.resolve(cachePath, 'salp-course-bundler')

    if (!fs.existsSync(tmpPath)) {
        fs.mkdirSync(tmpPath)
    }

    const tmpCache = new Map()

    async function writeTmp(name, content) {
        const destPath = path.join(tmpPath, name + '.js')

        const cache = tmpCache.get(name)
        if (cache !== content) {
            await fs.writeFileSync(destPath, content)
            tmpCache.set(name, content)
        }

        return destPath
    }

    return { tmpPath, writeTmp }
}

module.exports = CodeInjectionWebpackResolverPlugin
