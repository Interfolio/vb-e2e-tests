describe('log in api', () => {

    it('log in api 1', () => {
        //cy.LogInUsingAPI();
        cy.LogInUsingAPI().visit('/').location('pathname', { timeout: 10000 }).should('include', '/setup').pause()
        //cy.pause()
    });
});