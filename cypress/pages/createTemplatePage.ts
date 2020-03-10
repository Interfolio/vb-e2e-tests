import * as templatesTable from "../pages/templatesTable"
import { createUUID } from '../pages/helper';

export const activeStep = '.step-icon.ant-col.active'
export const selectUnitDropdown = 'nz-select[formcontrolname="unitId"]'
export const selectTemplateDropdown = 'nz-select[formcontrolname="baseTemplateId"]'
export const unitAndTemplateList = '.ant-select-dropdown-menu > :nth-child(n)'
export const nextStepOrCreateTemplateButton = '.ant-btn.ng-star-inserted'
export const vitaNameField = 'input[formcontrolname="name"]'
export const vitaDescriptionField = 'textarea[formcontrolname="description"]'
export const previousStepButton = '.previous-step-btn'
export const dropdownInError = '.ant-form-item-control.has-error'
const radioButtonOnState = 'ant-radio ant-radio-checked'
export const allRadioButtons = '.ant-radio-group'
const uncheckedRadioButtonList = 'label[class=ant-radio-wrapper]'
export const messageAlert = '.ant-alert.ng-trigger'
export const cancelTemplateCreationButton = '.ant-btn.ant-btn-default'
export const cancelPopupYesButton = '.ant-modal-confirm-btns > button.ant-btn.ng-star-inserted.ant-btn-primary'
export const cancelPopupBackButton = '.ant-modal-confirm-btns > button.ant-btn.ng-star-inserted.ant-btn-default'
export const uniqueNameError = '.ng-trigger'
export const didYouMeanToCloneMessage = '.info-text'
export const backToTemplatesButton = '.info-text-back-link'


export function selectUnitAndTemplate(unitIndex: number, templateIndex: number) {
    cy.get(selectUnitDropdown).click()
    cy.wait(2000)
    cy.get(unitAndTemplateList).eq(unitIndex).click()
    cy.get(selectTemplateDropdown).click()
    cy.wait(2000)
    cy.get(unitAndTemplateList).eq(templateIndex).click()
}

export function verifyFieldsAreRequiredAndErrorMessage() {
    cy.get(dropdownInError).eq(0).should('exist')
    cy.get(messageAlert).should('exist')
}

export function verifyRadioButtonState(firstRadioButton: boolean, secondRadioButton: boolean, thirdRadioButton: boolean, forthRadioButton: boolean, fifthRadioButton: boolean) {
    checkRadioButtonState(firstRadioButton, 0)
    checkRadioButtonState(secondRadioButton, 1)
    checkRadioButtonState(thirdRadioButton, 2)
    checkRadioButtonState(forthRadioButton, 3)
    checkRadioButtonState(fifthRadioButton, 4)
}

function checkRadioButtonState(radioButton: boolean, index: number) {
    if (radioButton) {
        cy.get(allRadioButtons).eq(index).children().eq(0).children().eq(0).should('not.have.class', radioButtonOnState)
        cy.get(allRadioButtons).eq(index).children().eq(1).children().eq(0).should('have.class', radioButtonOnState)
    } else {
        cy.get(allRadioButtons).eq(index).children().eq(0).children().eq(0).should('have.class', radioButtonOnState)
        cy.get(allRadioButtons).eq(index).children().eq(1).children().eq(0).should('not.have.class', radioButtonOnState)
    }
}

export function clickEachRadioButton() {
    cy.get(uncheckedRadioButtonList).click({ multiple: true })
}

export function createATemplate(unitIndexFromDropdown: number = 0, templateIndexFromDropdown: number = 0) {
    cy.get(templatesTable.addTemplateButton).click()
    selectUnitAndTemplate(unitIndexFromDropdown, templateIndexFromDropdown)
    cy.get(nextStepOrCreateTemplateButton).click()
    const UUID = createUUID()
    cy.get(vitaNameField).type('automated-' + UUID)
    cy.get(vitaDescriptionField).type('automated-' + UUID)
    cy.get(nextStepOrCreateTemplateButton).click()
}
