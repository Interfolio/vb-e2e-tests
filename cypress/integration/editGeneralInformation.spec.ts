import * as sectionsPage from "../components/pages/sectionsPage"
import * as generalInformationSidebar from "../components/sidebars/generalInformationSidebar"
import { clickOnEditButtonForASpecificTemplate, createUUID, appCookies, checkURLcontains } from '../components/helper'
import { generalInformationSidebarSelectors } from "../components/sidebars/generalInformationSidebar"
import { sectionsPageSelectors } from "../components/pages/sectionsPage"
import * as radioButton from "../components/buttons/radioButton"
import * as sidebarButtons from "../components/buttons/sidebarButtons"

describe('Edit general information tests', () => {
    
    before(() => {
        cy.LogInUsingAPI()
    });

    var templateIndex = -1
    beforeEach(() => {
        cy.visit('templates')
        checkURLcontains('/templates', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);

        templateIndex++
        clickOnEditButtonForASpecificTemplate(templateIndex)
        sectionsPage.clickOn('Edit General Information')
    });

    it('Edit template name, description and toggles state from general information sidebar', function () {
        cy.get(generalInformationSidebarSelectors.sidebarTitle).should('contain', 'General Information')
        const UUID = createUUID()
        cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).clear().type('automated-N-' + UUID)
        cy.get(generalInformationSidebarSelectors.vitaTemplateDescriptionField).clear().type('automated-D-' + UUID)
        radioButton.verifyStates(false, true, false, true, true)
        radioButton.clickEachRadioButton()
        sidebarButtons.clickOn('Apply Changes')
        cy.get(sectionsPageSelectors.templateName).should('contain', 'automated-N-' + UUID)
        cy.get(sectionsPageSelectors.templateDescription).should('contain', 'automated-D-' + UUID)
        sectionsPage.clickOn('Edit General Information')
        radioButton.verifyStates(true, false, true, false, false)
    });

    it('Verify name uniqueness and that name and description are mandatory', function () {
        cy.fixture('templatesTable.json').then((expectedValues) => {
            cy.get(generalInformationSidebarSelectors.vitaTemplateNameField).clear().type(expectedValues.activeTableEntries[1][0])
        });
        sidebarButtons.clickOn('Apply Changes')
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
