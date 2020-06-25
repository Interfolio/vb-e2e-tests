export const createVitaPageSelectors = {
    personalAndInstitutionalCheckBox: '.ant-radio-group',
    vitaNameField: 'input[placeholder="Enter Vita Name"]',
    vitaDescriptionField: 'textarea[placeholder="Add Description"]',
    fieldInError: 'ant-form-item-control has-error',
    unitDropdown: '.ng-tns-c16-13 > .ant-select-selection',
    templateDropdown: '.ng-tns-c16-15 > .ant-select-selection',
    dropdownOptions: '.ant-select-dropdown-menu-item',
    createVitaButton: 'button[type="submit"]',
    cancelVitaCreationButton: '.ant-row-flex > .ant-btn-default',
    uniqueNameError: '.ant-form-explain',
}

export function selectUnitAndTemplate(unitIndex: number, templateIndex: number) {
    cy.get(createVitaPageSelectors.unitDropdown).click().wait(1000)
    cy.get(createVitaPageSelectors.dropdownOptions).eq(0).click()
    cy.get(createVitaPageSelectors.templateDropdown).click().wait(1000)
    cy.get(createVitaPageSelectors.dropdownOptions).eq(0).click()
}