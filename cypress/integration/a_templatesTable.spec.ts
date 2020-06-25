/// <reference types="Cypress" />
import * as templatesTable from "../components/pages/templatesTablePage"
import { checkURLcontains, appCookies, clickOnEditButtonForASpecificTemplate } from '../components/helper';
import { templatesTableSelectors } from "../components/pages/templatesTablePage"
import * as sectionsPage from "../components/pages/sectionsPage"
import { sectionsPageSelectors } from "../components/pages/sectionsPage"
import { popupButtonsSelectors } from '../components/buttons/popupButtons';


describe('Templates table tests', function () {

    before(() => {
        cy.visit(Cypress.env('loginUrl'))
        cy.LogIn();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.visit('/templates/institutional').get(templatesTableSelectors.templateTablePageTitle, { timeout: 20000 }).should('be.visible')
        checkURLcontains('/templates', 30000)
        cy.fixture('templatesTable.json').as('expectedValues');
    });

    function extraSort(sortTerm: string) {
        // This function needs to be removed once the 3rd sort option is removed, currently we have it and it makes no sense
        templatesTable.sortTableBy(sortTerm)
        cy.wait(1000)
    }

    it('Verify table headers and some entries', function () {
        cy.get(templatesTableSelectors.headersList).each(($el, index) => expect($el.get(0).innerText).to.contain(this.expectedValues.tableHeaders[index]))
        cy.get(templatesTableSelectors.addTemplateButton).should('be.visible')
        templatesTable.verifyEntryInTheTemplateTable(0, this.expectedValues.activeTableEntries[0])
        templatesTable.verifyEntryInTheTemplateTable(1, this.expectedValues.activeTableEntries[1])
    })

    it('Verify pagination and sort by Template Name on Active Templates Tab', function () {
        templatesTable.verifySort('Template Name', this.expectedValues.activeTableEntries[33])
        templatesTable.verifyPagination('2', this.expectedValues.activeTableEntries[13])
        extraSort('Template Name')
        templatesTable.verifySort('Template Name', this.expectedValues.activeTableEntries[20])
        templatesTable.verifyPagination('Previous Page', this.expectedValues.activeTableEntries[0])
    })

    it('Verify pagination and sort by Source Template on Active Templates Tab', function () {
        templatesTable.verifySort('Source Template', this.expectedValues.activeTableEntries[7])
        templatesTable.verifyPagination('2', this.expectedValues.activeTableEntries[29])
        templatesTable.verifySort('Source Template', this.expectedValues.activeTableEntries[29])
        templatesTable.verifyPagination('1', this.expectedValues.activeTableEntries[0])
    })

    it('Verify pagination and sort by Unit on Active Templates Tab', function () {
        templatesTable.verifySort('Unit', this.expectedValues.activeTableEntries[19])
        templatesTable.verifyPagination('Next Page', this.expectedValues.activeTableEntries[32])
        templatesTable.verifySort('Unit', this.expectedValues.activeTableEntries[29])
        templatesTable.verifyPagination('Previous Page', this.expectedValues.activeTableEntries[8])
    })

    it('Verify sort and pagination on Archived Templates Tab', function () {
        cy.get(templatesTableSelectors.activeOrArchivedTab).contains('Archived').click()
        templatesTable.verifySort('Template Name', this.expectedValues.achivedTableEntries[20])
        templatesTable.verifyPagination('2', this.expectedValues.achivedTableEntries[1])
        templatesTable.verifySort('Source Template', this.expectedValues.achivedTableEntries[20])
        templatesTable.verifyPagination('Previous Page', this.expectedValues.achivedTableEntries[0])
        templatesTable.verifySort('Unit', this.expectedValues.achivedTableEntries[0])
        templatesTable.verifyPagination('Next Page', this.expectedValues.achivedTableEntries[20])
    })

    it('Verify search on Active and Archived Templates Tab', function () {
        cy.get(templatesTableSelectors.searchBar).as('searchBar')
        cy.get('@searchBar').invoke('attr', 'placeholder').should('contain', 'Type to search for a vita template')
        cy.get('@searchBar').clear().type('app')
        cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', 4)
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 20)
        cy.get('@searchBar').clear().type('   pine   ')
        cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 1)
        cy.get('@searchBar').clear().type('   template 1')
        cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 6)
        cy.get('@searchBar').clear().type('automated  ')
        cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', 4)
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 20)
        cy.get(templatesTableSelectors.activeOrArchivedTab).contains('Archived').click()
        cy.get('@searchBar').clear().type(' 2  ')
        cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 4)
        cy.get('@searchBar').clear().type(' auto')
        cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', 4)
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 20)
    })

    it('Verify shown per page on Active and Archived Templates Tab', function () {
        templatesTable.switchPaginationAndCheckDisplayedEntries(0, 6, 10)
        templatesTable.switchPaginationAndCheckDisplayedEntries(1, 4, 20)
        templatesTable.switchPaginationAndCheckDisplayedEntries(2, 3, 34)
        templatesTable.switchPaginationAndCheckDisplayedEntries(3, 3, 34)
        cy.get(templatesTableSelectors.activeOrArchivedTab).contains('Archived').click()
        templatesTable.switchPaginationAndCheckDisplayedEntries(0, 5, 10)
        templatesTable.switchPaginationAndCheckDisplayedEntries(1, 4, 20)
        templatesTable.switchPaginationAndCheckDisplayedEntries(2, 3, 22)
        templatesTable.switchPaginationAndCheckDisplayedEntries(3, 3, 22)
    })

    it('Verify Exclude subunits works', function () {
        cy.get(templatesTableSelectors.unitDropdown).click().wait(1000)
        cy.get(templatesTableSelectors.unitDropdownValues).contains('College of Business', { timeout: 2000 }).click()
        cy.get(templatesTableSelectors.paginationButtonsList).should('have.length', 3)
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 20)
        cy.get(templatesTableSelectors.unitList).should('contain', 'College of Business').should('contain', 'Information Systems Department').should('not.contain', 'University')
        cy.get(templatesTableSelectors.unitDropdown).click()
        cy.get(templatesTableSelectors.unitDropdownValues).contains('University').click()
        cy.get(templatesTableSelectors.excludeSubunitsCheckbox).click()
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 12)
        cy.get(templatesTableSelectors.activeOrArchivedTab).contains('Archived').click()
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 11)
        cy.get(templatesTableSelectors.unitList).should('contain', 'University')
        cy.get(templatesTableSelectors.unitDropdown).click()
        cy.get(templatesTableSelectors.unitDropdownValues).contains('Marketing').click()
        cy.get(templatesTableSelectors.excludeSubunitsCheckbox).click()
        cy.get(templatesTableSelectors.templateNamelist).should('have.length', 11)
        cy.get(templatesTableSelectors.unitList).should('contain', 'Marketing')
    })

    it('Verify sections column shows correct number and popup is displayed', function () {
        clickOnEditButtonForASpecificTemplate(0)
        sectionsPage.getHiddenSectionList().eq(0).find(sectionsPageSelectors.moveSectionUpButton).click()
        sectionsPage.getHiddenSectionList().eq(0).find(sectionsPageSelectors.moveSectionUpButton).click()
        sectionsPage.getHiddenSectionList().eq(0).find(sectionsPageSelectors.moveSectionUpButton).click()
        var sectionNames: Array<string> = []
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((numberOfShownSections) => {
            for (let i = 0; i < sectionsPage.getNumberOfSections(numberOfShownSections.text()); i++) {
                sectionsPage.getShownSectionList().eq(i).then((element) => {
                    let indexOfEdit = element.text().indexOf('Edit')
                    sectionNames.push(element.text().substring(0, indexOfEdit).trim())
                })
            }
        })
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((numberOfShownSections) => {
            sectionsPage.clickOn('Save')
            cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
            sectionsPage.clickOn('Back')
            cy.get(templatesTableSelectors.sectionsShownList).eq(0).should('contain.text', sectionsPage.getNumberOfSections(numberOfShownSections.text()))
            cy.get(templatesTableSelectors.showVisibleSectionsButton).eq(0).click()
            sectionNames.forEach((name) => cy.get(templatesTableSelectors.listOfSectionsShownFromPopup).should('contain.text', name))
        })
    })
})