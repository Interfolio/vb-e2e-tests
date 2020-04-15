import * as sectionsPage from "../components/pages/sectionsPage"
import { appCookies, checkURLcontains, clickOnEditButtonForASpecificTemplate } from '../components/helper'
import { sectionsPageSelectors } from "../components/pages/sectionsPage"
import { popupButtonsSelectors } from '../components/buttons/popupButtons';

describe('Show/Hide/Duplicate sections tests', () => {
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
    });

    it('Verify moving a section to shown using arrow up', function () {
        var initialNumberOfHiddenSections: number, sectionName: any, initialNumberOfShownSections: number
        // get initial number of shown sections
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((initialShownSections) =>
            initialNumberOfShownSections = sectionsPage.getNumberOfSections(initialShownSections.text()))
        // get initial number of hidden sections
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Hidden').then((initialHiddenSections) =>
            initialNumberOfHiddenSections = sectionsPage.getNumberOfSections(initialHiddenSections.text())
        );
        // get the name of the section that is about to be moved to shown
        sectionsPage.getHiddenSectionList().eq(0).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            sectionName = element.text().substring(0, indexOfEdit)
        });
        // move one section to shown
        sectionsPage.getHiddenSectionList().eq(0).find(sectionsPageSelectors.moveSectionUpButton).click()
        // save changes
        sectionsPage.clickOn('Save')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Back')
        clickOnEditButtonForASpecificTemplate(templateIndex)
        // verify the number of shown sections increased by 1 
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((shownSectionsAfterChange) => {
            let shownSections = sectionsPage.getNumberOfSections(shownSectionsAfterChange.text())
            assert.strictEqual(shownSections, initialNumberOfShownSections + 1)
            //verify section name is now in shown list 
            sectionsPage.getShownSectionList().eq(shownSections - 1).last().then((element) => {
                let indexOfEdit = element.text().indexOf('Edit')
                assert.strictEqual(element.text().substring(0, indexOfEdit), sectionName)
            });
        });
        // verify the number of hidden sections decreased by 1 
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Hidden').then((hiddenSectionsAfterChange) =>
            assert.strictEqual(sectionsPage.getNumberOfSections(hiddenSectionsAfterChange.text()), initialNumberOfHiddenSections - 1)
        );
    });

    it('Verify moving a section to hidden using arrow down', function () {
        var initialNumberOfHiddenSections: number, sectionName: string, initialNumberOfShownSections: number
        // get initial number of shown sections
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((initialShownSections) =>
            initialNumberOfShownSections = sectionsPage.getNumberOfSections(initialShownSections.text()))
        // get initial number of hidden sections
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Hidden').then((initialHiddenSections) =>
            initialNumberOfHiddenSections = sectionsPage.getNumberOfSections(initialHiddenSections.text())
        );
        // get the name of the section that is about to be moved to hidden
        sectionsPage.getShownSectionList().eq(0).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            sectionName = element.text().substring(0, indexOfEdit)
        });
        // move down section to hidden
        sectionsPage.getShownSectionList().last().find(sectionsPageSelectors.moveSectionDownButton).click()
        // save changes
        sectionsPage.clickOn('Save')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Back')
        clickOnEditButtonForASpecificTemplate(templateIndex)
        // verify the number of hidden sections increased by 1 
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Hidden').then((hiddenSectionsAfterChange) => {
            assert.strictEqual(sectionsPage.getNumberOfSections(hiddenSectionsAfterChange.text()), initialNumberOfHiddenSections + 1)
            //verify section name is now in hidden list 
            sectionsPage.getShownSectionList().eq(0).last().then((element) => {
                let indexOfEdit = element.text().indexOf('Edit')
                assert.strictEqual(element.text().substring(0, indexOfEdit), sectionName)
            });
        });
        // verify the number of shown sections decreased by 1 
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((shownSectionsAfterChange) =>
            assert.strictEqual(sectionsPage.getNumberOfSections(shownSectionsAfterChange.text()), initialNumberOfShownSections - 1)
        );
    });

    it('Verify moving all sections to shown works', function () {
        var totalNumberOfSections: number, numberOfShownSections: number, numberOfHiddenSections: number
        // get number of shown sections
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((shownSections) =>
            numberOfShownSections = sectionsPage.getNumberOfSections(shownSections.text()))
        // get initial number of hidden sections
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Hidden').then((hiddenSections) => {
            numberOfHiddenSections = sectionsPage.getNumberOfSections(hiddenSections.text())
            totalNumberOfSections = numberOfHiddenSections + numberOfShownSections
            // move all sections to shown
            for (let i = 0; i < numberOfHiddenSections; i++)
                sectionsPage.getHiddenSectionList().eq(0).find(sectionsPageSelectors.moveSectionUpButton).click()
        });
        // save changes
        sectionsPage.clickOn('Save')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Back')
        clickOnEditButtonForASpecificTemplate(templateIndex)
        // verify all sections are now shown
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Shown').then((shownSectionsAfterChange) => {
            assert.strictEqual(sectionsPage.getNumberOfSections(shownSectionsAfterChange.text()), totalNumberOfSections)
        });
        // verify the number of hidden sections is 0
        cy.get(sectionsPageSelectors.shownOrHiddenSectionsCount).contains('Hidden').then((hiddenSectionsAfterChange) =>
            assert.strictEqual(sectionsPage.getNumberOfSections(hiddenSectionsAfterChange.text()), 0)
        );
    });

    it('Verify Hide Section works', function () {
        var sectionName: string
        // get the name of the section that is about to be moved to hidden
        sectionsPage.getShownSectionList().eq(0).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            sectionName = element.text().substring(0, indexOfEdit)
        });
        // click "Hide Section" button
        sectionsPage.getShownSectionList().eq(0).find(sectionsPageSelectors.showOrHideSectionButton).click()
        // save changes
        sectionsPage.clickOn('Save')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Back')
        clickOnEditButtonForASpecificTemplate(templateIndex)
        // verify section is now in hidden section
        sectionsPage.getHiddenSectionList().eq(0).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            assert.strictEqual(element.text().substring(0, indexOfEdit), sectionName)
        });
    });

    it('Verify Shown Section works', function () {
        var sectionName: string
        // get the name of the section that is about to be moved to shown
        sectionsPage.getHiddenSectionList().eq(0).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            sectionName = element.text().substring(0, indexOfEdit)
        });
        // click "Show Section" button
        sectionsPage.getHiddenSectionList().eq(0).find(sectionsPageSelectors.showOrHideSectionButton).click()
        // save changes
        sectionsPage.clickOn('Save')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Back')
        clickOnEditButtonForASpecificTemplate(templateIndex)
        // verify section is now in shown section
        sectionsPage.getShownSectionList().eq(-1).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            assert.strictEqual(element.text().substring(0, indexOfEdit), sectionName)
        });
    });

    it.only('Verify Duplicate works on shown sections', function () {
        var sectionName: any
        // get the name of the section that is about to be duplicated
        sectionsPage.getShownSectionList().eq(0).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            sectionName = element.text().substring(0, indexOfEdit)
        });
        // click "Duplicate" button
        sectionsPage.getShownSectionList().eq(0).contains("Duplicate").click()
        cy.get(popupButtonsSelectors.yesButton).click().wait(1000)
        // save changes
        sectionsPage.clickOn('Save')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Back')
        clickOnEditButtonForASpecificTemplate(templateIndex)
        // verify a new section is created with name "Copy of" + original name
        sectionsPage.getShownSectionList().eq(1).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            assert.strictEqual(element.text().substring(0, indexOfEdit), ' Copy of' + sectionName)
        });
    });

    it.only('Verify Duplicate works on hidden sections', function () {
        var sectionName: any
        // get the name of the section that is about to be duplicated
        sectionsPage.getHiddenSectionList().eq(0).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            sectionName = element.text().substring(0, indexOfEdit)
        });
        // click "Duplicate" button
        sectionsPage.getHiddenSectionList().eq(0).contains("Duplicate").click()
        cy.get(popupButtonsSelectors.yesButton).click().wait(1000)
        // save changes
        sectionsPage.clickOn('Save')
        cy.get(popupButtonsSelectors.toastMessage).should('be.visible')
        sectionsPage.clickOn('Back')
        clickOnEditButtonForASpecificTemplate(templateIndex)
        // verify a new section is created with name "Copy of" + original name
        sectionsPage.getHiddenSectionList().eq(1).last().then((element) => {
            let indexOfEdit = element.text().indexOf('Edit')
            assert.strictEqual(element.text().substring(0, indexOfEdit), ' Copy of' + sectionName)
        });
    });
});