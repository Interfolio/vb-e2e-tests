export const templateStylingSidebarSelectors = {
    sidebarTitle: '.ant-col.ant-typography',
    displayStyleDropdown: 'nz-select[formcontrolname="display"]',
    citationDropdown: 'nz-select[formcontrolname="citation"]',
    fontFamilyDropdown: 'nz-select[formcontrolname="fontFamily"]',
    fontSizeDropdown: 'nz-select[formcontrolname="fontSize"]',
    spaceBeforeDropdown: 'nz-select[formcontrolname="spaceBefore"]',
    spaceAfterDropdown: 'nz-select[formcontrolname="spaceAfter"]',
    fontColorDropdown: 'nz-select[formcontrolname="fontColor"]',
    borderPlacementDropdown: 'nz-select[formcontrolname="borderPlacement"]',
    borderWidthDropdown: 'nz-select[formcontrolname="borderWidth"]',
    dropdownOptions: '.ant-select-dropdown-menu-item',
    toastMessage: '.ant-alert.ng-trigger',
    stylingOptionList: '.anticon.m-r-small:visible',
    selectedStylingOption: 'ng-star-inserted active',
    tabsList: '.ant-tabs-tab.ng-star-inserted',
    headingsList: '.ant-collapse-header',
    stylingOptionsBar: '.fontstyle-selector-container'
}

export function selectAnOptionFromADropdown(dropdown: string, option: string) {
    cy.get(identifyDropdown(dropdown)).filter(':visible').click()
    cy.get(templateStylingSidebarSelectors.dropdownOptions).contains(option).click()
}

export function selectOptionsFromDropdown(expectedValues: string[]) {
    selectAnOptionFromADropdown('Font Family', expectedValues[0])
    selectAnOptionFromADropdown('Font Size', expectedValues[1])
    selectAnOptionFromADropdown('Font Color', expectedValues[2])
    selectAnOptionFromADropdown('Space Before', expectedValues[3])
    selectAnOptionFromADropdown('Space After', expectedValues[4])
}

export function selectExtraOptionsFromHeadingDropdown(expectedValues: string[]) {
    selectAnOptionFromADropdown('Border Placement', expectedValues[0])
    selectAnOptionFromADropdown('Border Width', expectedValues[1])
}

export function verifyOptionsFromDropdown(expectedValues: string[]) {
    cy.get(templateStylingSidebarSelectors.fontFamilyDropdown).should('contain.text', expectedValues[0])
    cy.get(templateStylingSidebarSelectors.fontSizeDropdown).should('contain.text', expectedValues[1])
    cy.get(templateStylingSidebarSelectors.fontColorDropdown).should('contain.text', expectedValues[2])
    cy.get(templateStylingSidebarSelectors.spaceBeforeDropdown).should('contain.text', expectedValues[3])
    cy.get(templateStylingSidebarSelectors.spaceAfterDropdown).should('contain.text', expectedValues[4])
}

export function verifyHeadingOptionsFromDropdown(expectedValues: string[]) {
    cy.get(templateStylingSidebarSelectors.borderPlacementDropdown).should('contain.text', expectedValues[0])
    cy.get(templateStylingSidebarSelectors.borderWidthDropdown).should('contain.text', expectedValues[1])
}

function identifyDropdown(dropdownName: string) {
    switch (dropdownName) {
        case "Display Style":
            return templateStylingSidebarSelectors.displayStyleDropdown
        case "Citation Style":
            return templateStylingSidebarSelectors.citationDropdown
        case "Font Family":
            return templateStylingSidebarSelectors.fontFamilyDropdown
        case "Font Size":
            return templateStylingSidebarSelectors.fontSizeDropdown
        case "Space Before":
            return templateStylingSidebarSelectors.spaceBeforeDropdown
        case "Space After":
            return templateStylingSidebarSelectors.spaceAfterDropdown
        case "Font Color":
            return templateStylingSidebarSelectors.fontColorDropdown
        case "Border Placement":
            return templateStylingSidebarSelectors.borderPlacementDropdown
        case "Border Width":
            return templateStylingSidebarSelectors.borderWidthDropdown
        default:
            return "error"
    }
}
export function selectStylingOptions(...stylingOptions: string[]) {
    stylingOptions.forEach((stylingOption) => {
        selectStylingOption(stylingOption)
    });
}

export function selectStylingOption(styling: string) {
    let index = createStylingMap().get(styling)
    if (index == undefined) {
        index = 999;
    }
    cy.get(templateStylingSidebarSelectors.stylingOptionList).filter(':visible').eq(index).click();
}

export function verifyStylingOptionsAreSelected(...selectedOptions: string[]) {
    // the element looses its active class, the next forEach is for double clicking each selected option to refresh the class of the element
    selectedOptions.forEach((option) => {
        selectStylingOptions(option)
        selectStylingOptions(option)
    });
    createStylingMap().forEach((key, value) => {
        if (selectedOptions.indexOf(value) > -1) {
            cy.get(templateStylingSidebarSelectors.stylingOptionsBar).filter(':visible').children().eq(key).invoke('attr', 'class').should('contain', templateStylingSidebarSelectors.selectedStylingOption)
        } else {
            cy.get(templateStylingSidebarSelectors.stylingOptionsBar).filter(':visible').children().eq(key).invoke('attr', 'class').should('not.contain', templateStylingSidebarSelectors.selectedStylingOption)
        }
    });
}

export function verifyDisplayStyleChangesAreDiscarded(...selectedOptions: string[]) {
    // the element looses its active class, the next forEach is for double clicking each selected option to refresh the class of the element
    selectedOptions.forEach((option) => {
        selectStylingOptions(option)
        selectStylingOptions(option)
    });
    selectedOptions.forEach((element) => {
        let index = createStylingMap().get(element)
        if (index == undefined) {
            index = 999;
        }
        cy.get(templateStylingSidebarSelectors.stylingOptionsBar).filter(':visible').children().eq(index)
            .invoke('attr', 'class').should('not.contain', templateStylingSidebarSelectors.selectedStylingOption)
    });
}

function createStylingMap() {
    const stylingMap = new Map<string, number>();
    stylingMap.set('Bold', 0);
    stylingMap.set('Italic', 1);
    stylingMap.set('Underline', 2);
    stylingMap.set('Align Left', 3);
    stylingMap.set('Align Center', 4);
    stylingMap.set('Align Right', 5);
    stylingMap.set('Justify', 6);
    return stylingMap
}