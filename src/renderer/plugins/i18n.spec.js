import { expect } from 'chai'
import { fake } from 'sinon'
import i18n from './i18n.js'

i18n.__Rewire__('vue', { load: ()=>!1 })
i18n.__Rewire__('vue-i18n', ()=>!1)

const filesMock = {
    'en/App.json': { 'app': 'App' },
    'en/Layout/Course.json': { 'course': 'Course', 'actions': { 'delete': 'delete' } },
    'de/App.json': { 'app': 'Anwendung' }
}

const expectedNestedPaths = [
    'en.App.app', 
    'en.Layout.Course.actions.delete',
    'de.App.app'
]

describe('i18n vue plugin integration', () => {
    it('creates correct messages object from nested locale files', () => {
        const loader = fake(file => {
            if (file in filesMock) {
                return filesMock[file]
            }
        })

        const messages = i18n.__get__('createMessages')(Object.keys(filesMock), loader)

        expect(loader.callCount).to.equal(Object.keys(filesMock).length)

        expectedNestedPaths.forEach(path => {
            expect(messages).to.have.nested.property(path)
        })
    })
})