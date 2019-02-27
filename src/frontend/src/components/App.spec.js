import { expect } from 'chai'
import { stub } from 'sinon'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

const initialAppTitle = 'App'
const testRouteName = 'TheTestRouteNameAndAlsoPageTitle'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter({
    routes: [
        {
            path: '/test',
            name: testRouteName
        }
    ]
})

const matomoStub = {
    setConsentGiven: stub()
}

describe('App.vue', () => {
    let wrapper,
        persistedUserPreferencesGetterStub

    beforeEach(() => {
        persistedUserPreferencesGetterStub = stub()
        persistedUserPreferencesGetterStub.returns(true)

        const store = new Vuex.Store({
            getters: {
                'persisted/UserPreferences/GET_OPTION': () => persistedUserPreferencesGetterStub
            }
        })

        wrapper = shallowMount(App, {
            localVue,
            router,
            store,
            stubs: ['router-view'],
            mocks: {
                $matomo: matomoStub
            }
        })
    })

    it('should have an initial page title', () => {
        expect(wrapper.vm.pageTitle).to.equal(initialAppTitle)
    })

    it('should update the page title when route changes', () => {
        expect(wrapper.vm.pageTitle).to.equal(initialAppTitle)

        router.push({ name: testRouteName })

        expect(wrapper.vm.pageTitle).to.equal(testRouteName)
    })

    it('should update the page title when event "pageTitle" was emitted', () => {
        const updatedTitle = 'UpdatedTitle'

        expect(wrapper.vm.pageTitle).to.equal(initialAppTitle)

        wrapper.find('router-view-stub').vm.$emit('pageTitle', updatedTitle)

        expect(wrapper.vm.pageTitle).to.equal(updatedTitle)
    })

    it('should change the page title in header', () => {
        const changedTitle = 'Changed Title'

        expect(wrapper).to.find('.page-title').which.has.text(initialAppTitle)

        wrapper.setData({ pageTitle: changedTitle })

        expect(wrapper).to.find('.page-title').which.has.text(changedTitle)
    })

    it('should enable tracking if user gave consent on startup')
})
