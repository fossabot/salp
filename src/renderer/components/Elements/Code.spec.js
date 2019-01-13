import { expect } from 'chai'
import { spy, stub, fake } from 'sinon'
import Code from './Code.vue'
import { shallowMount } from '@vue/test-utils'

const sampleCode = ' const a = 1 + 2'
const sampleCodeLanguage = 'javascript'

function shallowMountCode(options = {}) {
    return shallowMount(Code, {
        ...options,
        propsData: {
            code: sampleCode,
            language: sampleCodeLanguage,
            ...options.propsData
        }
    })
}

describe('Code.vue', () => {
    describe('validate highlightedLines property', () => {
        const expectedValues = [
            { value: [], expects: true },
            { value: [1], expects: true },
            { value: [1, 5, 7], expects: true },
            { value: [[1, 2]], expects: true },
            { value: [[1]], expects: false },
            { value: [1, [1, 3], 4], expects: true },
            { value: [1, [1], 4], expects: false },
            { value: [-1], expects: false },
            { value: [0], expects: false },
            { value: [5, 5], expects: true },
            { value: [{}], expects: false },
            { value: ['1'], expects: false },
            { value: 5, expects: false },
            { value: [[7, 2]], expects: false },
            { value: [7.5], expects: false }
        ]

        const validator = Code.props.highlightedLines.validator

        expectedValues.forEach(({ value, expects }, index) => {
            it(`should validate '${value}' with ${expects} (${index})`, () => {
                expect(validator(value)).to.equal(expects)
            })
        })
    })

    describe('line highlighting', () => {
        const expectedValues = [
            { value: [1], expects: [0] },
            { value: [1, 2], expects: [0, 1] },
            { value: [1, [3, 5]], expects: [0, 2, 3, 4] }
        ]

        let highlightLines, addLineClass

        beforeEach(() => {
            addLineClass = spy()
            highlightLines = Code.methods.highlightLines.bind({
                editor: {
                    addLineClass
                }
            })
        })

        expectedValues.forEach(({ value, expects }, index) => {
            it(`should highlight lines '${expects}' when '${value}' given (${index})`, () => {
                highlightLines(value)

                const lines = addLineClass.getCalls().map(call => call.args[0])

                expect(lines).to.deep.equal(expects)
            })
        })
    })

    it('should render textarea by default', () => {
        const initialize = stub()
        const wrapper = shallowMountCode({
            methods: {
                initialize
            }
        })

        expect(wrapper).to.contain('textarea')
    })

    describe('CodeMirror options', () => {
        let setValue, fromTextArea

        beforeEach(() => {
            setValue = fake()
            fromTextArea = fake.returns({ setValue })
            Code.__Rewire__('codeMirror', { fromTextArea })

            shallowMountCode()
        })

        it('should pass language', () => {
            expect(fromTextArea.lastArg).to.have.property('mode', sampleCodeLanguage)
        })

        it('should set code', () => {
            expect(setValue.lastArg).to.equal(sampleCode)
        })

        it('should set default options', () => {
            const expectedDefaultOptions = {
                tabSize: 4,
                lineNumbers: true,
                readOnly: 'nocursor',
                viewportMargin: Infinity,
                mode: sampleCodeLanguage
            }

            expect(fromTextArea.lastArg).to.deep.equal(expectedDefaultOptions)
        })

        Code.__ResetDependency__('codeMirror')
    })
})
