import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SimpleList from './SimpleList.vue'

describe('SimpleList.vue', () => {
    it('should create class ol tag', () => {
        const wrapper = shallowMount(SimpleList, {
            context: {
                props: {
                    ordered: true
                }
            }
        })
        expect(wrapper).to.contain('ol')
    })

    it('should create class ul tag', () => {
        const wrapper = shallowMount(SimpleList, {
            context: {
                props: {
                    ordered: false
                }
            }
        })

        expect(wrapper).to.contain('ul')
    })
})
