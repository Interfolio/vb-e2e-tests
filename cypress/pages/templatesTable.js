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
    cy.get(TIDlist).eq(index).should('have.text', expectedEntry[0])
    cy.get(nameList).eq(index).should('have.text', expectedEntry[1])
    cy.get(unitList).eq(index).should('have.text', expectedEntry[2])
    cy.get(sectionsShownList).eq(index).should('have.text', expectedEntry[3])
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
            return cy.get(sortingButtonsList).eq(0).click().wait(1000);
        case 'Name':
            return cy.get(sortingButtonsList).eq(1).click().wait(1000);
        case 'Unit':
            return cy.get(sortingButtonsList).eq(2).click().wait(1000);
        default:
            return "Column not found"
    }
}