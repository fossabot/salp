import { expect } from 'chai'
import { shallowMount, createLocalVue, createWrapper } from '@vue/test-utils'
import Icon from './Icon.vue'
import icons from '@/plugins/icons.js'
import { faBandAid } from '@fortawesome/free-solid-svg-icons'

const localVue = new createLocalVue()
localVue.use(icons)

describe('Icon.vue', () => {
    describe('always renders "el-icon-fa" as first class', () => {
        const test = wrapper => expect(wrapper.classes().indexOf('el-icon-fa')).to.equal(0)

        it('by default', () => {
            const wrapper = shallowMount(Icon, {
                context: {
                    props: { icon: faBandAid }
                }
            })

            test(wrapper)
        })

        it('when additional classes are provided', () => {
            const wrapper = shallowMount(Icon, {
                context: {
                    props: { icon: faBandAid },
                    staticClass: 'other-class'
                }
            })

            test(wrapper)
        })
    })

    it('resolves icon from parent', () => {
        const fakeComponent = {
            localVue,
            name: 'Fake',
            render(createElement) {
                return createElement(Icon, {
                    props: {
                        icon: 'faBandAid'
                    }
                })
            },
            components: { Icon },
            icons: { faBandAid }
        }

        const ParentConstructor = localVue.extend(fakeComponent)
        const parentVm = new ParentConstructor().$mount()

        const wrapper = createWrapper(parentVm).find(Icon)

        expect(wrapper.name()).to.equal('svg')
        expect(wrapper.classes('fa-band-aid')).to.be.true
    })

    it('passes through additional classes', () => {
        const expectedClass = 'some-other-class'

        const wrapper = shallowMount(Icon, {
            context: {
                props: { icon: faBandAid },
                staticClass: expectedClass
            }
        })

        expect(wrapper.classes(expectedClass)).to.be.true
    })
})