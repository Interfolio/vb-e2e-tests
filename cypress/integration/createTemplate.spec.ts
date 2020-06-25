import * as createTemplate from "../components/pages/createTemplatePage"
import { appCookies, createUUID, checkURLcontains } from '../components/helper';
import * as sectionsPage from "../components/pages/sectionsPage"
import { templatesTableSelectors } from "../components/pages/templatesTablePage"
import * as radioButton from "../components/buttons/radioButton"
import { sectionsPageSelectors } from "../components/pages/sectionsPage"
import { createTemplatePageSelectors } from "../components/pages/createTemplatePage"
import { popupButtonsSelectors } from '../components/buttons/popupButtons'

describe('Create template tests', () => {

    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('templates/institutional')
        checkURLcontains('templates/institutional', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(templatesTableSelectors.headersList, { timeout: 10000 }).each(($el, index) => expect($el.get(0).innerText).to.contain(expectedValues.tableHeaders[index]))
        });
    });

    it('Create basic template and verify required fields', () => {
        cy.get(templatesTableSelectors.addTemplateButton).click()
        // create template page 1
        cy.get(createTemplatePageSelectors.activeStep).should('have.text', '1')
        cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).as('nextStepOrCreateTemplateButton')
        cy.get('@nextStepOrCreateTemplateButton').click()
        createTemplate.verifyFieldsAreRequiredAndErrorMessage()
        createTemplate.selectUnitAndTemplate(1, 1, 1)
        cy.get('@nextStepOrCreateTemplateButton').click()
        //create template page 2
        cy.get(createTemplatePageSelectors.activeStep).should('have.text', ' 2 ')
        cy.get('@nextStepOrCreateTemplateButton').click()
        createTemplate.verifyFieldsAreRequiredAndErrorMessage()
        radioButton.verifyStates(false, true, false, true, true)
        const UUID = createUUID()
        cy.get(createTemplatePageSelectors.vitaDescriptionField).type('automated-' + UUID)
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(createTemplatePageSelectors.vitaNameField).type(expectedValues.activeTableEntries[1][0])
        });
        cy.get('@nextStepOrCreateTemplateButton').click()
        cy.get(createTemplatePageSelectors.uniqueNameError).should('contain', 'Validation failed: Name should be unique.')
        cy.get(createTemplatePageSelectors.vitaNameField).clear().type('automated-' + UUID)
        radioButton.clickEachRadioButton()
        cy.get(createTemplatePageSelectors.previousStepButton).click()
        cy.get(createTemplatePageSelectors.sourceUnitDropdown).should('not.be.empty')
        cy.get(createTemplatePageSelectors.templateDropdown).should('not.be.empty')
        cy.get(createTemplatePageSelectors.destinationUnit).should('not.be.empty')
        cy.get('@nextStepOrCreateTemplateButton').click()
        radioButton.verifyStates(true, false, true, false, false)
        cy.get('@nextStepOrCreateTemplateButton').click()
        checkURLcontains('/edit', 20000)
        cy.get(sectionsPageSelectors.sectionPageTitle).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit General Information')
        radioButton.verifyStates(true, false, true, false, false)
    });

    it('Verify cancel template creation works and popup is displayed', () => {
        cy.get(templatesTableSelectors.addTemplateButton).click()
        checkURLcontains('/templates/new', 1000)
        createTemplate.selectUnitAndTemplate(0, 0, 0)
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(popupButtonsSelectors.cancelButton).click()
        cy.get(createTemplatePageSelectors.sourceUnitDropdown).should('not.be.empty')
        cy.get(createTemplatePageSelectors.templateDropdown).should('not.be.empty')
        cy.get(createTemplatePageSelectors.destinationUnit).should('not.be.empty')
        cy.get(popupButtonsSelectors.cancelButton).should('not.be.visible')
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(popupButtonsSelectors.yesButton).click()
        checkURLcontains('/templates')
        cy.get(templatesTableSelectors.addTemplateButton).click()
        cy.get(createTemplatePageSelectors.didYouMeanToCloneMessage).should('contain.text', 'Did you mean to clone a template?')
        cy.get(createTemplatePageSelectors.didYouMeanToCloneMessage).click()
        checkURLcontains('/templates')
        cy.get(templatesTableSelectors.addTemplateButton).click()
        createTemplate.selectUnitAndTemplate(0, 0, 0)
        cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
        checkURLcontains('/templates/new')
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(popupButtonsSelectors.cancelButton).click()
        cy.get(popupButtonsSelectors.cancelButton).should('not.be.visible')
        cy.get(createTemplatePageSelectors.cancelTemplateCreationButton).click()
        cy.get(popupButtonsSelectors.yesButton).click()
        checkURLcontains('/templates')
        cy.get(templatesTableSelectors.addTemplateButton).click()
        createTemplate.selectUnitAndTemplate(0, 0, 0)
        cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
        cy.get(createTemplatePageSelectors.didYouMeanToCloneMessage).should('contain.text', 'Did you mean to clone a template?')
        cy.get(createTemplatePageSelectors.backToTemplatesButton).click()
        checkURLcontains('/templates')
    });
});