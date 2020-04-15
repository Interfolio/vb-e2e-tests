import * as sectionsPage from "../components/pages/sectionsPage"
import { appCookies, checkURLcontains, clickOnEditButtonForASpecificTemplate } from '../components/helper'
import { sectionsPageSelectors } from "../components/pages/sectionsPage"
import { popupButtonsSelectors } from '../components/buttons/popupButtons';
import * as sidebarButtons from "../components/buttons/sidebarButtons"
import { sectionSettingsSidebarSelectors } from "../components/sidebars/sectionSettingsSidebar"
import * as sectionSettingsSidebar from "../components/sidebars/sectionSettingsSidebar"
import { createUUID } from '../components/helper';

describe('Edit section settings tests', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    var templateIndex = -1
    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/templates', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        templateIndex++
        clickOnEditButtonForASpecificTemplate(templateIndex)
        cy.fixture('sectionSettings.json').as('expectedSettingsValues');
    });

    it('Edit settings for Contact Info archetype section', function () {
        const UUID = createUUID()
        const sectionName = 'automated-name-' + UUID + ' Contact Info'
        const displayStyle = this.expectedSettingsValues.displayStyle.Listing
        sectionSettingsSidebar.modifyCommonFieldsOnSection('Contact info', sectionName, 'automated-desc-' + UUID, displayStyle)
        sidebarButtons.clickOn('Apply Changes')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).should('contain.text', displayStyle)
        sidebarButtons.clickOn('Cancel')
        sectionsPage.getHiddenSectionList().should('contain.text', sectionName)
    });

    it('Edit settings for Grants archetype section', function () {
        const UUID = createUUID()
        const sectionName = 'automated-name-' + UUID + ' Grants'
        const displayStyle = this.expectedSettingsValues.displayStyle.TraditionalDate
        const sortOrder = this.expectedSettingsValues.sortOrder.Descending
        const basedOn = this.expectedSettingsValues.basedOn.StartSemester
        const numbering = this.expectedSettingsValues.numbering.ContinueNumbering
        sectionSettingsSidebar.modifyCommonFieldsOnSection('Grants', sectionName, 'automated-desc-' + UUID, displayStyle)
        sectionSettingsSidebar.modifySortOrderBasedOnAndNumbering(sortOrder, basedOn, numbering)
        sectionSettingsSidebar.modifyCheckboxes()
        sidebarButtons.clickOn('Apply Changes')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).should('contain.text', displayStyle)
        sectionSettingsSidebar.verifySortOrderBasedOnAndNumbering(sortOrder, basedOn, numbering)
        sectionSettingsSidebar.verifyCheckboxes()
        sidebarButtons.clickOn('Cancel')
        sectionsPage.getHiddenSectionList().should('contain.text', sectionName)
    });

    it('Edit settings for Teaching archetype section', function () {
        const UUID = createUUID()
        const sectionName = 'automated-name-' + UUID + ' Teaching'
        const displayStyle = this.expectedSettingsValues.displayStyle.Tabular
        sectionSettingsSidebar.modifyCommonFieldsOnSection('Teaching', sectionName, 'automated-desc-' + UUID, displayStyle)
        cy.get(sectionSettingsSidebarSelectors.displayLinkToAttachements).click()
        sidebarButtons.clickOn('Apply Changes')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).should('contain.text', displayStyle)
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).should('be.visible')
        cy.get(sectionSettingsSidebarSelectors.displayLinkToAttachements).children().eq(0).should('not.have.class', sectionSettingsSidebarSelectors.checkBoxClass)
        sidebarButtons.clickOn('Cancel')
        sectionsPage.getHiddenSectionList().should('contain.text', sectionName)
    });

    it('Edit settings for Standard archetype section', function () {
        const UUID = createUUID()
        const sectionName = 'automated-name-' + UUID + ' Professional Development'
        const displayStyle = this.expectedSettingsValues.displayStyle.Tabular
        const sortOrder = this.expectedSettingsValues.sortOrder.Ascending
        const basedOn = this.expectedSettingsValues.basedOn.EndSemester
        const numbering = this.expectedSettingsValues.numbering.NoNumbering
        sectionSettingsSidebar.modifyCommonFieldsOnSection('Professional Development', sectionName, 'automated-desc-' + UUID, displayStyle)
        sectionSettingsSidebar.modifySortOrderBasedOnAndNumbering(sortOrder, basedOn, numbering)
        sectionSettingsSidebar.modifyCheckboxes()
        sidebarButtons.clickOn('Apply Changes')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).should('contain.text', displayStyle)
        sectionSettingsSidebar.verifySortOrderBasedOnAndNumbering(sortOrder, basedOn, numbering)
        sectionSettingsSidebar.verifyCheckboxes()
        sidebarButtons.clickOn('Cancel')
        sectionsPage.getHiddenSectionList().should('contain.text', sectionName)
    });

    it('Edit settings for SCP archetype section', function () {
        const UUID = createUUID()
        const sectionName = 'automated-name-' + UUID + ' Scholarly Contributions'
        const displayStyle = this.expectedSettingsValues.displayStyle.TraditionalDate
        const sortOrder = this.expectedSettingsValues.sortOrder.Ascending
        const basedOn = this.expectedSettingsValues.basedOn.StartSemester
        const numbering = this.expectedSettingsValues.numbering.RestartNumbering
        sectionSettingsSidebar.modifyCommonFieldsOnSection('Scholarly Contributions', sectionName, 'automated-desc-' + UUID, displayStyle)
        sectionSettingsSidebar.modifySortOrderBasedOnAndNumbering(sortOrder, basedOn, numbering)
        sectionSettingsSidebar.modifyCheckboxes()
        sidebarButtons.clickOn('Apply Changes')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).should('contain.text', displayStyle)
        sectionSettingsSidebar.verifySortOrderBasedOnAndNumbering(sortOrder, basedOn, numbering)
        sectionSettingsSidebar.verifyCheckboxes()
        sidebarButtons.clickOn('Cancel')
        sectionsPage.getHiddenSectionList().should('contain.text', sectionName)
    });

    it('Edit and dismiss changes for section settings', function () {
        const displayStyle = this.expectedSettingsValues.displayStyle.TraditionalDate
        sectionsPage.getHiddenSectionList().contains('Scholarly Contributions').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        // change display style, click back and verify changes are dismissed
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).click()
        cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(displayStyle).click()
        sidebarButtons.clickOn('Back')
        cy.get(popupButtonsSelectors.yesButton).click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).should('not.contain.text', displayStyle)
        // change display style, click cancel and verify sidebar is closed
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).click()
        cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(displayStyle).click()
        sidebarButtons.clickOn('Cancel')
        cy.get(popupButtonsSelectors.yesButton).click()
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).should('not.be.visible')
    });

    it('Change order of columns on tabular display style', function () {
        sectionsPage.getHiddenSectionList().contains('Scholarly Contributions').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).click()
        cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(this.expectedSettingsValues.displayStyle.Tabular).click()
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        // move column up and verify operation happened
        var columnName: string
        sectionSettingsSidebar.getColumnName(1).then((name) => {
            columnName = name
        });
        sectionSettingsSidebar.moveNthColumnUp(1)
        sectionSettingsSidebar.getColumnName(0).then((name) => {
            assert.strictEqual(name, columnName)
        });
        // move column down and verify operation happened
        var anotherColumnName: string
        sectionSettingsSidebar.getColumnName(5).then((name) => {
            anotherColumnName = name
        });
        sectionSettingsSidebar.moveNthColumnDown(5)
        sectionSettingsSidebar.getColumnName(6).then((name) => {
            assert.strictEqual(name, anotherColumnName)
        });
        // apply changes and navigate back to see changes are persisted
        sidebarButtons.clickOn('Apply Changes')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        sectionSettingsSidebar.getColumnName(0).then((name) => {
            assert.strictEqual(name, columnName)
        });
        sectionSettingsSidebar.getColumnName(6).then((name) => {
            assert.strictEqual(name, anotherColumnName)
        });
    });

    it('Verify show/hide functionality for columns on tabular display style', function () {
        sectionsPage.getHiddenSectionList().contains('Scholarly Contributions').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).click()
        cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(this.expectedSettingsValues.displayStyle.Tabular).click()
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        // make a column hidden (all are shown by default)
        var columnState: string
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            columnState = state
        });
        sectionSettingsSidebar.makeNthColumnShownOrHidden(4)
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            assert.notDeepEqual(state, columnState)
        });
        // apply changes and check that changes are persisted
        sidebarButtons.clickOn('Apply Changes')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            assert.notDeepEqual(state, columnState)
        });
        // make same column shown and verify result
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            columnState = state
        });
        sectionSettingsSidebar.makeNthColumnShownOrHidden(4)
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(4).then((state) => {
            assert.notDeepEqual(state, columnState)
        });
    });

    it.only('Change column order on tabular display style and dismiss changes', function () {
        sectionsPage.getHiddenSectionList().contains('Grants').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).click()
        cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(this.expectedSettingsValues.displayStyle.Tabular).click()
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        // get the name of the column with index = 0
        var columnName: string
        sectionSettingsSidebar.getColumnName(0).then((name) => {
            columnName = name
        });
        // move column with index = 1 to index = 0
        sectionSettingsSidebar.moveNthColumnUp(1)
        // verify column has been moved
        sectionSettingsSidebar.getColumnName(0).then((name) => {
            assert.notDeepEqual(name, columnName)
        });
        // discard changes
        sidebarButtons.clickOn('Back')
        cy.get(popupButtonsSelectors.yesButton).click()
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        // verify changes have been discarded
        sectionSettingsSidebar.getColumnName(0).then((name) => {
            assert.strictEqual(name, columnName)
        });
    });

    it.only('Change visibility for a column on tabular display style and dismiss changes', function () {
        sectionsPage.getHiddenSectionList().contains('Grants').parent().parent().parent().contains("Edit").click()
        sidebarButtons.clickOnEditSectionSiderbarButton('Settings')
        cy.get(sectionSettingsSidebarSelectors.displayStyleOptions).click()
        cy.get(sectionSettingsSidebarSelectors.dropdownOptionList).contains(this.expectedSettingsValues.displayStyle.Tabular).click()
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        // get the visibility state of the column with index = 0
        var columnState: string
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(0).then((state) => {
            columnState = state
        });
        // change visibility state of the column with index = 0
        sectionSettingsSidebar.makeNthColumnShownOrHidden(0)
        // verify column visibility has been changed
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(0).then((state) => {
            assert.notDeepEqual(state, columnState)
        });
        // discard changes
        sidebarButtons.clickOn('Back')
        cy.get(popupButtonsSelectors.yesButton).click()
        cy.get(sectionSettingsSidebarSelectors.editTableColumnsButton).children().click()
        // verify changes have been discarded
        sectionSettingsSidebar.getNthColumnShownOrHiddenState(0).then((state) => {
            assert.strictEqual(state, columnState)
        });
    });
});