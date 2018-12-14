import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Heading from './Heading.vue'

describe('Heading.vue', () => {
    let wrapper = {}
    const expectedHeading = 'Lorem Ipsum'
    const expectedLevel = 3

    beforeEach(() => {
        wrapper = shallowMount(Heading, {
            context: {
                props: {
                    level: expectedLevel
                },
                children: [expectedHeading]
            }
        })
    })

    it('should create class "contentelement-heading"', () => {
        expect(wrapper.classes('contentelement-heading')).to.be.true
    })

    it(`should create class "contentelement-heading--h${expectedLevel}"`, () => {
        expect(wrapper.classes(`contentelement-heading--h${expectedLevel}`)).to.be.true
    })

    it(`should create tag h${expectedLevel}`, () => {
        expect(wrapper.contains(`h${expectedLevel}`)).to.be.true
    })

    it('should set heading text correctly', () => {
        expect(wrapper.text()).to.equal(expectedHeading)
    })
})
