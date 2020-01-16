export const headersList = '.ant-table-column-title'
export const addTemplateButton = '.ant-btn.ant-btn-primary.ant-btn-lg'
//export const entriesMatrix = '.ant-table-tbody > :nth-child(n) > :nth-child(n)'
export const TIDlist = '.ant-table-tbody > :nth-child(n) > :nth-child(1)'
export const nameList = '.ant-table-tbody > :nth-child(n) > :nth-child(2)'
export const unitList = '.ant-table-tbody > :nth-child(n) > :nth-child(3)'
export const sectionsShownList = '.ant-table-tbody > :nth-child(n) > :nth-child(4)'
export const paginationButtonsList = '.ant-pagination.ant-table-pagination > li'
export const sortingButtonsList = '.ant-table-column-sorter'

export function verifyEntryInTheTemplateTable(index, expectedEntry) {
    // cy.get(TIDlist).eq(index).should('have.text', expectedEntry[0])
    // cy.get(nameList).eq(index).should('have.text', expectedEntry[1])
    // cy.get(unitList).eq(index).should('have.text', expectedEntry[2])
    // cy.get(sectionsShownList).eq(index).should('have.text', expectedEntry[3])

    cy.get(TIDlist).eq(index).as('list1')
    cy.get(nameList).eq(index).as('list2')
    cy.get(unitList).eq(index).as('list3')
    cy.get(sectionsShownList).eq(index).as('list4')
    cy.get('@list1').should('have.text', expectedEntry[0])
    cy.get('@list2').should('have.text', expectedEntry[1])
    cy.get('@list3').should('have.text', expectedEntry[2])
    cy.get('@list4').should('have.text', expectedEntry[3])
}

export function selectPaginationButton(operation) {
    switch (operation) {
        case 'Previous page':
            return 0;
        case 'Next page':
            return 7;
        default:
            return operation
    }
}

export function sortTable(column) {
    switch (column) {
        case 'TID':
            return cy.get(sortingButtonsList).eq(0).click();
        case 'Name':
            return cy.get(sortingButtonsList).eq(1).click();
        case 'Unit':
            return cy.get(sortingButtonsList).eq(2).click();
        default:
            return "Column not found"
    }
}