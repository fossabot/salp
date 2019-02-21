// sandbox API
// this is just the control unit to interact with the sandbox
import { router } from '@/plugins/router'

class SandboxAPI {
    constructor(sandbox) {
        this.sandbox = sandbox

        this.unregisterRouterHandlers = []
        this._registerRouterHandlers()
    }

    handleSandboxIPCMessage(event) {
        switch (event.channel) {
            case 'route:change':
                this.handleSandboxRouteChange(...event.args)
        }
    }

    handleSandboxRouteChange(to) {
        if (to.fullPath === '/') {
            // ignore initial route
            return
        }

        const { resolved: contentRoute } = router.resolve({
            name: 'coursecontent',
            params: router.currentRoute.params
        })

        router.push({
            path: contentRoute.fullPath + to.fullPath,
            query: { 'fromSandbox': true }
        })
    }

    handleHostRouteChange(to) {
        if (to.name !== 'coursecontent-default' || to.query.fromSandbox) {
            // ignore outer (not course-content related) route changes and
            // route changes coming from sandbox
            return
        }

        const subRoute = to.params.pathMatch
        this.sandbox.send('route:change', '/' + subRoute)
    }

    _registerRouterHandlers() {
        this.unregisterRouterHandlers.push(
            router.afterEach(this.handleHostRouteChange.bind(this))
        )
    }

    destroy() {
        // unregister router handlers
        if (this.unregisterRouterHandlers.length) {
            this.unregisterRouterHandlers.forEach(unregister => unregister())
            this.unregisterRouterHandlers = []
        }
    }
}

export default SandboxAPI
