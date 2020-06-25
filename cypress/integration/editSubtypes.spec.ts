import * as sectionsPage from "../components/pages/sectionsPage"
import { clickOnEditButtonForASpecificTemplate, appCookies, checkURLcontains } from '../components/helper'
import * as templateStylingSidebar from "../components/sidebars/templateStylingSidebar"
import { templatesTableSelectors } from "../components/pages/templatesTablePage"
import { sectionsPageSelectors } from "../components/pages/sectionsPage"
import { templateStylingSidebarSelectors } from "../components/sidebars/templateStylingSidebar"
import * as sidebarButtons from "../components/buttons/sidebarButtons"
import { popupButtonsSelectors } from '../components/buttons/popupButtons';
import { sectionContactInfoSidebarSelectors } from '../components/sidebars/sectionContactInfoSidebar';
import * as reorderElementsSidebar from '../components/sidebars/reorderElementsSidebar';


describe('Subtypes tests', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('templates/institutional')
        checkURLcontains('templates/institutional', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        clickOnEditButtonForASpecificTemplate(0)
    });

    it('Change order and visibility for Subtype On SCP arhetype', function () {
        cy.get(sectionsPageSelectors.allSectionsList).contains('Scholarly Contributions').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Subtypes')
        // move column up and verify operation happened
        var columnName: string
        reorderElementsSidebar.getColumnName(1).then((name) => {
            columnName = name
        });
        reorderElementsSidebar.moveNthColumnUp(1)
        sidebarButtons.clickOn('Apply Changes')
        sidebarButtons.clickOn('Back')
        sidebarButtons.clickOnEditSectionSiderbarButton('Subtypes')
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
        sidebarButtons.clickOnEditSectionSiderbarButton('Subtypes')
        reorderElementsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            assert.notDeepEqual(state, columnState)
        });
    });
});