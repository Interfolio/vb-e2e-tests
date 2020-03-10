export const blueColoredButtons = '.ant-btn.ant-btn-primary'
export const whiteColoredButtons = '.ant-btn.ant-btn-default'
export const noBorderButtons = '.ant-btn.ant-btn-link'//'.ant-btn.ng-star-inserted.ant-btn-link'
export const sectionPageTitle = '.ant-typography'

export const temporaryNameAndDescription = '.template-editor'


export function clickOn(buttonText: string) {
    switch (buttonText) {
        case "Save":
            return cy.get(blueColoredButtons).contains(buttonText).click({ force: true });

        case "Export":
            return cy.get(whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Preview":
            return cy.get(whiteColoredButtons).contains(buttonText).click();
        case "Cancel":
            return cy.get(whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Reorder All Sections":
            return cy.get(whiteColoredButtons).contains(buttonText).click({ force: true });

        case "Edit General Information":
            return cy.get(noBorderButtons).contains(buttonText).click({ force: true });
        case "Edit Template Styling":
            return cy.get(noBorderButtons).contains(buttonText).click({ force: true });
        default:
            return "Button not found"
    }
}
