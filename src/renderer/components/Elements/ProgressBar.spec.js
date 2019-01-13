import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import ProgressBar from './ProgressBar.vue'

describe('ProgressBar.vue', () => {
    it('should update progress', () => {
        const wrapper = mount(ProgressBar, {
            propsData: { progress: 0 }
        })

        expect(wrapper).to.find('.el-progress__text').which.has.text('0%')

        wrapper.setProps({ progress: 30 })

        expect(wrapper).to.find('.el-progress__text').which.has.text('30%')
    })

    it('should show progress text if below 100%', () => {
        const progressValues = [0, 23, 40, 75, 90, 99]

        const wrapper = mount(ProgressBar)

        progressValues.forEach(val => {
            wrapper.setProps({ progress: val })

            expect(wrapper).to.find('.el-progress__text').which.has.text(val + '%')
        })
    })

    it('should show success icon when 100%', () => {
        const wrapper = mount(ProgressBar, {
            propsData: { progress: 100 }
        })

        expect(wrapper).to.find('.el-icon-circle-check')
        expect(wrapper).to.find('.el-progress__text').which.has.text('')
    })
})
