export const vitaTablePageSelectors = {
    vitaTablePageTitle: '.m-t-regular.m-b-small',
    addVitaButton: '.m-r-large.ant-btn',
    vitaNamelist: '.ant-table-tbody > :nth-child(n) > :nth-child(1)',
    templateList: '.ant-table-tbody > :nth-child(n) > :nth-child(2)',
    unitList: '.ant-table-tbody > :nth-child(n) > :nth-child(3)',
    archivedTabVitaNameList: '.ant-table-tbody > :nth-child(n) > :nth-child(1)',
    archivedTabTypeList: '.ant-table-tbody > :nth-child(n) > :nth-child(2)',
    archivedTabTemplateList: '.ant-table-tbody > :nth-child(n) > :nth-child(3)',
    archivedTabUnitList: '.ant-table-tbody > :nth-child(n) > :nth-child(4)',
    searchBar: '.body-small.ant-input',
    personalInstitutionalorArchivedTab: '.ant-tabs-nav.ant-tabs-nav-animated',
    sortingButtonsList: '.ant-table-column-sorter',
    paginationButtonsList: '.ant-pagination.ant-table-pagination > li',
    shownPerPageDropdown: '.body-small .ant-select-selection',
    shownPerPageDropdownValues: '.ant-select-dropdown-menu-item',
    vitaTypeTabs: '.ant-tabs-tab',
    vitaTypeDropdown: 'div#fis-body-content vb-select-filter',
    vitaTypeDropdownOptions: '.ant-select-dropdown-menu-item',
}

export function sortTableBy(vitaTab: string, column: string) {
    switch (column) {
        // columns index order 
        // personal:      0 = Vita Name ; 1 = Template
        // institutional: 0 = Vita Name ; 1 = Template ; 2 = Unit
        // archived:      0 = Vita Name ; 1 = Type     ; 2 = Template ;  3 = Unit
        case 'Vita Name':
            return cy.get(vitaTablePageSelectors.sortingButtonsList).eq(0).click();
        case 'Template':
            if (vitaTab == 'Personal' || vitaTab == 'Institutional')
                return cy.get(vitaTablePageSelectors.sortingButtonsList).eq(1).click();
            else
                return cy.get(vitaTablePageSelectors.sortingButtonsList).eq(2).click();
        case 'Unit':
            if (vitaTab == 'Institutional')
                return cy.get(vitaTablePageSelectors.sortingButtonsList).eq(2).click();
            else
                return cy.get(vitaTablePageSelectors.sortingButtonsList).eq(3).click();
        case 'Type':
            return cy.get(vitaTablePageSelectors.sortingButtonsList).eq(1).click();
        default:
            return "Column not found"
    }
}

export function verifyFirstEntryInTheVitaTable(vitaTab: string, expectedEntry: Array<number>) {
    if (vitaTab == 'Personal' || 'Institutional') {
        cy.get(vitaTablePageSelectors.vitaNamelist).eq(0).as('vitaName')
        cy.get(vitaTablePageSelectors.templateList).eq(0).as('template')
        cy.get('@vitaName').should('contain.text', expectedEntry[0])
        cy.get('@template').should('contain.text', expectedEntry[1])
    }
    if (vitaTab == 'Institutional') {
        cy.get(vitaTablePageSelectors.unitList).eq(0).as('unit')
        cy.get('@unit').should('contain.text', expectedEntry[2])
    }
    if (vitaTab == 'Archived') {
        cy.get(vitaTablePageSelectors.archivedTabVitaNameList).eq(0).as('vitaName')
        cy.get(vitaTablePageSelectors.archivedTabTypeList).eq(0).as('typeList')
        cy.get(vitaTablePageSelectors.archivedTabTemplateList).eq(0).as('templateList')
        cy.get(vitaTablePageSelectors.archivedTabUnitList).eq(0).as('unitList')
        cy.get('@vitaName').should('contain.text', expectedEntry[0])
        cy.get('@typeList').should('contain.text', expectedEntry[1])
        cy.get('@templateList').should('contain.text', expectedEntry[2])
        cy.get('@unitList').should('contain.text', expectedEntry[3])
    }
}

export function navigateToPage(pageToSelect: string) {
    switch (pageToSelect) {
        case "Previous Page":
            return selectPage(0);
        case "Next Page":
            return selectPage(999);
        default:
            return selectPage(+pageToSelect)
    }
}

function selectPage(index: number) {
    if (index != 999)
        cy.get(vitaTablePageSelectors.paginationButtonsList).eq(index).click()
    else {
        cy.get(vitaTablePageSelectors.paginationButtonsList).last().click()
    }
}