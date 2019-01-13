import { expect } from 'chai'
import { spy } from 'sinon'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableOfContentsMixin from './TableOfContents.js'

const localVue = createLocalVue()

const threeLevelDepthToc = {
    first: {
        title: 'First',
        children: {
            second: {
                title: 'Second',
                children: {
                    third: 'third'
                }
            }
        }
    }
}

function shallowMountComponent(extendOptions = {}, mountOptions = {}) {
    const component = localVue.extend({
        name: 'TOC',
        mixins: [TableOfContentsMixin],
        ...extendOptions
    })

    return shallowMount(component, {
        localVue,
        ...mountOptions,
        propsData: {
            toc: {},
            ...mountOptions.propsData
        }
    })
}

describe('TableOfContents.js mixin', () => {
    describe('validate depth property', () => {
        const expectedValues = [
            { value: 1, expects: true },
            { value: 7, expects: true },
            { value: 7.5, expects: false },
            { value: 0, expects: false },
            { value: -1, expects: false },
            { value: 'some string', expects: false }
        ]

        const validator = TableOfContentsMixin.props.depth.validate

        expectedValues.forEach(({ value, expects }, index) => {
            it(`should validate '${value}' with ${expects} (${index})`, () => {
                expect(validator(value)).to.equal(expects)
            })
        })
    })

    describe('rendering', () => {
        const renderFunctionNames = [
            'createLink',
            'createMenuItem',
            'createSubMenu'
        ]

        describe('mixin has default/fallback render methods', () => {
            const wrapper = shallowMountComponent()

            renderFunctionNames.forEach(func => {
                it(`should have default render function '${func}' which returns a VNode`, () => {
                    const method = wrapper.vm[func]

                    expect(method).to.be.a('function')
                    expect(method()).to.be.an.instanceof(wrapper.vm.$vnode.constructor)
                })
            })
        })

        describe('rendering a toc', () => {
            const renderFunctionSpies = {}
            renderFunctionNames.forEach(func => {
                renderFunctionSpies[func] = spy()
            })

            shallowMountComponent({
                methods: {
                    ...renderFunctionSpies
                }
            }, {
                propsData: {
                    toc: threeLevelDepthToc
                }
            })

            renderFunctionNames.forEach(func => {
                it(`should have invoked '${func}'`, () => {
                    expect(renderFunctionSpies[func]).to.have.been.called
                })
            })
        })
    })

    describe('rendering a three level deep toc', () => {
        const maxDepths = [1, 2]

        maxDepths.forEach(maxDepth => {
            describe(`with a max depth of ${maxDepth}`, () => {
                const wrapper = shallowMountComponent({}, {
                    propsData: {
                        toc: threeLevelDepthToc,
                        depth: maxDepth
                    }
                })

                it(`should have a level ${maxDepth} submenu`, () => {
                    expect(wrapper).to.find(`.toc__menu--level-${maxDepth}`)
                })

                it(`should not have a level ${maxDepth + 1} submenu`, () => {
                    // see https://github.com/jdoubleu/vue-test-chai/issues/1
                    expect(wrapper.find(`.toc__menu--level-${maxDepth + 1}`)).not.to.exist
                })
            })
        })
    })
})
