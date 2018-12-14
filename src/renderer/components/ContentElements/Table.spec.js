import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Table from './Table.vue'

describe('Table.vue', () => {
    let wrapper = {}

    beforeEach(() => {
        wrapper = shallowMount(Table, {
            context: {
                props: {
                    data: [{
                        date: '2016-05-03',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }, {
                        date: '2016-05-02',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }, {
                        date: '2016-05-04',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }, {
                        date: '2016-05-01',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }]
                }
            }
        })
    })

    it('should create class "contentelement-table"', () => {
        expect(wrapper.classes('contentelement-table')).to.be.true
    })

    it('should create table tag', () => {
        expect(wrapper.contains('table')).to.be.true
    })
})
