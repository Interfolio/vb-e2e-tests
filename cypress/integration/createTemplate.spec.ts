import * as createTemplate from "../pages/createTemplatePage"
import { appCookies, createUUID, checkURLcontains } from '../pages/helper';
import * as sectionsPage from "../pages/sectionsPage"
import { templatesTableSelectors } from "../pages/templatesTable"
import { RadioButton } from "../components/radio-button"
import { sectionsPageSelectors } from "../pages/sectionsPage"
import { createTemplatePageSelectors } from "../pages/createTemplatePage"

describe('Create template', () => {

    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/setup', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(templatesTableSelectors.headersList, { timeout: 5000 }).each(($el, index) => expect($el.get(0).innerText).to.contain(expectedValues.tableHeaders[index]))
        });
    });

    it('Create basic template and verify required fields', () => {
        cy.get(templatesTableSelectors.addTemplateButton).click()
        // create template page 1
        cy.get(createTemplatePageSelectors.activeStep).should('have.text', '1')
        cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).as('nextStepOrCreateTemplateButton')
        cy.get('@nextStepOrCreateTemplateButton').click()
        createTemplate.verifyFieldsAreRequiredAndErrorMessage()
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get('@nextStepOrCreateTemplateButton').click()
        //create template page 2
        cy.get(createTemplatePageSelectors.activeStep).should('have.text', ' 2 ')
        cy.get('@nextStepOrCreateTemplateButton').click()
        createTemplate.verifyFieldsAreRequiredAndErrorMessage()
        RadioButton.verifyStates(false, true, false, true, true)
        const UUID = createUUID()
        cy.get(createTemplatePageSelectors.vitaDescriptionField).type('automated-' + UUID)
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(createTemplatePageSelectors.vitaNameField).type(expectedValues.activeTableEntries[1][0])
        });
        cy.get('@nextStepOrCreateTemplateButton').click()
        cy.get(createTemplatePageSelectors.uniqueNameError).should('contain', 'Vita name must be unique')
        cy.get(createTemplatePageSelectors.vitaNameField).clear().type('automated-' + UUID)
        RadioButton.clickEachRadioButton()
        cy.get(createTemplatePageSelectors.previousStepButton).click()
        cy.get(createTemplatePageSelectors.selectUnitDropdown).should('not.be.empty')
        cy.get(createTemplatePageSelectors.selectTemplateDropdown).should('not.be.empty')
        cy.get('@nextStepOrCreateTemplateButton').click()
        RadioButton.verifyStates(true, false, true, false, false)
        cy.get('@nextStepOrCreateTemplateButton').click()
        checkURLcontains('/edit', 20000)
        cy.get(sectionsPageSelectors.sectionPageTitle).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit General Information')
        RadioButton.verifyStates(true, false, true, false, false)
    });

    it('Verify cancel template creation works and popup is displayed', () => {
        cy.get(templatesTableSelectors.addTemplateButton).click()
        checkURLcontains('1/templates/new')
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(createTemplatePageSelectors.cancelPopupBackButton).click()
        cy.get(createTemplatePageSelectors.selectUnitDropdown).should('not.be.empty')
        cy.get(createTemplatePageSelectors.selectTemplateDropdown).should('not.be.empty')
        cy.get(createTemplatePageSelectors.cancelPopupBackButton).should('not.be.visible')
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(createTemplatePageSelectors.cancelPopupYesButton).click()
        checkURLcontains('/setup')
        cy.get(templatesTableSelectors.addTemplateButton).click()
        cy.get(createTemplatePageSelectors.didYouMeanToCloneMessage).should('contain.text', 'Did you mean to clone a template?')
        cy.get(createTemplatePageSelectors.backToTemplatesButton).click()
        checkURLcontains('/setup')
        cy.get(templatesTableSelectors.addTemplateButton).click()
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
        checkURLcontains('1/templates/new')
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(createTemplatePageSelectors.cancelPopupBackButton).click()
        cy.get(createTemplatePageSelectors.cancelPopupBackButton).should('not.be.visible')
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(createTemplatePageSelectors.cancelPopupYesButton).click()
        checkURLcontains('/setup')
        cy.get(templatesTableSelectors.addTemplateButton).click()
        createTemplate.selectUnitAndTemplate(0, 0)
        cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
        cy.get(createTemplatePageSelectors.didYouMeanToCloneMessage).should('contain.text', 'Did you mean to clone a template?')
        cy.get(createTemplatePageSelectors.backToTemplatesButton).click()
        checkURLcontains('/setup')
    });
});