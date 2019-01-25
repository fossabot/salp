// General app entry test

describe('App (Entry)', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should display the home page title', () => {
        cy.get('.page-title')
            .should('be.visible')
            .contains('Home')
    })

    // These tests make sure the app's stylesheet is loaded
    describe('app stylesheet is loaded', () => {
        it('should have expected css rules on body', () => {
            const expectedCssRules = [
                'margin',
                'padding',
                '-webkit-app-region',
                'font-family',
                'background-color'
            ]

            cy.get('body')
                .should($el => {
                    expectedCssRules.forEach(rule => {
                        expect($el).to.have.css(rule)
                    })
                })
        })

        it('should load element-ui styles for Main component', () => {
            // see 'element-ui/packages/theme-chalk/src/main.scss'
            const expectedCssRules = [
                'display',
                'flex',
                'flex-basis',
                'overflow',
                'box-sizing',
                'padding'
            ]

            cy.get('#app-content')
                .should($el => {
                    expectedCssRules.forEach(rule => {
                        expect($el).to.have.css(rule)
                    })
                })
        })

        it('should have the correct font family', () => {
            cy.get('body')
                .should('have.css', 'font-family')
                .and('eq', '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif')
        })
    })
})
