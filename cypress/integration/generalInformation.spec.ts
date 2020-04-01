import * as sectionsPage from "../pages/sectionsPage"
import * as generalInformationSidebar from "../pages/generalInformationSidebar"
import { createUUID, appCookies, checkURLcontains } from '../pages/helper'
import { generalInformationSidebarSelectors } from "../pages/generalInformationSidebar"
import { templatesTableSelectors } from "../pages/templatesTable"
import { sectionsPageSelectors } from "../pages/sectionsPage"
import { RadioButton } from "../components/radio-button"
import { SidebarButtons } from "../components/sidebar-buttons"


describe('Create template', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/setup', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);

        cy.get(templatesTableSelectors.editCloneAndArchiveButtonList).contains('Edit').click()
        checkURLcontains('/edit', 30000)
        cy.get(sectionsPageSelectors.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit General Information')
    });

    it.only('Edit template name, description and toggles state from general information sidebar', function () {
        cy.get(generalInformationSidebarSelectors.sidebarTitle).should('contain', 'General Information')
        const UUID = createUUID()
        cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).clear().type('automated-N-' + UUID)
        cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).clear().type('automated-D-' + UUID)
        RadioButton.verifyStates(false, true, false, true, true)
        RadioButton.clickEachRadioButton()
        SidebarButtons.clickOn('Apply Changes')
        cy.get(sectionsPageSelectors.templateName).should('contain', 'automated-N-' + UUID)
        cy.get(sectionsPageSelectors.templateDescription).should('contain', 'automated-D-' + UUID)
        sectionsPage.clickOn('Edit General Information')
        RadioButton.verifyStates(true, false, true, false, false)
    });

    it('Verify name uniqueness and that name and description are mandatory', function () {
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).clear().type(expectedValues.activeTableEntries[1][0])
        });
        SidebarButtons.clickOn('Apply Changes')
        cy.get(generalInformationSidebarSelectors.nameNotUniqueError).should('contain', 'Vita name must be unique.')
        generalInformationSidebar.checkValidationWorks(generalInformationSidebarSelectors.vitaTemplateNameField)
        generalInformationSidebar.checkValidationWorks(generalInformationSidebarSelectors.vitaTemplateDescriptionField)
    });

    it('Verify Cancel and Close buttons functionality from general information sidebar', function () {
        cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).invoke('val').as('initialTemplateName');
        cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).invoke('val').as('initialTemplateDescription');
        cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).clear().type('updated name')
        cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).clear().type('updated description')
        generalInformationSidebar.verifyChangesAreNotLost('Close')
        generalInformationSidebar.verifyChangesAreNotLost('Cancel')
        cy.get('@initialTemplateName').then(name => {
            cy.get('@initialTemplateDescription').then(description => {
                generalInformationSidebar.verifyChangesAreDismissed('Close', name.toString(), description.toString())
                sectionsPage.clickOn('Edit General Information')
                cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).clear().type('updated name')
                cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).clear().type('updated description')
                generalInformationSidebar.verifyChangesAreDismissed('Cancel', name.toString(), description.toString())
            })
        });
    });
});
