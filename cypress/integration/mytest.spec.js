describe('test 1',function(){

    it('Sign in',function(){
        cy.visit('/')
        cy.get('input[type="email"]').type(Cypress.env('username'))
        cy.get('input[type="password"]').type(Cypress.env('password'))
        cy.get('.btn').contains('Sign in').should('be.visible').click()
    })
})