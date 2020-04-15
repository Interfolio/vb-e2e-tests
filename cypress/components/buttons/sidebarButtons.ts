export const sidebarButtonsSelectors = {
    blueColoredButtons: '.ant-btn.ant-btn-primary',
    whiteColoredButtons: '.ant-btn.ant-btn-default',
    noBorderButtons: '.sidebar-header .ant-btn.ant-btn-link',
    archiveButton: '.m-l-small.ant-btn.ant-btn-danger',
    editSectionSidebarButtons: '.details',
}
export function clickOn(buttonText: string) {
    switch (buttonText) {
        case "Apply Changes":
            return cy.get(sidebarButtonsSelectors.blueColoredButtons).contains(buttonText).click({ force: true });
        case "Cancel":
            return cy.get(sidebarButtonsSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Close":
            return cy.get(sidebarButtonsSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        case "Archive":
            return cy.get(sidebarButtonsSelectors.archiveButton).contains(buttonText).click({ force: true });
        case "Back":
            return cy.get(sidebarButtonsSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        default:
            return "Button not found"
    }
}

export function clickOnEditSectionSiderbarButton(buttonText: string) {
    return cy.get(sidebarButtonsSelectors.editSectionSidebarButtons).contains(buttonText).click({ force: true });
}