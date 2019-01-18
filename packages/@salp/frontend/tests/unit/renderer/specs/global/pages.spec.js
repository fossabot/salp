import { expect } from 'chai'

const pages = require.context('@/components/Pages', true, /\.vue$/)

describe('Global pages tests', () => {
    describe('Each page', () => {
        pages.keys().forEach(page => {
            const componentName = page.split('/').pop()
            const component = pages(page).default

            it(`should have a "pageTitleTranslationKey" option (${componentName})`, () => {
                expect(component).to.have.property('pageTitleTranslationKey')
            })
        })
    })
})
