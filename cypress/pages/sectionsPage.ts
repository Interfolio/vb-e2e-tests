export const sectionsPageSelectors = {
    blueColoredButtons: '.ant-btn.ant-btn-primary',
    whiteColoredButtons: '.ant-btn.ant-btn-default',
    noBorderButtons: '.ant-btn.ant-btn-link',//'.ant-btn.ng-star-inserted.ant-btn-link'
    sectionPageTitle: '.ant-typography',
    temporaryNameAndDescription: '.template-editor'
}

export function clickOn(buttonText: string) {
    switch (buttonText) {
        case "Save":
            return cy.get(sectionsPageSelectors.blueColoredButtons).contains(buttonText).click({ force: true });

        case "Export":
            return cy.get(sectionsPageSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Preview":
            return cy.get(sectionsPageSelectors.whiteColoredButtons).contains(buttonText).click();
        case "Cancel":
            return cy.get(sectionsPageSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Reorder All Sections":
            return cy.get(sectionsPageSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });

        case "Edit General Information":
            return cy.get(sectionsPageSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        case "Edit Template Styling":
            return cy.get(sectionsPageSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        default:
            return "Button not found"
    }
}
