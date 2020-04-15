export const sidebarButtonsSelectors = {
    allRadioButtons: '.ant-switch-inner'
}

export function checkState(isOn: boolean, index: number) {
    if (isOn) {
        cy.get(sidebarButtonsSelectors.allRadioButtons).eq(index).should('have.text', 'On')
    } else {
        cy.get(sidebarButtonsSelectors.allRadioButtons).eq(index).should('have.text', 'Off')
    }
}

export function verifyStates(...radioButton: any[]) {
    radioButton.forEach((state, index) => {
        checkState(state, index);
    })
}

export function clickEachRadioButton() {
    cy.get(sidebarButtonsSelectors.allRadioButtons).click({ multiple: true })
}