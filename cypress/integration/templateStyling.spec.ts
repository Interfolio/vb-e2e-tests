import * as sectionsPage from "../pages/sectionsPage"
import { appCookies, checkURLcontains } from '../pages/helper'
import * as templateStylingSidebar from "../pages/templateStylingSidebar"
import { templatesTableSelectors } from "../pages/templatesTable"
import { sectionsPageSelectors } from "../pages/sectionsPage"
import { templateStylingSidebarSelectors } from "../pages/templateStylingSidebar"
import { SidebarButtons } from "../components/sidebar-buttons"
import { discardChangesPopup } from '../pages/discardChangesPopup';

describe('Template styling sidebar tests', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('/')
        checkURLcontains('/setup', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);

        cy.get(templatesTableSelectors.editCloneAndArchiveButtonList, { timeout: 30000 }).eq(12).contains('Edit').click()
        checkURLcontains('/edit', 30000)
        cy.get(sectionsPageSelectors.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')

        cy.fixture('templateStyling.json').as('expectedStylingValues');
    });

    it('Edit and apply display style and citation style from template styling sidebar', function () {
        cy.get(templateStylingSidebarSelectors.sidebarTitle).should('contain', 'Edit Template Styling')
        templateStylingSidebar.selectAnOptionFromADropdown('Display Style', this.expectedStylingValues.displayStyle.Tabular)
        templateStylingSidebar.selectAnOptionFromADropdown('Citation Style', this.expectedStylingValues.citationStyle.B)
        SidebarButtons.clickOn('Apply Changes')
        cy.get(templateStylingSidebarSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.displayStyleDropdown).should('contain.text', this.expectedStylingValues.displayStyle.Tabular)
        cy.get(templateStylingSidebarSelectors.citationDropdown).should('contain.text', this.expectedStylingValues.citationStyle.B)
    });

    it('Edit and apply title options from template styling sidebar', function () {
        const expectedTitleValues = [
            this.expectedStylingValues.fontFamily.Arial,
            this.expectedStylingValues.fontSize.s32px,
            this.expectedStylingValues.fontColor.cF08080,
            this.expectedStylingValues.fontSize.s32px,
            this.expectedStylingValues.fontSize.s32px
        ]
        templateStylingSidebar.selectStylingOptions('Bold', 'Italic', 'Underline', 'Align Left', 'Justify')
        templateStylingSidebar.selectOptionsFromDropdown(expectedTitleValues)
        SidebarButtons.clickOn('Apply Changes')
        cy.get(templateStylingSidebarSelectors.toastMessage, { timeout: 10000 }).should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        templateStylingSidebar.verifyStylingOptionsAreSelected('Bold', 'Italic', 'Underline', 'Justify')
        templateStylingSidebar.verifyOptionsFromDropdown(expectedTitleValues)
    });

    it('Edit and apply heading options from template styling sidebar', function () {
        //edit heading 1
        const expectedHeadingOneValues = [
            this.expectedStylingValues.fontFamily.Monospace,
            this.expectedStylingValues.fontSize.s20px,
            this.expectedStylingValues.fontColor.cE9967A,
            this.expectedStylingValues.fontSize.s24px,
            this.expectedStylingValues.fontSize.s28px
        ]
        const expectedHeadingOneExtraValues = [
            this.expectedStylingValues.borderPlacement.Top,
            this.expectedStylingValues.fontSize.s32px
        ]
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Headlines').click()
        cy.get(templateStylingSidebarSelectors.headingsList).eq(0).click()
        templateStylingSidebar.selectStylingOptions('Bold', 'Italic', 'Align Center', 'Align Right')
        templateStylingSidebar.selectOptionsFromDropdown(expectedHeadingOneValues)
        templateStylingSidebar.selectExtraOptionsFromHeadingDropdown(expectedHeadingOneExtraValues)
        //edit heading 2
        cy.get(templateStylingSidebarSelectors.headingsList).eq(1).click().wait(1000)
        const expectedHeadingTwoValues = [
            this.expectedStylingValues.fontFamily.SansSerif,
            this.expectedStylingValues.fontSize.s8px,
            this.expectedStylingValues.fontColor.cCD5C5C,
            this.expectedStylingValues.fontSize.s12px,
            this.expectedStylingValues.fontSize.s16px
        ]
        const expectedHeadingTwoExtraValues = [
            this.expectedStylingValues.borderPlacement.Bottom,
            this.expectedStylingValues.fontSize.s30px
        ]
        templateStylingSidebar.selectStylingOptions('Bold', 'Underline', 'Align Right', 'Justify')
        templateStylingSidebar.selectOptionsFromDropdown(expectedHeadingTwoValues)
        templateStylingSidebar.selectExtraOptionsFromHeadingDropdown(expectedHeadingTwoExtraValues)
        //apply changes
        SidebarButtons.clickOn('Apply Changes')
        cy.get(templateStylingSidebarSelectors.toastMessage, { timeout: 10000 }).should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Headlines').click()
        cy.get(templateStylingSidebarSelectors.headingsList).eq(0).click()
        //verify heading 1
        templateStylingSidebar.verifyStylingOptionsAreSelected('Bold', 'Italic', 'Align Right')
        templateStylingSidebar.verifyOptionsFromDropdown(expectedHeadingOneValues)
        templateStylingSidebar.verifyHeadingOptionsFromDropdown(expectedHeadingOneExtraValues)
        //verify heading 2
        cy.get(templateStylingSidebarSelectors.headingsList).eq(1).click().wait(1000)
        templateStylingSidebar.verifyStylingOptionsAreSelected('Bold', 'Underline', 'Justify')
        templateStylingSidebar.verifyOptionsFromDropdown(expectedHeadingTwoValues)
        templateStylingSidebar.verifyHeadingOptionsFromDropdown(expectedHeadingTwoExtraValues)
    });

    it('Edit and apply paragraph options from template styling sidebar', function () {
        const expectedParagraphValues = [
            this.expectedStylingValues.fontFamily.Helvetica,
            this.expectedStylingValues.fontSize.s8px,
            this.expectedStylingValues.fontColor.cFFA07A,
            this.expectedStylingValues.fontSize.s24px,
            this.expectedStylingValues.fontSize.s32px
        ]
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Paragraph').click()
        templateStylingSidebar.selectStylingOptions('Underline', 'Bold', 'Align Center', 'Align Right', 'Justify')
        templateStylingSidebar.selectOptionsFromDropdown(expectedParagraphValues)
        SidebarButtons.clickOn('Apply Changes')
        cy.get(templateStylingSidebarSelectors.toastMessage, { timeout: 10000 }).should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Paragraph').click()
        templateStylingSidebar.verifyStylingOptionsAreSelected('Bold', 'Underline', 'Justify')
        templateStylingSidebar.verifyOptionsFromDropdown(expectedParagraphValues)
    });

    it('Edit citation style and discard change from template styling sidebar', function () {
        //this test needs different template than the one from beforeEach
        cy.visit('/')
        cy.get(templatesTableSelectors.editCloneAndArchiveButtonList, { timeout: 30000 }).eq(9).contains('Edit').click()
        checkURLcontains('/edit', 30000)
        cy.get(sectionsPageSelectors.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Paragraph').click()
        templateStylingSidebar.selectAnOptionFromADropdown('Display Style', this.expectedStylingValues.displayStyle.Listing)
        templateStylingSidebar.selectAnOptionFromADropdown('Citation Style', this.expectedStylingValues.citationStyle.D)
        SidebarButtons.clickOn('Cancel')
        cy.get(discardChangesPopup.cancelButton).click()
        SidebarButtons.clickOn('Close')
        cy.get(discardChangesPopup.yesButton).click()
        cy.get(templateStylingSidebarSelectors.sidebarTitle).should('not.be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.displayStyleDropdown).children().children().eq(0).children()
            .invoke('attr', 'title').then(text => expect(text).to.not.deep.equal(this.expectedStylingValues.displayStyle.Listing))
        cy.get(templateStylingSidebarSelectors.citationDropdown).children().children().eq(0).children()
            .invoke('attr', 'title').then(text => expect(text).to.not.deep.equal(this.expectedStylingValues.citationStyle.D))
    });

    it('Edit title options and discard changes from template styling sidebar', function () {
        //this test needs different template than the one from beforeEach
        cy.visit('/')
        cy.get(templatesTableSelectors.editCloneAndArchiveButtonList, { timeout: 30000 }).eq(9).contains('Edit').click()
        checkURLcontains('/edit', 30000)
        cy.get(sectionsPageSelectors.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        // edit and discard changes on title tab
        cy.get(templateStylingSidebarSelectors.fontFamilyDropdown).filter(':visible').click()
        cy.get(templateStylingSidebarSelectors.dropdownOptions).contains(this.expectedStylingValues.fontFamily.Arial).click()
        templateStylingSidebar.selectStylingOptions('Bold', 'Justify')
        SidebarButtons.clickOn('Cancel')
        cy.get(discardChangesPopup.cancelButton).click()
        SidebarButtons.clickOn('Close')
        cy.get(discardChangesPopup.yesButton).click()
        cy.get(templateStylingSidebarSelectors.sidebarTitle).should('not.be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.fontFamilyDropdown).children().children().eq(0).children()
            .invoke('attr', 'title').then(text => expect(text).to.not.deep.equal(this.expectedStylingValues.fontFamily.Arial))
        templateStylingSidebar.verifyDisplayStyleChangesAreDiscarded('Bold', 'Justify')
    });

    it('Edit headlines options and discard changes from template styling sidebar', function () {
        //this test needs different template than the one from beforeEach
        cy.visit('/')
        cy.get(templatesTableSelectors.editCloneAndArchiveButtonList, { timeout: 30000 }).eq(9).contains('Edit').click()
        checkURLcontains('/edit', 30000)
        cy.get(sectionsPageSelectors.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Headlines').click()
        // edit heading 1 and discard changes
        cy.get(templateStylingSidebarSelectors.headingsList).eq(0).click()
        cy.get(templateStylingSidebarSelectors.spaceBeforeDropdown).filter(':visible').click()
        cy.get(templateStylingSidebarSelectors.dropdownOptions).contains(this.expectedStylingValues.fontSize.s8px).click()
        templateStylingSidebar.selectStylingOptions('Underline', 'Align Center')
        // edit heading 2 and discard changes
        cy.get(templateStylingSidebarSelectors.headingsList).eq(1).click().wait(1000)
        cy.get(templateStylingSidebarSelectors.fontColorDropdown).filter(':visible').click()
        cy.get(templateStylingSidebarSelectors.dropdownOptions).contains(this.expectedStylingValues.fontColor.cFA8072).click()
        templateStylingSidebar.selectStylingOptions('Italic', 'Align Left')
        SidebarButtons.clickOn('Close')
        cy.get(discardChangesPopup.cancelButton).click()
        SidebarButtons.clickOn('Cancel')
        cy.get(discardChangesPopup.yesButton).click()
        cy.get(templateStylingSidebarSelectors.sidebarTitle).should('not.be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Headlines').click()
        // verify changes on heading 1 are discarded
        cy.get(templateStylingSidebarSelectors.headingsList).eq(0).click()
        cy.get(templateStylingSidebarSelectors.spaceBeforeDropdown).children().children().eq(0).children()
            .invoke('attr', 'title').then(text => expect(text).to.not.deep.equal(this.expectedStylingValues.fontSize.s8px))
        templateStylingSidebar.verifyDisplayStyleChangesAreDiscarded('Underline', 'Align Center')
        // verify changes on heading 2 are discarded
        cy.get(templateStylingSidebarSelectors.headingsList).eq(1).click().wait(1000)
        cy.get(templateStylingSidebarSelectors.fontColorDropdown).children().children().eq(0).children()
            .invoke('attr', 'title').then(text => expect(text).to.not.deep.equal(this.expectedStylingValues.fontColor.cFA8072))
        templateStylingSidebar.verifyDisplayStyleChangesAreDiscarded('Italic', 'Align Left')
    });

    it('Edit title options and discard changes from template styling sidebar', function () {
        //this test needs different template than the one from beforeEach
        cy.visit('/')
        cy.get(templatesTableSelectors.editCloneAndArchiveButtonList, { timeout: 30000 }).eq(9).contains('Edit').click()
        checkURLcontains('/edit', 30000)
        cy.get(sectionsPageSelectors.sectionPageTitle, { timeout: 30000 }).contains('Sections').should('be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        // edit and discard changes on paragraph tab
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Paragraph').click()
        cy.get(templateStylingSidebarSelectors.spaceAfterDropdown).filter(':visible').click()
        cy.get(templateStylingSidebarSelectors.dropdownOptions).contains(this.expectedStylingValues.fontSize.s16px).click()
        templateStylingSidebar.selectStylingOptions('Align Right')
        SidebarButtons.clickOn('Close')
        cy.get(discardChangesPopup.cancelButton).click()
        SidebarButtons.clickOn('Cancel')
        cy.get(discardChangesPopup.yesButton).click()
        cy.get(templateStylingSidebarSelectors.sidebarTitle).should('not.be.visible')
        sectionsPage.clickOn('Edit Template Styling')
        cy.get(templateStylingSidebarSelectors.tabsList).contains('Paragraph').click()
        cy.get(templateStylingSidebarSelectors.spaceAfterDropdown).children().children().eq(0).children()
            .invoke('attr', 'title').then(text => expect(text).to.not.deep.equal(this.expectedStylingValues.fontSize.s16px))
        templateStylingSidebar.verifyDisplayStyleChangesAreDiscarded('Align Right')
    });
});
