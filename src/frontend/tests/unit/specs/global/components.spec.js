import { expect } from 'chai'

const componentsContext = require.context('@/components', true, /\.vue$/)
const components = componentsContext.keys()

describe('Global components tests', () => {
    describe('Each component', () => {
        components.forEach(plugin => {
            const componentName = plugin.split('/').pop()
            const componentModule = componentsContext(plugin).default

            it(`should have a name (${componentName})`, () => {
                expect(componentModule, `Component "${componentName}" at "${plugin}" does not have a name`).to.be.an('object').that.has.a.property('name').which.is.a('string')
            })
        })
    })
})
