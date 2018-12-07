import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import icons from '@/plugins/icons.js'

const testIconKey = 'testIcon'

const fakeComponent = {
    name: 'Fake',
    template: '<div></div>'
}

const localVue = new createLocalVue()
localVue.use(icons)

describe('icons.js: icons plugin', () => {
    it('attaches $icons object to components vm', () => {
        const wrapper = shallowMount(fakeComponent, {
            localVue,
            icons: {
                [testIconKey]: true
            }
        })

        expect(wrapper.vm.$icons).to.have.property(testIconKey)
    })
})
