import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import InlineCode from './InlineCode.vue'

describe('InlineCode.vue', () => {
    let wrapper = {}
    const expectedCode = 'const lorem = 1;'

    beforeEach(() => {
        wrapper = shallowMount(InlineCode, {
            context: {
                children: [expectedCode]
            }
        })
    })

    it('should create class "contentelement-inline-code"', () => {
        expect(wrapper).to.have.classes('contentelement-inline-code')
    })

    it('should create tag code', () => {
        expect(wrapper).to.contain('code')
    })

    it('should set code text correctly', () => {
        expect(wrapper).to.have.text(expectedCode)
    })
})
