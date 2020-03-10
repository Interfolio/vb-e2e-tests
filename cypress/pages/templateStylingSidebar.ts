export const sidebarTitle = '.ant-col.ant-typography'
export const displayStyleDropdown = 'nz-select[formcontrolname="display"]'
export const citationDropdown = 'nz-select[formcontrolname="citation"]'
export const fontFamilyDropdown = 'nz-select[formcontrolname="fontFamily"]'
export const fontSizeDropdown = 'nz-select[formcontrolname="fontSize"]'
export const spaceBeforeDropdown = 'nz-select[formcontrolname="spaceBefore"]'
export const spaceAfterDropdown = 'nz-select[formcontrolname="spaceAfter"]'
export const fontColorDropdown = 'nz-select[formcontrolname="fontColor"]'
export const stylingOptionsList = '.anticon.m-r-small'
export const dropdownOptions = '.ant-select-dropdown-menu-item'

export function selectAnOptionFromADropdown(dropdown: string, option: string) {
    cy.get(identifyDropdown(dropdown)).click()
    cy.get(dropdownOptions).contains(option).click()
}

function identifyDropdown(dropdownName: string) {
    switch (dropdownName) {
        case "Display Style":
            return displayStyleDropdown
        case "Citation Style":
            return citationDropdown
        case "Font Family":
            return fontFamilyDropdown
        case "Font Size":
            return fontSizeDropdown
        case "Space Before":
            return spaceBeforeDropdown
        case "Space After":
            return spaceAfterDropdown
        case "Font Color":
            return fontColorDropdown
        default:
            return "error"
    }
}
