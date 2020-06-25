import { appCookies, checkURLcontains } from '../components/helper';
import { vitaTablePageSelectors } from '../components/pages/vitaTablePage'
import * as vitaTablePage from '../components/pages/vitaTablePage'

describe('Vitas table tests', function () {

    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('vitas')
        checkURLcontains('/vitas', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.wait(1000).get(vitaTablePageSelectors.vitaNamelist, { timeout: 20000 }).should('have.length.greaterThan', 0)
        cy.fixture('vitaTable.json').as('expectedValues');
    });

    it('Personal vitas tab - Verify sort, pagination, search and shown per page', function () {
        // verify sort
        vitaTablePage.sortTableBy('Personal', 'Vita Name')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Personal', this.expectedValues.personalVitas[9])
        vitaTablePage.sortTableBy('Personal', 'Template')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Personal', this.expectedValues.personalVitas[0])
        // verify pagination
        vitaTablePage.navigateToPage('Next Page')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Personal', this.expectedValues.personalVitas[20])
        // verify search
        cy.get(vitaTablePageSelectors.searchBar).type('vita 15')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Personal', this.expectedValues.personalVitas[15])
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 1)
        // verify search shown per page
        cy.get(vitaTablePageSelectors.searchBar).clear()
        cy.get(vitaTablePageSelectors.shownPerPageDropdown).click()
        cy.get(vitaTablePageSelectors.shownPerPageDropdownValues).eq(0).click()
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 10)
    })

    it('Institutional vitas tab - Verify sort, pagination, search and shown per page', function () {
        cy.get(vitaTablePageSelectors.vitaTypeTabs).contains('Institutional').click()
        // verify sort
        vitaTablePage.sortTableBy('Institutional', 'Template')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Institutional', this.expectedValues.institutionalVitas[0])
        vitaTablePage.sortTableBy('Institutional', 'Unit')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Institutional', this.expectedValues.institutionalVitas[21])
        // verify pagination
        vitaTablePage.navigateToPage('2')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Institutional', this.expectedValues.institutionalVitas[9])
        // verify search
        cy.get(vitaTablePageSelectors.searchBar).type('vita 1')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Institutional', this.expectedValues.institutionalVitas[19])
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 11)
        // verify search shown per page
        cy.get(vitaTablePageSelectors.searchBar).clear()
        cy.get(vitaTablePageSelectors.shownPerPageDropdown).click()
        cy.get(vitaTablePageSelectors.shownPerPageDropdownValues).eq(2).click()
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 22)
    })

    it('Archived vitas tab - Verify sort, pagination, search and shown per page', function () {
        cy.get(vitaTablePageSelectors.vitaTypeTabs).contains('Archived').click()
        cy.get(vitaTablePageSelectors.vitaTypeDropdown).click()
        cy.get(vitaTablePageSelectors.vitaTypeDropdownOptions).contains('All Types').click()
        // verify sort
        vitaTablePage.sortTableBy('Archived', 'Type')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Archived', this.expectedValues.archivedVitas[0])
        vitaTablePage.sortTableBy('Archived', 'Unit')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Archived', this.expectedValues.archivedVitas[21])
        // verify pagination
        vitaTablePage.navigateToPage('2')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Archived', this.expectedValues.archivedVitas[9])
        // verify search
        cy.get(vitaTablePageSelectors.searchBar).type(' archived automated vita 11 ')
        vitaTablePage.verifyFirstEntryInTheVitaTable('Archived', this.expectedValues.archivedVitas[11])
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 1)
        // verify search shown per page
        cy.get(vitaTablePageSelectors.searchBar).clear()
        cy.get(vitaTablePageSelectors.shownPerPageDropdown).click()
        cy.get(vitaTablePageSelectors.shownPerPageDropdownValues).eq(3).click()
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 22)
        // verify vita type filters correctly
        cy.get(vitaTablePageSelectors.vitaTypeDropdown).click()
        cy.get(vitaTablePageSelectors.vitaTypeDropdownOptions).contains('Personal').click()
        cy.get(vitaTablePageSelectors.archivedTabTypeList).should('not.contain', 'Institutional')
        cy.get(vitaTablePageSelectors.vitaTypeDropdown).click()
        cy.get(vitaTablePageSelectors.vitaTypeDropdownOptions).contains('Institutional').click()
        cy.get(vitaTablePageSelectors.archivedTabTypeList).should('not.contain', 'Personal')
    })
})