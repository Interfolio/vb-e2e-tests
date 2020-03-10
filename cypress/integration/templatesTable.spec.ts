import * as templatesTable from "../pages/templatesTable"
import { checkURLcontains, appCookies } from '../pages/helper';

describe('View Templates Table Tests', function () {

                            // WORK IN PROGRESS

    // before(() => {
    //     cy.visit(Cypress.env('loginUrl'))
    //     cy.LogIn();
    //     cy.fixture('templatesTable.json').as('expectedValues');
    // });

    // beforeEach(() => {
    //     Cypress.Cookies.preserveOnce(...appCookies);
    //     cy.visit('/').get(templatesTable.templateTablePageTitle, { timeout: 20000 }).should('be.visible')
    // });
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/setup', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.fixture('templatesTable.json').as('expectedValues');
    });

    it('Verify table headers and some entries', function () {
        cy.get(templatesTable.headersList).each(($el, index) => expect($el.get(0).innerText).to.contain(this.expectedValues.tableHeaders[index]))
        cy.get(templatesTable.addTemplateButton).should('be.visible')
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.activeTableEntries[0])
        templatesTable.verifyEntryInTheTemplateTable(1, this.expectedValues.activeTableEntries[1])
    })

    it('Verify sort and pagination on Active Templates Tab', function () {
        templatesTable.verifySort('Template Name', this.expectedValues.activeTableEntries[0])
        templatesTable.verifyPagination('2', this.expectedValues.activeTableEntries[9])
        templatesTable.verifySort('Template Name', this.expectedValues.activeTableEntries[9])
        templatesTable.verifyPagination('Previous Page', this.expectedValues.activeTableEntries[0])
        templatesTable.verifySort('Source Template', this.expectedValues.activeTableEntries[0])
        templatesTable.verifyPagination('2', this.expectedValues.activeTableEntries[10])
        templatesTable.verifySort('Source Template', this.expectedValues.activeTableEntries[10])
        templatesTable.verifyPagination('Next Page', this.expectedValues.activeTableEntries[20])
        templatesTable.verifySort('Unit', this.expectedValues.activeTableEntries[20])
        templatesTable.verifyPagination('1', this.expectedValues.activeTableEntries[10])
        templatesTable.verifySort('Unit', this.expectedValues.activeTableEntries[9])
        templatesTable.verifyPagination('2', this.expectedValues.activeTableEntries[0])
    })

    it('Verify sort and pagination on Archived Templates Tab', function () {
        //templatesTable.openAchivedTab()

        cy.get(templatesTable.activeOrArchivedTab).contains('Archived').click()
        cy.get(templatesTable.templateNamelist).eq(0).as('templateNamelist')
        cy.get('@templateNamelist').should('have.text', this.expectedValues.achivedTableEntries[0][0])
    

        templatesTable.verifySort('Template Name', this.expectedValues.achivedTableEntries[9])
        templatesTable.verifyPagination('2', this.expectedValues.achivedTableEntries[19])
        templatesTable.verifySort('Source Template', this.expectedValues.achivedTableEntries[10])
        templatesTable.verifyPagination('Next Page', this.expectedValues.achivedTableEntries[20])
        templatesTable.verifySort('Unit', this.expectedValues.achivedTableEntries[8])
        templatesTable.verifyPagination('1', this.expectedValues.achivedTableEntries[0])
    })

    it('Verify search on Active and Archived Templates Tab', function () {
        cy.get(templatesTable.searchBar).as('searchBar')
        cy.get('@searchBar').invoke('attr', 'placeholder').should('contain', 'Type to search for a vita template')
        cy.get('@searchBar').clear().type('app')
        cy.get(templatesTable.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTable.templateNamelist).should('have.length', 2)
        cy.get('@searchBar').clear().type('   pine   ')
        cy.get(templatesTable.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTable.templateNamelist).should('have.length', 1)
        cy.get('@searchBar').clear().type('   template 1')
        cy.get(templatesTable.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTable.templateNamelist).should('have.length', 6)
        cy.get('@searchBar').clear().type('automated  ')
        cy.get(templatesTable.paginationButtonsList).should('have.length', 5)
        cy.get(templatesTable.templateNamelist).should('have.length', 10)
        templatesTable.openAchivedTab()
        cy.get('@searchBar').clear().type(' 2  ')
        cy.get(templatesTable.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTable.templateNamelist).should('have.length', 4)
        cy.get('@searchBar').clear().type(' auto')
        cy.get(templatesTable.paginationButtonsList).should('have.length', 4)
        cy.get(templatesTable.templateNamelist).should('have.length', 10)
    })

    it.only('Verify pagination on Active and Archived Templates Tab', function () {
        templatesTable.switchPaginationAndCheckDisplayedEntries(0, 6, 10)
        templatesTable.switchPaginationAndCheckDisplayedEntries(1, 4, 20)
        templatesTable.switchPaginationAndCheckDisplayedEntries(2, 3, 34)
        templatesTable.switchPaginationAndCheckDisplayedEntries(3, 3, 34)
        templatesTable.openAchivedTab()
        templatesTable.switchPaginationAndCheckDisplayedEntries(1, 4, 20)
        templatesTable.switchPaginationAndCheckDisplayedEntries(2, 3, 22)
        templatesTable.switchPaginationAndCheckDisplayedEntries(3, 3, 22)
        templatesTable.switchPaginationAndCheckDisplayedEntries(0, 5, 10)
    })
})