import * as sectionsPage from "../components/pages/sectionsPage"
import { clickOnEditButtonForASpecificTemplate, appCookies, checkURLcontains } from '../components/helper'
import * as sidebarButtons from "../components/buttons/sidebarButtons"
import { sectionContactInfoSidebarSelectors } from '../components/sidebars/sectionContactInfoSidebar';
import * as reorderElementsSidebar from '../components/sidebars/reorderElementsSidebar';


describe('Contact Information arhetype tests', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('templates/institutional')
        checkURLcontains('templates/institutional', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        clickOnEditButtonForASpecificTemplate(0)
    });

    it('Change order, visibility and display option for contact info sections', function () {
        sectionsPage.getHiddenSectionList().contains('Contact Info').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Contact Information')
        cy.get(sectionContactInfoSidebarSelectors.displayOptionDropdown).click()
        cy.get(sectionContactInfoSidebarSelectors.displayOptionDropdownValues).contains('Field & Label').click()
        // move column up and verify operation happened
        var columnName: string
        reorderElementsSidebar.getColumnName(1).then((name) => {
            columnName = name
        });
        reorderElementsSidebar.moveNthColumnUp(1)
        sidebarButtons.clickOn('Apply Changes')
        sidebarButtons.clickOn('Back')
        sidebarButtons.clickOnEditSectionSiderbarButton('Contact Information')
        reorderElementsSidebar.getColumnName(0).then((name) => {
            assert.strictEqual(name, columnName)
        });
        // make a column hidden (all are shown by default)
        var columnState: string
        reorderElementsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            columnState = state
        });
        reorderElementsSidebar.makeNthColumnShownOrHidden(4)
        sidebarButtons.clickOn('Apply Changes')
        sidebarButtons.clickOn('Back')
        sidebarButtons.clickOnEditSectionSiderbarButton('Contact Information')
        reorderElementsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            assert.notDeepEqual(state, columnState)
        });
    });
});