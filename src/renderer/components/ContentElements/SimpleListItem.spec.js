import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SimpleListItem from './SimpleListItem.vue'

describe('SimpleListItem.vue', () => {
    const expectedText = 'Lorem Ipsum'

    it('should create class li tag', () => {
        const wrapper = shallowMount(SimpleListItem, {
            context: {
                props: {
                    ordered: true
                },
                children: [expectedText]
            }
        })

        expect(wrapper).to.contain('li')
    })

    it('should create class ul tag', () => {
        const wrapper = shallowMount(SimpleListItem, {
            context: {
                props: {
                    ordered: false
                },
                children: [expectedText]
            }
        })

        expect(wrapper).to.have.text(expectedText)
    })
})
