import * as sectionsPage from "../pages/sectionsPage"
import * as generalInformationSidebar from "../pages/generalInformationSidebar"
import { createUUID, appCookies, checkURLcontains } from '../pages/helper'
import * as templatesTable from "../pages/templatesTable"

describe('Create template', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/setup', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(templatesTable.headersList).each(($el, index) => expect($el.get(0).innerText).to.contain(expectedValues.tableHeaders[index]))
        });
    });

    it('Edit template name, description and toggles state from general information sidebar', function () {
        cy.get(templatesTable.editCloneAndArchiveButtonList).contains('Edit').click()
        cy.get(sectionsPage.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit General Information')
        cy.get(generalInformationSidebar.sidebarTitle).should('contain', 'General Information')
        const UUID = createUUID()
        cy.get(generalInformationSidebar.vitaTemplateNameField).clear().type('automated-N-' + UUID)
        cy.get(generalInformationSidebar.vitaTemplateDescriptionField).clear().type('automated-D-' + UUID)
        generalInformationSidebar.verifyRadioButtonState(false, true, false, true, true)
        cy.get(generalInformationSidebar.uncheckedRadioButtonList).click({ multiple: true })
        generalInformationSidebar.clickOn('Apply Changes')
        cy.get(sectionsPage.temporaryNameAndDescription).should('contain', 'automated-N-' + UUID).should('contain', 'automated-D-' + UUID)
        sectionsPage.clickOn('Edit General Information')
        generalInformationSidebar.verifyRadioButtonState(true, false, true, false, false)
    });

    it('Verify name uniqueness and that name and description are mandatory', function () {
        cy.get(templatesTable.editCloneAndArchiveButtonList).contains('Edit').click()
        cy.get(sectionsPage.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit General Information')
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(generalInformationSidebar.vitaTemplateNameField).clear().type(expectedValues.activeTableEntries[1][0])
        });
        generalInformationSidebar.clickOn('Apply Changes')
        cy.get(generalInformationSidebar.nameNotUniqueError).should('contain', 'Vita name must be unique.')
        generalInformationSidebar.checkValidationWorks(generalInformationSidebar.vitaTemplateNameField)
        generalInformationSidebar.checkValidationWorks(generalInformationSidebar.vitaTemplateDescriptionField)
    });

    it('Verify Cancel and Close buttons functionality from general information sidebar', function () {
        cy.get(templatesTable.editCloneAndArchiveButtonList, { timeout: 30000 }).contains('Edit').click()
        cy.get(sectionsPage.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit General Information')
        cy.get(generalInformationSidebar.vitaTemplateNameField).invoke('val').as('initialTemplateName');
        cy.get(generalInformationSidebar.vitaTemplateDescriptionField).invoke('val').as('initialTemplateDescription');
        cy.get(generalInformationSidebar.vitaTemplateNameField).clear().type('updated name')
        cy.get(generalInformationSidebar.vitaTemplateDescriptionField).clear().type('updated description')
        generalInformationSidebar.verifyChangesAreNotLost('Close')
        generalInformationSidebar.verifyChangesAreNotLost('Cancel')
        cy.get('@initialTemplateName').then(name => {
            cy.get('@initialTemplateDescription').then(description => {
                generalInformationSidebar.verifyChangesAreDismissed('Close', name.toString(), description.toString())
                sectionsPage.clickOn('Edit General Information')
                cy.get(generalInformationSidebar.vitaTemplateNameField).clear().type('updated name')
                cy.get(generalInformationSidebar.vitaTemplateDescriptionField).clear().type('updated description')
                generalInformationSidebar.verifyChangesAreDismissed('Cancel', name.toString(), description.toString())
            })
        });
    });
});
