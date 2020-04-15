import * as sidebarButtons from "../buttons/sidebarButtons"
import * as sectionsPage from "../pages/sectionsPage"
import { popupButtonsSelectors } from '../buttons/popupButtons';

export const generalInformationSidebarSelectors = {
    sidebarTitle: '.ant-col.ant-typography',
    vitaTemplateNameField: 'input[placeholder="Vita Name"]',
    vitaTemplateDescriptionField: 'textarea[placeholder="Description"]',
    nameNotUniqueError: '.ant-form-explain',
    fieldInError: 'ng-invalid',
    toastErrorMessage: '.ant-alert-message',
}

export function checkValidationWorks(field: string) {
    cy.get(field).clear()
    sidebarButtons.clickOn('Apply Changes')
    cy.get(field).should('have.class', generalInformationSidebarSelectors.fieldInError)
    cy.get(generalInformationSidebarSelectors.toastErrorMessage).should('be.visible')
    cy.get(field).clear().type('something')
    cy.get(field).should('not.have.class', generalInformationSidebarSelectors.fieldInError)
    cy.get(generalInformationSidebarSelectors.toastErrorMessage).should('not.be.visible')
}

export function verifyChangesAreNotLost(buttonText: string) {
    sidebarButtons.clickOn(buttonText)
    cy.get(popupButtonsSelectors.cancelButton).click()
    cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).invoke('val').then(text => expect(text).to.deep.equal('updated name'));
    cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).invoke('val').then(text => expect(text).to.deep.equal('updated description'));
}

export function verifyChangesAreDismissed(buttonText: string, initialName: string, initialDescription: string) {
    sidebarButtons.clickOn(buttonText)
    cy.get(popupButtonsSelectors.yesButton).click()
    sectionsPage.clickOn('Edit General Information')
    cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).invoke('val').then(text => expect(text).to.deep.equal(initialName));
    cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).invoke('val').then(text => expect(text).to.deep.equal(initialDescription));
}