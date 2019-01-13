import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from './App.vue'

const initialAppTitle = 'App'
const testRouteName = 'TheTestRouteNameAndAlsoPageTitle'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/test',
            name: testRouteName
        }
    ]
})

describe('App.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(App, {
            localVue,
            router,
            stubs: ['router-view']
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
})
