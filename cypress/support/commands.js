import * as LogInPage from "../pages/logInPage"


Cypress.Commands.add('LogIn', function () {
    cy.get(LogInPage.email_field).type(Cypress.env('username'))
    cy.get(LogInPage.password_field).type(Cypress.env('password'))
    cy.get(LogInPage.sign_in_button).click()
    cy.get('.ant-typography', { timeout: 20000 }).should('be.visible')
})