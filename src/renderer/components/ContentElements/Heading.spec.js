import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Heading from './Heading.vue'

describe('Heading.vue', () => {
    let wrapper = {}
    const expectedHeadding = 'Lorem Ipsum'
    const expectedLevel = 3

    beforeEach(() => {
        wrapper = shallowMount(Heading, {
            context: {
                props: {
                    level: expectedLevel
                },
                children: [expectedHeadding]
            }
        })
    })

    it('class contentelement-heading should be added', () => {
        expect(wrapper.classes('contentelement-heading')).to.be.true
    })

    it(`class contentelement-heading--h${expectedLevel} should be added`, () => {
        expect(wrapper.classes(`contentelement-heading--h${expectedLevel}`)).to.be.true
    })

    it(`h${expectedLevel} tag should be created`, () => {
        expect(wrapper.contains(`h${expectedLevel}`)).to.be.true
    })

    it('heading text should be set', () => {
        expect(wrapper.text()).to.equal(expectedHeadding)
    })
})
