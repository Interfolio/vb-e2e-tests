export const templateTablePageTitle = '.ant-typography'
export const headersList = '.ant-table-column-title'
export const templateNamelist = '.ant-table-tbody > :nth-child(n) > :nth-child(1)'
export const sourceTemplateList = '.ant-table-tbody > :nth-child(n) > :nth-child(2)'
export const unitList = '.ant-table-tbody > :nth-child(n) > :nth-child(3)'
export const sectionsShownList = '.ant-table-tbody > :nth-child(n) > :nth-child(4)'
export const editCloneAndArchiveButtonList = '.ant-table-tbody > :nth-child(n) > :nth-child(5)'
export const paginationButtonsList = '.ant-pagination.ant-table-pagination > li'
export const sortingButtonsList = '.ant-table-column-sorter'
export const addTemplateButton = '.full-width.ant-btn'
export const activeOrArchivedTab = '.ant-tabs-nav.ant-tabs-nav-animated'
export const searchBar = '.body-small.ant-input'
export const paginationDropdown = '.body-small .ant-select-selection'
export const paginationDropdownValues = '.ant-select-dropdown-menu-item'

export function verifyEntryInTheTemplateTable(index: number, expectedEntry: Array<number>) {
    cy.get(templateNamelist).eq(index).as('templateNamelist')
    cy.get(sourceTemplateList).eq(index).as('sourceTemplateList')
    cy.get(unitList).eq(index).as('unitList')
    cy.get(sectionsShownList).eq(index).as('sectionsShownList')
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
        cy.get(paginationButtonsList).eq(index).click()
    else {
        cy.get(paginationButtonsList).last().click()
    }
}
export function sortTableBy(column: string) {
    switch (column) {
        case 'Template Name':
            return cy.get(sortingButtonsList).eq(0).click();
        case 'Source Template':
            return cy.get(sortingButtonsList).eq(1).click();
        case 'Unit':
            return cy.get(sortingButtonsList).eq(2).click();
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

export function openAchivedTab() {
    cy.fixture('templatesTable.json').then((expectedValues) => {
        cy.get(templateNamelist, { timeout: 20000 }).eq(0).as('templateNamelist')
        cy.get('@templateNamelist').should('have.text', expectedValues.activeTableEntries[0][0])
        cy.get(activeOrArchivedTab).contains('Archived').click()
        cy.get(templateNamelist, { timeout: 20000 }).eq(0).as('templateNamelist')
        cy.get('@templateNamelist').should('have.text', expectedValues.achivedTableEntries[0][0])
    });
}

export function switchPaginationAndCheckDisplayedEntries(shownPerPage: number, numberOfPagesAvailable: number, numberOfDisplayedTemplates: number) {
    cy.get(paginationDropdown).click().get(paginationDropdownValues).eq(shownPerPage).click()
    cy.get(paginationButtonsList).should('have.length', numberOfPagesAvailable)
    cy.get(templateNamelist).should('have.length', numberOfDisplayedTemplates)
}