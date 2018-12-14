import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'

const pages = require.context('@/components/Pages', true, /\.vue$/)

const stubs = [
    'Icon',
    'router-view'
]

describe('router.js', () => {
    describe('pages emit "pageTitle" event when loaded', () => {
        pages.keys().forEach(page => {
            const componentName = page.split('/').pop()
            const component = pages(page).default

            it(componentName, () => {
                const wrapper = shallowMount(component, {
                    stubs,
                    mocks: {
                        $t: () => !1
                    }
                })

                expect(wrapper.emitted('pageTitle').length).to.equal(1)
            })
        })
    })
})
