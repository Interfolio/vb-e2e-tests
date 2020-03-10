export const sidebarTitle = '.ant-col.ant-typography'
export const vitaTemplateNameField = 'input[placeholder="Vita Name"]'
export const vitaTemplateDescriptionField = 'textarea[placeholder="Description"]'
export const archiveButton = '.m-l-small.ant-btn.ant-btn-danger'
export const YesArchivePopupButton = '.ant-btn.ng-star-inserted.ant-btn-danger'
export const blueColoredButtons = '.ant-btn.ant-btn-primary'
export const whiteColoredButtons = '.ant-btn.ant-btn-default'
export const noBorderButtons = '.ant-btn.ant-btn-link'
const radioButtonOnState = 'ant-radio ant-radio-checked'
export const allRadioButtons = '.ant-radio-group'
export const uncheckedRadioButtonList = 'label[class=ant-radio-wrapper]'
export const nameNotUniqueError = '.ant-form-explain'
export const fieldInError = 'ng-invalid'
export const toastErrorMessage = '.ant-alert-message'
export const dismissChangesPopup = '.ant-modal-confirm-content'
export const yesButtonFromPopup = '.ant-modal-confirm-btns .ant-btn.ng-star-inserted.ant-btn-primary'
export const cancelButtonFromPopup = '.ant-modal-confirm-btns .ant-btn.ng-star-inserted.ant-btn-default'



export function clickOn(buttonText: string) {
    switch (buttonText) {
        case "Apply Changes":
            return cy.get(blueColoredButtons).contains(buttonText).click({ force: true });
        case "Cancel":
            return cy.get(whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Close":
            return cy.get(noBorderButtons).contains(buttonText).click({ force: true });
        case "Archive":
            return cy.get(archiveButton).contains(buttonText).click({ force: true });
        default:
            return "Button not found"
    }
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

export function checkValidationWorks(field: string) {
    cy.get(field).clear()
    clickOn('Apply Changes')
    cy.get(field).should('have.class', fieldInError)
    cy.get(toastErrorMessage).should('be.visible')
    cy.get(field).clear().type('something')
    cy.get(field).should('not.have.class', fieldInError)
    cy.get(toastErrorMessage).should('not.be.visible')
}

export function verifyChangesAreNotLost(buttonText: string) {
    clickOn(buttonText)
    cy.get(dismissChangesPopup).should('be.visible').should('contain.text', 'dismiss changes')
    cy.get(cancelButtonFromPopup).click()
    cy.get(vitaTemplateNameField).invoke('val').then(text => expect(text).to.deep.equal('updated name'));
    cy.get(vitaTemplateDescriptionField).invoke('val').then(text => expect(text).to.deep.equal('updated description'));
}

export function verifyChangesAreDismissed(buttonText: string, initialName: string, initialDescription: string) {
    clickOn(buttonText)
    cy.get(yesButtonFromPopup).click()
    clickOn('Edit General Information')
    cy.get(vitaTemplateNameField).invoke('val').then(text => expect(text).to.deep.equal(initialName));
    cy.get(vitaTemplateDescriptionField).invoke('val').then(text => expect(text).to.deep.equal(initialDescription));
}