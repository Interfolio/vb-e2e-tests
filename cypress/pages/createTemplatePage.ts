import { templatesTableSelectors } from "../pages/templatesTable"
import { createUUID } from '../pages/helper';

export const createTemplatePageSelectors = {
    activeStep: '.step-icon.ant-col.active',
    selectUnitDropdown: 'nz-select[formcontrolname="unitId"]',
    selectTemplateDropdown: 'nz-select[formcontrolname="baseTemplateId"]',
    unitAndTemplateList: '.ant-select-dropdown-menu > :nth-child(n)',
    nextStepOrCreateTemplateButton: '.ant-btn.ng-star-inserted',
    vitaNameField: 'input[formcontrolname="name"]',
    vitaDescriptionField: 'textarea[formcontrolname="description"]',
    previousStepButton: '.previous-step-btn',
    dropdownInError: '.ant-form-item-control.has-error',
    messageAlert: '.ant-alert.ng-trigger',
    cancelTemplateCreationButton: '.ant-btn.ant-btn-default',
    cancelPopupYesButton: '.ant-modal-confirm-btns > button.ant-btn.ng-star-inserted.ant-btn-primary',
    cancelPopupBackButton: '.ant-modal-confirm-btns > button.ant-btn.ng-star-inserted.ant-btn-default',
    uniqueNameError: '.ng-trigger',
    didYouMeanToCloneMessage: '.info-text',
    backToTemplatesButton: '.info-text-back-link'
}

export function selectUnitAndTemplate(unitIndex: number, templateIndex: number) {
    cy.get(createTemplatePageSelectors.selectUnitDropdown).click()
    cy.wait(2000)
    cy.get(createTemplatePageSelectors.unitAndTemplateList).eq(unitIndex).click()
    cy.get(createTemplatePageSelectors.selectTemplateDropdown).click()
    cy.wait(2000)
    cy.get(createTemplatePageSelectors.unitAndTemplateList).eq(templateIndex).click()
}

export function verifyFieldsAreRequiredAndErrorMessage() {
    cy.get(createTemplatePageSelectors.dropdownInError).eq(0).should('exist')
    cy.get(createTemplatePageSelectors.messageAlert).should('exist')
}

export function createATemplate(unitIndexFromDropdown: number = 0, templateIndexFromDropdown: number = 0) {
    cy.get(templatesTableSelectors.addTemplateButton).click()
    selectUnitAndTemplate(unitIndexFromDropdown, templateIndexFromDropdown)
    cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
    const UUID = createUUID()
    cy.get(createTemplatePageSelectors.vitaNameField).type('automated-' + UUID)
    cy.get(createTemplatePageSelectors.vitaDescriptionField).type('automated-' + UUID)
    cy.get(createTemplatePageSelectors.nextStepOrCreateTemplateButton).click()
}
