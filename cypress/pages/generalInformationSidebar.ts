export const generalInformationSidebarSelectors = {
    sidebarTitle: '.ant-col.ant-typography',
    vitaTemplateNameField: 'input[placeholder="Vita Name"]',
    vitaTemplateDescriptionField: 'textarea[placeholder="Description"]',
    archiveButton: '.m-l-small.ant-btn.ant-btn-danger',
    YesArchivePopupButton: '.ant-btn.ng-star-inserted.ant-btn-danger',
    blueColoredButtons: '.ant-btn.ant-btn-primary',
    whiteColoredButtons: '.ant-btn.ant-btn-default',
    noBorderButtons: '.ant-btn.ant-btn-link',
    nameNotUniqueError: '.ant-form-explain',
    fieldInError: 'ng-invalid',
    toastErrorMessage: '.ant-alert-message',
    dismissChangesPopup: '.ant-modal-confirm-content',
    yesButtonFromPopup: '.ant-modal-confirm-btns .ant-btn.ng-star-inserted.ant-btn-primary',
    cancelButtonFromPopup: '.ant-modal-confirm-btns .ant-btn.ng-star-inserted.ant-btn-default'
}

export function clickOn(buttonText: string) {
    switch (buttonText) {
        case "Apply Changes":
            return cy.get(generalInformationSidebarSelectors.blueColoredButtons).contains(buttonText).click({ force: true });
        case "Cancel":
            return cy.get(generalInformationSidebarSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Close":
            return cy.get(generalInformationSidebarSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        case "Archive":
            return cy.get(generalInformationSidebarSelectors.archiveButton).contains(buttonText).click({ force: true });
        default:
            return "Button not found"
    }
}

export function checkValidationWorks(field: string) {
    cy.get(field).clear()
    clickOn('Apply Changes')
    cy.get(field).should('have.class', generalInformationSidebarSelectors.fieldInError)
    cy.get(generalInformationSidebarSelectors.toastErrorMessage).should('be.visible')
    cy.get(field).clear().type('something')
    cy.get(field).should('not.have.class', generalInformationSidebarSelectors.fieldInError)
    cy.get(generalInformationSidebarSelectors.toastErrorMessage).should('not.be.visible')
}

export function verifyChangesAreNotLost(buttonText: string) {
    clickOn(buttonText)
    cy.get(generalInformationSidebarSelectors.dismissChangesPopup).should('be.visible').should('contain.text', 'dismiss changes')
    cy.get(generalInformationSidebarSelectors.cancelButtonFromPopup).click()
    cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).invoke('val').then(text => expect(text).to.deep.equal('updated name'));
    cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).invoke('val').then(text => expect(text).to.deep.equal('updated description'));
}

export function verifyChangesAreDismissed(buttonText: string, initialName: string, initialDescription: string) {
    clickOn(buttonText)
    cy.get(generalInformationSidebarSelectors.yesButtonFromPopup).click()
    clickOn('Edit General Information')
    cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).invoke('val').then(text => expect(text).to.deep.equal(initialName));
    cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).invoke('val').then(text => expect(text).to.deep.equal(initialDescription));
}