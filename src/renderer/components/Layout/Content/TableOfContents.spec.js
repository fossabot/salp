import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import TableOfContent from './TableOfContents.vue'

function shallowMountComponent(options = {}) {
    return shallowMount(TableOfContent, {
        ...options,
        propsData: {
            toc: {},
            ...options.propsData
        }
    })
}

const expectedRootClass = 'toc--layout-content'

describe('TableOfContents.vue', () => {
    it(`should have root class '${expectedRootClass}'`, () => {
        const wrapper = shallowMountComponent()

        expect(wrapper.classes(expectedRootClass)).to.be.true
    })
})
