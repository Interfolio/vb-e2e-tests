export const viewVitaPageSelectors = {
    vitaName: '.m-b-small',
    vitaDescription: '.body-medium',
    templateName: 'div#fis-body-content h4',
    blueColoredButtons: '.ant-btn.ant-btn-primary',
    whiteColoredButtons: '.ant-btn.ant-btn-default',
    noBorderButtons: '.ant-btn.ant-btn-link',
    citationDropdown: '.ant-select-selection-selected-value',
    citationDropdownDisabled: 'ant-select-disabled',
    citationDropdownEnabled: 'ant-select-enabled',
}

export function clickOn(buttonText: string) {
    switch (buttonText) {
        case "Save":
            return cy.get(viewVitaPageSelectors.blueColoredButtons).contains(buttonText).click({ force: true });
        case "Refresh Vita":
            return cy.get(viewVitaPageSelectors.blueColoredButtons).contains(buttonText).click({ force: true });

        case "Back to Vitas":
            return cy.get(viewVitaPageSelectors.noBorderButtons).contains(buttonText).click({ force: true });

        case "Save As New Vita":
            return cy.get(viewVitaPageSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Export":
            return cy.get(viewVitaPageSelectors.whiteColoredButtons).contains(buttonText).click();
        default:
            return 'Button not found'
    }
}