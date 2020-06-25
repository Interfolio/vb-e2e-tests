import { appCookies, checkURLcontains, createUUID } from '../components/helper';
import { vitaTablePageSelectors } from '../components/pages/vitaTablePage'
import { createVitaPageSelectors } from '../components/pages/createVitaPage'
import { viewVitaPageSelectors } from '../components/pages/viewVitaPage'
import * as viewVitaPage from '../components/pages/viewVitaPage'
import * as createVitaPage from '../components/pages/createVitaPage'


describe('Create vita tests', () => {
    before(() => {
        cy.LogInUsingAPI()
    });

    beforeEach(() => {
        cy.visit('vitas')
        checkURLcontains('/vitas', 30000)
        Cypress.Cookies.preserveOnce(...appCookies);
        cy.get(vitaTablePageSelectors.vitaNamelist, { timeout: 20000 }).should('have.length.greaterThan', 0)
        cy.fixture('vitaTable.json').as('expectedValues');
    });

    it('Create institutional vita and verify citation format is disabled', function () {
        const UUID = createUUID()
        cy.get(vitaTablePageSelectors.addVitaButton).click()
        cy.get(createVitaPageSelectors.personalAndInstitutionalCheckBox).contains('Institutional').click()
        var vitaName = 'automated Name ' + UUID
        var vitaDescription = 'automated Description ' + UUID
        cy.get(createVitaPageSelectors.vitaNameField).type(vitaName)
        cy.get(createVitaPageSelectors.vitaDescriptionField).type(vitaDescription)
        createVitaPage.selectUnitAndTemplate(0,0)
        cy.get(createVitaPageSelectors.createVitaButton).click()
        cy.get(viewVitaPageSelectors.vitaName).should('contain.text', vitaName)
        cy.get(viewVitaPageSelectors.vitaDescription).should('contain.text', vitaDescription)
        cy.get(viewVitaPageSelectors.citationDropdown).parent().parent().parent().should('have.class', viewVitaPageSelectors.citationDropdownDisabled)
        viewVitaPage.clickOn('Back to Vitas')
        cy.get(vitaTablePageSelectors.personalInstitutionalorArchivedTab).contains('Institutional').click()
        cy.get(vitaTablePageSelectors.searchBar).type(vitaName)
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 1).and('contain.text', vitaName)
    });

    it('Create Personal vita and verify citation format is enabled', function () {
        const UUID = createUUID()
        cy.get(vitaTablePageSelectors.addVitaButton).click()
        cy.get(createVitaPageSelectors.personalAndInstitutionalCheckBox).contains('Personal').click()
        var vitaName = 'automated Name ' + UUID
        var vitaDescription = 'automated Description ' + UUID
        cy.get(createVitaPageSelectors.vitaNameField).type(vitaName)
        cy.get(createVitaPageSelectors.vitaDescriptionField).type(vitaDescription)
        cy.get(createVitaPageSelectors.templateDropdown).click().wait(1000)
        cy.get(createVitaPageSelectors.dropdownOptions).eq(0).click()
        cy.get(createVitaPageSelectors.createVitaButton).click()
        cy.get(viewVitaPageSelectors.vitaName).should('contain.text', vitaName)
        cy.get(viewVitaPageSelectors.vitaDescription).should('contain.text', vitaDescription)
        cy.get(viewVitaPageSelectors.citationDropdown).parent().parent().parent().should('have.class', viewVitaPageSelectors.citationDropdownEnabled)
        viewVitaPage.clickOn('Back to Vitas')
        cy.get(vitaTablePageSelectors.searchBar).type(vitaName)
        cy.get(vitaTablePageSelectors.vitaNamelist).should('have.length', 1).and('contain.text', vitaName)
    });

    it('Verify Vita name, description and template are required', function () {
        cy.get(vitaTablePageSelectors.addVitaButton).click()
        cy.get(createVitaPageSelectors.personalAndInstitutionalCheckBox).contains('Institutional').click()
        cy.get(createVitaPageSelectors.createVitaButton).click()
        cy.get(createVitaPageSelectors.vitaNameField).parent().parent().should('have.class', createVitaPageSelectors.fieldInError)
        cy.get(createVitaPageSelectors.vitaDescriptionField).parent().parent().should('have.class', createVitaPageSelectors.fieldInError)
        cy.get(createVitaPageSelectors.templateDropdown).parent().parent().parent().should('have.class', createVitaPageSelectors.fieldInError)
        cy.get(createVitaPageSelectors.vitaNameField).type('something')
        cy.get(createVitaPageSelectors.vitaNameField).should('not.have.class', createVitaPageSelectors.fieldInError)
        cy.get(createVitaPageSelectors.vitaDescriptionField).type('something')
        cy.get(createVitaPageSelectors.vitaDescriptionField).should('not.have.class', createVitaPageSelectors.fieldInError)
        createVitaPage.selectUnitAndTemplate(0, 0)
        cy.get(createVitaPageSelectors.templateDropdown).parent().parent().parent().should('not.have.class', createVitaPageSelectors.fieldInError)
        cy.get(createVitaPageSelectors.cancelVitaCreationButton).click()
    });

    it('Verify Vita name must be unique per vita type for personal vitas', function () {
        cy.get(vitaTablePageSelectors.addVitaButton).click()
        // try to create a personal vita with an already existing name
        cy.get(createVitaPageSelectors.vitaNameField).type(this.expectedValues.personalVitas[0][0])
        cy.get(createVitaPageSelectors.vitaDescriptionField).type('something')
        cy.get(createVitaPageSelectors.templateDropdown).click().wait(1000)
        cy.get(createVitaPageSelectors.dropdownOptions).eq(0).click()
        cy.get(createVitaPageSelectors.createVitaButton).click()
        cy.get(createVitaPageSelectors.vitaNameField).parent().parent().should('have.class', createVitaPageSelectors.fieldInError)
        cy.get(createVitaPageSelectors.uniqueNameError).should('exist')
        // try to create a institutional vita with an already existing name
        cy.get(createVitaPageSelectors.personalAndInstitutionalCheckBox).contains('Institutional').click()
        cy.get(createVitaPageSelectors.vitaNameField).clear().type(this.expectedValues.institutionalVitas[0][0])
        createVitaPage.selectUnitAndTemplate(0, 0)
        cy.get(createVitaPageSelectors.createVitaButton).click()
        cy.get(createVitaPageSelectors.vitaNameField).parent().parent().should('have.class', createVitaPageSelectors.fieldInError)
        cy.get(createVitaPageSelectors.uniqueNameError).should('exist')
        // create institutional vita with a already existing personal vita name
        cy.get(createVitaPageSelectors.vitaNameField).clear().type(this.expectedValues.personalVitas[0][0])
        cy.get(createVitaPageSelectors.createVitaButton).click()
        cy.get(viewVitaPageSelectors.vitaName).should('contain.text', this.expectedValues.personalVitas[0][0])
        // create personal vita with an already existing institutional name
        viewVitaPage.clickOn('Back to Vitas')
        cy.get(vitaTablePageSelectors.addVitaButton).click()
        cy.get(createVitaPageSelectors.vitaNameField).type(this.expectedValues.institutionalVitas[0][0])
        cy.get(createVitaPageSelectors.vitaDescriptionField).type('something')
        createVitaPage.selectUnitAndTemplate(0, 0)
        cy.get(createVitaPageSelectors.createVitaButton).click()
        cy.get(viewVitaPageSelectors.vitaName).should('contain.text', this.expectedValues.institutionalVitas[0][0])
    });
});