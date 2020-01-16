import * as templatesTable from "../pages/templatesTable"
import { appCookies } from '../pages/helper';

describe('View Templates Table Tests', function () {

    before(() => {
        cy.visit(Cypress.env('loginUrl'))
        //  /* tslint:disable-next-line */
        cy.LogIn()
        cy.fixture('templatesTable.json').as('expectedValues');
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.visit('/').get('.ant-typography', { timeout: 20000 }).should('be.visible')
    });

    it('Verify table has entries', function () {
        cy.get(templatesTable.headersList).each(($el, index) => expect($el.get(0).innerText).to.contain(this.expectedValues.tableHeaders[index]))
        cy.get(templatesTable.addTemplateButton).should('be.visible')
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[0])
        templatesTable.verifyEntryInTheTemplateTable(1, this.expectedValues.tableEntries[1])
    })

    it.only('Verify sort and pagination', function () {
        templatesTable.sortTable('TID') //ascending
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[2])
        cy.get(templatesTable.paginationButtonsList).eq(templatesTable.selectPaginationButton('6')).click()
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[0])
    
        templatesTable.sortTable('TID') //descending
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[2])
        cy.get(templatesTable.paginationButtonsList).eq(templatesTable.selectPaginationButton('Previous page')).click()
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[6])

        templatesTable.sortTable('Name')
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[5])
        cy.get(templatesTable.paginationButtonsList).eq(templatesTable.selectPaginationButton('1')).click()
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[2])

        templatesTable.sortTable('Name')
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[3])
        cy.get(templatesTable.paginationButtonsList).eq(templatesTable.selectPaginationButton('Next page')).click()
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[5])

        templatesTable.sortTable('Unit')
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[6])
        cy.get(templatesTable.paginationButtonsList).eq(templatesTable.selectPaginationButton('6')).click()
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[0])

        templatesTable.sortTable('Unit')
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[7])
        cy.get(templatesTable.paginationButtonsList).eq(templatesTable.selectPaginationButton('2')).click()
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.tableEntries[8])
    })
})