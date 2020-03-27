export const templateStylingSidebarSelectors = {
    sidebarTitle: '.ant-col.ant-typography',
    displayStyleDropdown: 'nz-select[formcontrolname="display"]',
    citationDropdown: 'nz-select[formcontrolname="citation"]',
    fontFamilyDropdown: 'nz-select[formcontrolname="fontFamily"]',
    fontSizeDropdown: 'nz-select[formcontrolname="fontSize"]',
    spaceBeforeDropdown: 'nz-select[formcontrolname="spaceBefore"]',
    spaceAfterDropdown: 'nz-select[formcontrolname="spaceAfter"]',
    fontColorDropdown: 'nz-select[formcontrolname="fontColor"]',
    stylingOptionsList: '.anticon.m-r-small',
    dropdownOptions: '.ant-select-dropdown-menu-item'
}
export function selectAnOptionFromADropdown(dropdown: string, option: string) {
    cy.get(identifyDropdown(dropdown)).click()
    cy.get(templateStylingSidebarSelectors.dropdownOptions).contains(option).click()
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
        default:
            return "error"
    }
}
