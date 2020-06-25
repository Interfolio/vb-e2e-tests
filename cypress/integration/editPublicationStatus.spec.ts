import { clickOnEditButtonForASpecificTemplate, appCookies, checkURLcontains } from '../components/helper'
import { sectionsPageSelectors } from "../components/pages/sectionsPage"
import * as sidebarButtons from "../components/buttons/sidebarButtons"
import * as reorderElementsSidebar from '../components/sidebars/reorderElementsSidebar';

describe('Publication status tests', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('templates/institutional')
        checkURLcontains('templates/institutional', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        clickOnEditButtonForASpecificTemplate(0)
    });

    it('Change order and visibility for publication statuses on SCP arhetype', function () {
        cy.get(sectionsPageSelectors.allSectionsList).contains('Scholarly Contributions').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Publication Status')
        // move column up and verify operation happened
        var columnName: string
        reorderElementsSidebar.getColumnName(1).then((name) => {
            columnName = name
        });
        reorderElementsSidebar.moveNthColumnUp(1)
        sidebarButtons.clickOn('Apply Changes')
        sidebarButtons.clickOn('Back')
        sidebarButtons.clickOnEditSectionSiderbarButton('Publication Status')
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
        sidebarButtons.clickOnEditSectionSiderbarButton('Publication Status')
        reorderElementsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            assert.notDeepEqual(state, columnState)
        });
    });
});