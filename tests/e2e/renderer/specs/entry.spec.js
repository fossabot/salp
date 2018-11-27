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
})