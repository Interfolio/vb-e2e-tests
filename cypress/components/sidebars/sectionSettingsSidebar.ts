import * as sidebarButtons from "../buttons/sidebarButtons"
import * as sectionsPage from "../pages/sectionsPage"

export const sectionSettingsSidebarSelectors = {
    sectionName: 'input[formcontrolname="name"]',
    sectionDescription: 'textarea[formcontrolname="description"]',
    displayStyleOptions: 'nz-select[formcontrolname="displayStyle"]',
    sortOrderOptions: 'nz-select[formcontrolname="activitySortOrder"]',
    numberingOptions: 'nz-select[formcontrolname="numbering"]',
    basedOnOptions: 'nz-select[formcontrolname="basedOn"]',
    showDescriptionCheckbox: 'label[formcontrolname="showDescription"]',
    displayLinkToAttachements: 'label[formcontrolname="showLinkToAttachments"]',
    dropdownOptionList: '.ant-select-dropdown-menu-item',
    checkBoxClass: 'ant-checkbox ant-checkbox-checked',
    editTableColumnsButton: '.edit-table-columns',
    tableColumnsList: ".m-b-tiny.cdk-drag:nth-child(n) .section",

    // shownOrHiddenButtonList: '.m-b-tiny.cdk-drag:nth-child(n) .section .ant-col.ant-col-7 .ant-btn.ng-star-inserted',
    // moveUpArrowList: '.m-b-tiny.cdk-drag:nth-child(n) .section .p-none.m-r-smaller.m-l-smaller',
    columnsList: '.m-b-tiny.cdk-drag:nth-child(n) .section'
}


export function modifyCommonFieldsOnSection(sectionArchetype: string, sectionName: string, sectionDescription: string, displayStyle: string) {
    sectionsPage.getHiddenSectionList().contains(sectionArchetype).parent().parent().parent().contains("Edit").click()
    sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
    cy.get(sectionSettingsSidebarSelectors.sectionName).clear().type(sectionName)
    cy.get(sectionSettingsSidebarSelectors.sectionDescription).clear().type(sectionDescription)
    cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).click()
    cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(displayStyle).click()
}

export function modifySortOrderBasedOnAndNumbering(sortOrder: string, basedOn: string, numbering: string) {
    cy.get(sectionSettingsSidebarSelectors.sortOrderOptions).click()
    cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(sortOrder).click()
    cy.get(sectionSettingsSidebarSelectors.basedOnOptions).click()
    cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(basedOn).click()
    cy.get(sectionSettingsSidebarSelectors.numberingOptions).click()
    cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(numbering).click()
}

// this function changes "Show Description" and "Display Link to Attachements" check boxes
export function modifyCheckboxes() {
    cy.get(sectionSettingsSidebarSelectors.showDescriptionCheckbox).click()
    cy.get(sectionSettingsSidebarSelectors.displayLinkToAttachements).click()
}

export function verifySortOrderBasedOnAndNumbering(sortOrder: string, basedOn: string, numbering: string) {
    cy.get(sectionSettingsSidebarSelectors.sortOrderOptions).should('contain.text', sortOrder)
    cy.get(sectionSettingsSidebarSelectors.basedOnOptions).should('contain.text', basedOn)
    cy.get(sectionSettingsSidebarSelectors.numberingOptions).should('contain.text', numbering)
}

// this function verifies the states of "Show Description" and "Display Link to Attachements" check boxes
export function verifyCheckboxes() {
    cy.get(sectionSettingsSidebarSelectors.showDescriptionCheckbox).children().eq(0).should('have.class', sectionSettingsSidebarSelectors.checkBoxClass)
    cy.get(sectionSettingsSidebarSelectors.displayLinkToAttachements).children().eq(0).should('not.have.class', sectionSettingsSidebarSelectors.checkBoxClass)
}

export function getColumnName(index: number) {
    return cy.get(sectionSettingsSidebarSelectors.columnsList).eq(index).children().eq(1).invoke('text')
}

export function makeNthColumnShownOrHidden(index: number) {
    return cy.get(sectionSettingsSidebarSelectors.columnsList).eq(index).children().eq(2).children().children().eq(0).click()
}

export function moveNthColumnUp(index: number) {
    return cy.get(sectionSettingsSidebarSelectors.columnsList).eq(index).children().eq(2).children().children().eq(1).click()
}

export function moveNthColumnDown(index: number) {
    return cy.get(sectionSettingsSidebarSelectors.columnsList).eq(index).children().eq(2).children().children().eq(2).click()
}

export function getNthColumnShownOrHiddenState(index: number) {
    return cy.get(sectionSettingsSidebarSelectors.columnsList).eq(index).children().eq(2).children().children().eq(0).children().eq(1).invoke('text')
}