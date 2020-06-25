import { templatesTableSelectors } from "./templatesTablePage"
import { createUUID } from '../helper';

export const createTemplatePageSelectors = {
    activeStep: '.step-icon.ant-col.active',
    sourceUnitDropdown: 'nz-select[formcontrolname="sourceUnitId"]',
    templateDropdown: 'nz-select[formcontrolname="baseTemplateId"]',
    destinationUnit: 'nz-select[formcontrolname="destinationUnitId"]',
    dropdownValuesList: '.ant-select-dropdown-menu > :nth-child(n)',
    nextStepOrCreateTemplateButton: '.ant-btn.ng-star-inserted',
    vitaNameField: 'input[formcontrolname="name"]',
    vitaDescriptionField: 'textarea[formcontrolname="description"]',
    previousStepButton: '.previous-step-btn',
    dropdownInError: '.ant-form-item-control.has-error',
    messageAlert: '.ant-alert.ng-trigger',
    cancelTemplateCreationButton: '.ant-btn.ant-btn-default',
    uniqueNameError: '.ng-trigger',
    didYouMeanToCloneMessage: '.info-text',
    backToTemplatesButton: '.info-text-back-link',
}

export function selectUnitAndTemplate(sourceUnitIndex: number, templateIndex: number, destinationUnitIndex: number) {
    cy.get(createTemplatePageSelectors.sourceUnitDropdown).click()
    cy.wait(2000)
    cy.get(createTemplatePageSelectors.dropdownValuesList).eq(sourceUnitIndex).click()
    cy.get(createTemplatePageSelectors.templateDropdown).click()
    cy.wait(2000)
    cy.get(createTemplatePageSelectors.dropdownValuesList).eq(templateIndex).click()
    cy.get(createTemplatePageSelectors.destinationUnit).click()
    cy.wait(2000)
    cy.get(createTemplatePageSelectors.dropdownValuesList).eq(destinationUnitIndex).click()
}

export function verifyFieldsAreRequiredAndErrorMessage() {
    cy.get(createTemplatePageSelectors.dropdownInError).eq(0).should('exist')
    cy.get(createTemplatePageSelectors.messageAlert).should('exist')
}

export function createATemplate(sourceUnitIndex: number = 0, templateIndex: number = 0, destinationUnitIndex: number = 0) {
    cy.get(templatesTableSelectors.addTemplateButton).click()
    selectUnitAndTemplate(sourceUnitIndex, templateIndex, destinationUnitIndex)
    cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
    const UUID = createUUID()
    cy.get(createTemplatePageSelectors.vitaNameField).type('automated-' + UUID)
    cy.get(createTemplatePageSelectors.vitaDescriptionField).type('automated-' + UUID)
    cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
}