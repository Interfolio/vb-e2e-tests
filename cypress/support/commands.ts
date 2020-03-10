import * as LogInPage from "../pages/logInPage"
import { templateTablePageTitle } from "../pages/templatesTable"

declare global {
    namespace Cypress {
        interface Chainable {
            LogIn: typeof LogIn
            LogInUsingAPI: typeof loginByAPI
            createTemplateAPI: typeof createTemplateAPI
            getAllTemplateIdsAPI: typeof getAllTemplateIdsAPI
            deleteTemplatesByIdsAPI: typeof deleteTemplatesByIdsAPI
            updateTemplateToArchivedAPI: typeof updateTemplateToArchivedAPI
        }
    }
}

export function LogIn() {
    cy.get(LogInPage.email_field).type(Cypress.env('username'))
    cy.get(LogInPage.password_field).type(Cypress.env('password'))
    cy.get(LogInPage.sign_in_button).click()
    cy.get(templateTablePageTitle, { timeout: 20000 }).should('be.visible')
}

export function loginByAPI(): Cypress.Chainable<any> {
    return cy.request({
        method: 'POST',
        url: 'https://iam-api-test.interfolio.com/users/login',
        body: {
            username: Cypress.env('username'),
            password: Cypress.env('password'),
        }
    })
        .then((res: Cypress.Response) => {
            expect(res.status).to.eq(200);
        });
}

export function createTemplateAPI(name: String, unitId: string, baseTemplateId: number): Cypress.Chainable<any> {
    const createMutation =
        `mutation{
        createVitaTemplate(
          input: {
            settings: {
              name: "${name}"
              unitId: "${unitId}"
              baseTemplateId: ${baseTemplateId}
              description: "automated templated"
            }
        }
        ) {
          id
          settings
        }
    }`
    return cy.request({
        method: 'POST',
        url: Cypress.env('APIurl'),
        headers: {
            'Content-Type': 'application/json'
        },
        body: { query: createMutation }
    })
        .then((res: Cypress.Response) => {
            expect(res.status).to.eq(200);
            return res.body.data
        });
}

export function getAllTemplateIdsAPI(activeFlag: boolean): Cypress.Chainable<any> {
    const getAllTemplateQuery =
        `{ 
            vitaTemplates(page: 1, per: 1000, active: ${activeFlag}) {
                items {
                    id
                }
            }
        }`
    return cy.request({
        method: 'POST',
        url: Cypress.env('APIurl'),
        headers: {
            'Content-Type': 'application/json'
        },
        body: { query: getAllTemplateQuery }
    })
        .then((res: Cypress.Response) => {
            expect(res.status).to.eq(200);
            return res.body.data
        });
}

export function deleteTemplatesByIdsAPI(listOfIds: number[]): Cypress.Chainable<any> {
    const deleteMutation =
        `mutation {
            destroyVitaTemplates(
              input: {
                ids: [${listOfIds}]
              }
            ) {
              vitaTemplates{
                id
                settings
              }
            }
            
          }`
    return cy.request({
        method: 'POST',
        url: Cypress.env('APIurl'),
        headers: {
            'Content-Type': 'application/json'
        },
        body: { query: deleteMutation }
    })
        .then((res: Cypress.Response) => {
            expect(res.status).to.eq(200);
        });
}

export function updateTemplateToArchivedAPI(id: string, name: string, unitId: string, baseTemplateId: number, active: boolean) {
    const updateMutation =
        `mutation {
        updateVitaTemplate(
          input: {
            id: ${id},
            settings: {   
              name: "${name}",
              unitId: "${unitId}",
              active: ${active},
              description: "automated templated",
              baseTemplateId: ${baseTemplateId},
            }
          }
        ) {
          id
          settings
        }
      }`
    return cy.request({
        method: 'POST',
        url: Cypress.env('APIurl'),
        headers: {
            'Content-Type': 'application/json'
        },
        body: { query: updateMutation }
    })
        .then((res: Cypress.Response) => {
            expect(res.status).to.eq(200);
        });


}
Cypress.Commands.add('LogIn', LogIn)
Cypress.Commands.add('LogInUsingAPI', loginByAPI)
Cypress.Commands.add('createTemplateAPI', createTemplateAPI)
Cypress.Commands.add('getAllTemplateIdsAPI', getAllTemplateIdsAPI)
Cypress.Commands.add('deleteTemplatesByIdsAPI', deleteTemplatesByIdsAPI)
Cypress.Commands.add('updateTemplateToArchivedAPI', updateTemplateToArchivedAPI)
