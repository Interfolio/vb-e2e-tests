import * as templatesTable from "../pages/templatesTable"
import * as createTemplate from "../pages/createTemplatePage"
import { appCookies, createUUID, checkURLcontains } from '../pages/helper';
import * as sectionsPage from "../pages/sectionsPage"

describe('Create template', () => {

    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/setup', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(templatesTable.headersList).each(($el, index) => expect($el.get(0).innerText).to.contain(expectedValues.tableHeaders[index]))
        });
    });

    it('Create basic template and verify required fields', () => {
        cy.get(templatesTable.addTemplateButton).click()
        // create template page 1
        cy.get(createTemplate.activeStep).should('have.text', '1')
        cy.get(createTemplate.nextStepOrCreateTemplateButton).as('nextStepOrCreateTemplateButton')
        cy.get('@nextStepOrCreateTemplateButton').click()
        createTemplate.verifyFieldsAreRequiredAndErrorMessage()
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get('@nextStepOrCreateTemplateButton').click()
        //create template page 2
        cy.get(createTemplate.activeStep).should('have.text', ' 2 ')
        cy.get('@nextStepOrCreateTemplateButton').click()
        createTemplate.verifyFieldsAreRequiredAndErrorMessage()
        createTemplate.verifyRadioButtonState(false, true, false, true, true)
        const UUID = createUUID()
        cy.get(createTemplate.vitaDescriptionField).type('automated-' + UUID)
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(createTemplate.vitaNameField).type(expectedValues.activeTableEntries[1][0])
        });
        cy.get('@nextStepOrCreateTemplateButton').click()
        cy.get(createTemplate.uniqueNameError).should('contain', 'Vita name must be unique')
        cy.get(createTemplate.vitaNameField).clear().type('automated-' + UUID)
        createTemplate.clickEachRadioButton()
        cy.get(createTemplate.previousStepButton).click()
        cy.get(createTemplate.selectUnitDropdown).should('not.be.empty')
        cy.get(createTemplate.selectTemplateDropdown).should('not.be.empty')
        cy.get('@nextStepOrCreateTemplateButton').click()
        createTemplate.verifyRadioButtonState(true, false, true, false, false)
        cy.get('@nextStepOrCreateTemplateButton').click()
        checkURLcontains('/edit', 2000)
        cy.get(sectionsPage.sectionPageTitle).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit General Information')
        createTemplate.verifyRadioButtonState(true, false, true, false, false)
    });

    it('Verify cancel template creation works and popup is displayed', () => {
        cy.get(templatesTable.addTemplateButton).click()
        checkURLcontains('1/templates/new')
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get(createTemplate.cancelTemplateCreationButton).click()
        cy.get(createTemplate.cancelPopupBackButton).click()
        cy.get(createTemplate.selectUnitDropdown).should('not.be.empty')
        cy.get(createTemplate.selectTemplateDropdown).should('not.be.empty')
        cy.get(createTemplate.cancelPopupBackButton).should('not.be.visible')
        cy.get(createTemplate.cancelTemplateCreationButton).click()
        cy.get(createTemplate.cancelPopupYesButton).click()
        checkURLcontains('/setup')
        cy.get(templatesTable.addTemplateButton).click()
        cy.get(createTemplate.didYouMeanToCloneMessage).should('contain.text', 'Did you mean to clone a template?')
        cy.get(createTemplate.backToTemplatesButton).click()
        checkURLcontains('/setup')
        cy.get(templatesTable.addTemplateButton).click()
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get(createTemplate.nextStepOrCreateTemplateButton).click()
        checkURLcontains('1/templates/new')
        cy.get(createTemplate.cancelTemplateCreationButton).click()
        cy.get(createTemplate.cancelPopupBackButton).click()
        cy.get(createTemplate.cancelPopupBackButton).should('not.be.visible')
        cy.get(createTemplate.cancelTemplateCreationButton).click()
        cy.get(createTemplate.cancelPopupYesButton).click()
        checkURLcontains('/setup')
        cy.get(templatesTable.addTemplateButton).click()
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get(createTemplate.nextStepOrCreateTemplateButton).click()
        cy.get(createTemplate.didYouMeanToCloneMessage).should('contain.text', 'Did you mean to clone a template?')
        cy.get(createTemplate.backToTemplatesButton).click()
        checkURLcontains('/setup')
    });
});