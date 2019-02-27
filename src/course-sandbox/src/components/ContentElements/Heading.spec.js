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
        expect(wrapper).to.have.classes('contentelement-heading')
    })

    it(`should create class "contentelement-heading--h${expectedLevel}"`, () => {
        expect(wrapper).to.have.classes(`contentelement-heading--h${expectedLevel}`)
    })

    it(`should create tag h${expectedLevel}`, () => {
        expect(wrapper).to.contain(`h${expectedLevel}`)
    })

    it('should set heading text correctly', () => {
        expect(wrapper).to.have.text(expectedHeading)
    })
})
