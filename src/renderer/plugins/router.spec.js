import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import $store from '@/__mocks__/store/empty'

const pages = require.context('@/components/Pages', true, /\.vue$/)

describe('router.js', () => {
    describe('pages emit "pageTitle" event when loaded', () => {
        pages.keys().forEach(page => {
            const componentName = page.split('/').pop()
            const component = pages(page).default

            it(componentName, () => {
                const wrapper = shallowMount(component, {
                    mocks: {
                        $t: () => !1,
                        $store
                    }
                })

                expect(wrapper.emitted('pageTitle').length).to.equal(1)
            })
        })
    })
})
