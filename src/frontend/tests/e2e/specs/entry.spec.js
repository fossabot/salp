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
            const expectedCssRules = {
                'margin': '0px',
                'padding': '0px',
                '-webkit-app-region': 'no-drag',
                // 'font-family': ...,  // covered by another test
                'background-color': 'rgb(255, 255, 255)'
            }

            cy.get('body')
                .should($el => {
                    Object.entries(expectedCssRules).forEach(([rule, value]) => {
                        expect($el).to.have.css(rule, value)
                    })
                })
        })

        it('should load element-ui styles for Main component', () => {
            // see 'element-ui/packages/theme-chalk/src/main.scss'
            const expectedCssRules = {
                'display': 'flex',
                'flex': '1 1 auto',
                'flex-basis': 'auto',
                'overflow': 'auto',
                'box-sizing': 'border-box'
                // 'padding': '$--main-padding'
            }

            cy.get('#app-content')
                .should($el => {
                    Object.entries(expectedCssRules).forEach(([rule, value]) => {
                        expect($el).to.have.css(rule, value)
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
