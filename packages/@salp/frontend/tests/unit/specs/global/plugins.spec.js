import { expect } from 'chai'

const pluginsContext = require.context('@/plugins', true, /\.js$/)
const plugins = pluginsContext.keys().filter(plugin => !plugin.endsWith('.spec.js'))

describe('Global plugins tests', () => {
    describe('Each plugin', () => {
        plugins.forEach(plugin => {
            const pluginName = plugin.split('/').pop()
            const pluginModule = pluginsContext(plugin).default

            it(`should export a Vue plugin (${pluginName})`, () => {
                expect(pluginModule).to.be.an('object').that.has.a.property('install').which.is.a('function')
            })
        })
    })
})
