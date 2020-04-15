export const templatesTableSelectors = {
    templateTablePageTitle: '.ant-typography',
    headersList: '.ant-table-column-title',
    templateNamelist: '.ant-table-tbody > :nth-child(n) > :nth-child(1)',
    sourceTemplateList: '.ant-table-tbody > :nth-child(n) > :nth-child(2)',
    unitList: '.ant-table-tbody > :nth-child(n) > :nth-child(3)',
    sectionsShownList: '.ant-table-tbody > :nth-child(n) > :nth-child(4)',
    editCloneAndArchiveButtonList: '.ant-table-tbody > :nth-child(n) > :nth-child(5)',
    paginationButtonsList: '.ant-pagination.ant-table-pagination > li',
    sortingButtonsList: '.ant-table-column-sorter',
    addTemplateButton: '.full-width.ant-btn',
    activeOrArchivedTab: '.ant-tabs-nav.ant-tabs-nav-animated',
    searchBar: '.body-small.ant-input',
    paginationDropdown: '.body-small .ant-select-selection',
    paginationDropdownValues: '.ant-select-dropdown-menu-item',
    unitDropdown: 'div#fis-body-content span > nz-select > div > div',
    unitDropdownValues: '.ant-select-dropdown-menu-item.ng-star-inserted',
    excludeSubunitsCheckbox: '.m-l-large',
}

export function verifyEntryInTheTemplateTable(index: number, expectedEntry: Array<number>) {
    cy.get(templatesTableSelectors.templateNamelist).eq(index).as('templateNamelist')
    cy.get(templatesTableSelectors.sourceTemplateList).eq(index).as('sourceTemplateList')
    cy.get(templatesTableSelectors.unitList).eq(index).as('unitList')
    cy.get(templatesTableSelectors.sectionsShownList).eq(index).as('sectionsShownList')
    cy.get('@templateNamelist').should('contain.text', expectedEntry[0])
    cy.get('@sourceTemplateList').should('contain.text', expectedEntry[1])
    cy.get('@unitList').should('contain.text', expectedEntry[2])
    cy.get('@sectionsShownList').should('contain.text', expectedEntry[3])
}

export function clickOnPage(page: string) {
    switch (page) {
        case "Previous Page":
            return selectPage(0);
        case "Next Page":
            return selectPage(999);
        default:
            return selectPage(+page)
    }
}

function selectPage(index: number) {
    if (index != 999)
        cy.get(templatesTableSelectors.paginationButtonsList).eq(index).click()
    else {
        cy.get(templatesTableSelectors.paginationButtonsList).last().click()
    }
}

export function sortTableBy(column: string) {
    switch (column) {
        case 'Template Name':
            return cy.get(templatesTableSelectors.sortingButtonsList).eq(0).click();
        case 'Source Template':
            return cy.get(templatesTableSelectors.sortingButtonsList).eq(1).click();
        case 'Unit':
            return cy.get(templatesTableSelectors.sortingButtonsList).eq(2).click();
        default:
            return "Column not found"
    }
}

export function verifySort(sortTableTerm: string, expectedEntriesAfterSort: Array<number>) {
    sortTableBy(sortTableTerm)
    verifyEntryInTheTemplateTable(0, expectedEntriesAfterSort)
}

export function verifyPagination(pageToSelect: string, expectedEntriesAfterPageSwitch: Array<number>) {
    clickOnPage(pageToSelect)
    verifyEntryInTheTemplateTable(0, expectedEntriesAfterPageSwitch)
}

export function switchPaginationAndCheckDisplayedEntries(shownPerPage: number, numberOfPagesAvailable: number, numberOfDisplayedTemplates: number) {
    cy.get(templatesTableSelectors.paginationDropdown).click().get(templatesTableSelectors.paginationDropdownValues).eq(shownPerPage).click()
    cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', numberOfPagesAvailable)
    cy.get(templatesTableSelectors.templateNamelist).should('have.length', numberOfDisplayedTemplates)
}