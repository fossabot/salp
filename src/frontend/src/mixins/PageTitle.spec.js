import { expect } from 'chai'
import { spy } from 'sinon'
import { shallowMount } from '@vue/test-utils'
import PageTitle from './PageTitle.js'

const testTranslationKey = 'Some.translation.App.key'

describe('Page title mixin: PageTitle.js', () => {
    const PageTitleMixin = PageTitle.__get__('mixin')
    let component
    const translationFunctionSpy = spy()

    before('Add spy for i18n translation function', () => {
        PageTitle.__Rewire__('i18n', {
            t: translationFunctionSpy
        })
    })

    beforeEach('Reset i18n translation function spy', () => {
        translationFunctionSpy.resetHistory()
    })

    beforeEach('setup component', () => {
        component = {
            name: 'Test',
            render(createElement) {
                return createElement('div')
            },
            mixins: [PageTitleMixin]
        }
    })

    after('Remove i18n translation function spy', () => {
        PageTitle.__ResetDependency__('i18n')
    })

    it('should add "beforeMount" hook to component', () => {
        const wrapper = shallowMount(component)

        expect(wrapper.vm.constructor.options.beforeMount)
            .to.satisfy(hooks => hooks.filter(fn => fn === PageTitleMixin.beforeMount).length === 1)
    })

    it('should not emit "pageTitle" event when option "pageTitleTranslationKey" is not set', () => {
        const wrapper = shallowMount(component)

        expect(wrapper).not.to.have.emitted('pageTitle')
    })

    it('should emit "pageTitle" event when option "pageTitleTranslationKey" is set', () => {
        component.pageTitleTranslationKey = testTranslationKey

        const wrapper = shallowMount(component)

        expect(wrapper).to.have.emitted('pageTitle', 1)
    })

    it('should call translation function', () => {
        component.pageTitleTranslationKey = testTranslationKey

        shallowMount(component)

        expect(translationFunctionSpy).to.have.been.calledWith(testTranslationKey)
    })

    it('should not call component\'s translation function', () => {
        // because i18n is injected later, so an error is thrown
        component.pageTitleTranslationKey = testTranslationKey
        const translationFnSpy = spy()

        shallowMount(component, {
            mocks: {
                $t: translationFnSpy
            }
        })

        expect(translationFnSpy).to.have.not.been.called
    })
})
