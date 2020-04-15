export const sectionsPageSelectors = {
    blueColoredButtons: '.ant-btn.ant-btn-primary',
    whiteColoredButtons: '.ant-btn.ant-btn-default',
    noBorderButtons: '.ant-btn.ant-btn-link',
    sectionPageTitle: '.ant-typography',
    templateName: '.ant-row-flex-bottom > .ant-col-7 > h1',
    templateDescription: '.ant-row-flex-bottom > .ant-col-7 > div',
    shownOrHiddenSectionList: '.m-b-large.section-list',
    moveSectionUpButton: '.up-button.ant-btn.ant-btn-link',
    moveSectionDownButton: '.down-button.ant-btn.ant-btn-link',
    shownOrHiddenSectionsCount: '.body-medium.m-b-small',
    showOrHideSectionButton: '.ant-btn.ng-star-inserted',
}

export function clickOn(buttonText: string) {
    switch (buttonText) {
        case "Save":
            return cy.get(sectionsPageSelectors.blueColoredButtons).contains(buttonText).click({ force: true });

        case "Export":
            return cy.get(sectionsPageSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });
        case "Preview":
            return cy.get(sectionsPageSelectors.whiteColoredButtons).contains(buttonText).click();
        case "Reorder All Sections":
            return cy.get(sectionsPageSelectors.whiteColoredButtons).contains(buttonText).click({ force: true });

        case "Back":
            return cy.get(sectionsPageSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        case "Edit General Information":
            return cy.get(sectionsPageSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        case "Edit Template Styling":
            return cy.get(sectionsPageSelectors.noBorderButtons).contains(buttonText).click({ force: true });
        default:
            return "Button not found"
    }
}

export function getNumberOfSections(text: string): any {
    const startI = text.indexOf("(") + 1
    const endI = text.indexOf(")")
    return +text.substring(startI, endI)
}

export function getShownSectionList() {
    return cy.get(sectionsPageSelectors.shownOrHiddenSectionList).eq(0).children()
}

export function getHiddenSectionList() {
    return cy.get(sectionsPageSelectors.shownOrHiddenSectionList).eq(1).children()
}