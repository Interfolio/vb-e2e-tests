import * as sectionsPage from "../pages/sectionsPage"
import { appCookies, checkURLcontains } from '../pages/helper'
import * as templateStylingSidebar from "../pages/templateStylingSidebar"
import { templatesTableSelectors } from "../pages/templatesTable"
import { sectionsPageSelectors } from "../pages/sectionsPage"
import { templateStylingSidebarSelectors } from "../pages/templateStylingSidebar"


describe('Create template', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/setup', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(templatesTableSelectors.headersList).each(($el, index) => expect($el.get(0).innerText).to.contain(expectedValues.tableHeaders[index]))
        });
        cy.fixture('templateStyling.json').as('expectedStylingValues');
    });

    it('Edit template styling', function () {
        cy.get(templatesTableSelectors.editCloneAndArchiveButtonList).contains('Edit').click()
        cy.get(sectionsPageSelectors.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.sidebarTitle).should('contain', 'Edit Template Styling')
        templateStylingSidebar.selectAnOptionFromADropdown('Display Style', this.expectedStylingValues.displayStyle.Tabular)
        templateStylingSidebar.selectAnOptionFromADropdown('Citation Style', this.expectedStylingValues.citationStyle.B)
        templateStylingSidebar.selectAnOptionFromADropdown('Font Family', this.expectedStylingValues.fontFamily.Arial)
        templateStylingSidebar.selectAnOptionFromADropdown('Font Size', this.expectedStylingValues.fontSize.s32px)
        templateStylingSidebar.selectAnOptionFromADropdown('Font Color', this.expectedStylingValues.fontSize.cF08080)
        templateStylingSidebar.selectAnOptionFromADropdown('Space Before', this.expectedStylingValues.fontSize.s32px)
        templateStylingSidebar.selectAnOptionFromADropdown('Space After', this.expectedStylingValues.fontSize.s32px)
        cy.get(templateStylingSidebarSelectors.stylingOptionsList).contains(this.expectedStylingValues.styling.bold)
    });
});
