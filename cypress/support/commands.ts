import * as LogInPage from "../components/pages/logInPage"
import { templatesTableSelectors } from "../components/pages/templatesTablePage"

declare global {
    namespace Cypress {
        interface Chainable {
            LogIn: typeof LogIn
            LogInUsingAPI: typeof loginByAPI
            createTemplateAPI: typeof createTemplateAPI
            getAllTemplateIdsAPI: typeof getAllTemplateIdsAPI
            deleteTemplatesByIdsAPI: typeof deleteTemplatesByIdsAPI
            updateTemplateToArchivedAPI: typeof updateTemplateToArchivedAPI
            createVitaAPI: typeof createVitaAPI
            getAllVitasIdsAPI: typeof getAllVitasIdsAPI
            deleteVitasByIdsAPI: typeof deleteVitasByIdsAPI
            updateVitaToArchivedAPI: typeof updateVitaToArchivedAPI
        }
    }
}

export function LogIn() {
    cy.get(LogInPage.email_field).type(Cypress.env('username'))
    cy.get(LogInPage.password_field).type(Cypress.env('password'))
    cy.get(LogInPage.sign_in_button).click()
    cy.get(templatesTableSelectors.templateTablePageTitle, { timeout: 20000 }).should('be.visible')
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

export function createTemplateAPI(name: string, unitId: string, baseTemplateId: number, activeFlag: boolean): Cypress.Chainable<any> {
    const createMutation =
        `mutation{
            createVitaTemplate(
            input: {
                unitId: "${unitId}"
                baseTemplateId: ${baseTemplateId}
                settings: {
                    name: "${name}" 
                    description: "automated template"
                    active: ${activeFlag}
                    showVitaName: true
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
    //TO DO need to change template type once we have myTemplates up
    const getAllTemplateQuery =
        `{ 
            vitaTemplates(page: 1, per: 1000, active: ${activeFlag}, templateType:1) {
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

export function updateTemplateToArchivedAPI(id: string, name: string, active: boolean) {
    const updateMutation =
        `mutation {
            updateVitaTemplate(
                input: {
                    id: ${id},
                    settings: {   
                        name: "${name}",
                        active: ${active},
                        description: "automated template",
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

export function createVitaAPI(name: string, cvType: number, vitaTemplateId: number, activeFlag: boolean): Cypress.Chainable<any> {
    const createMutation =
        `mutation{
            createVita(
                input: {
                    name: "${name}"
                    description: "automated vita"
                    cvType: ${cvType}
                    vitaTemplateId: ${vitaTemplateId}
                    active:  ${activeFlag}
                }
            )
            {
              name
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

export function getAllVitasIdsAPI(activeFlag: boolean): Cypress.Chainable<any> {
    const getAllVitasQuery =
        `{ 
            vitas(page: 1, per: 1000, active: ${activeFlag}) { 
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
        body: { query: getAllVitasQuery }
    })
        .then((res: Cypress.Response) => {
            expect(res.status).to.eq(200);
            return res.body.data
        });
}

export function deleteVitasByIdsAPI(listOfIds: number[]): Cypress.Chainable<any> {
    const deleteMutation =
        `mutation {
            destroyVitas(
              input: {
                ids: [${listOfIds}]
              }
            ) {
              vitas{
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
        body: { query: deleteMutation }
    })
        .then((res: Cypress.Response) => {
            expect(res.status).to.eq(200);
        });
}

export function updateVitaToArchivedAPI(id: number, active: boolean) {
    const updateMutation =
        `mutation {
            updateVita(
                input: {
                    id: ${id},
                    active: ${active},
                }
            ) {
                id
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
Cypress.Commands.add('createVitaAPI', createVitaAPI)
Cypress.Commands.add('getAllVitasIdsAPI', getAllVitasIdsAPI)
Cypress.Commands.add('deleteVitasByIdsAPI', deleteVitasByIdsAPI)
Cypress.Commands.add('updateVitaToArchivedAPI', updateVitaToArchivedAPI)
