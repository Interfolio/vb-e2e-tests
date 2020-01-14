import * as airMP from "../pages/airMainPage"

describe('air', function () {
    const SEVEN_DAYS = 7
    const FORTEEN_DAYS = 14

    beforeEach(() => {
        cy.fixture('air.json').as('airStuff');
        cy.visit('/')
    });

    it('Just a test', function () {
        cy.get(airMP.destinationField).type(this.airStuff.destination)
        cy.get(airMP.listOfDestinationResults).first().click()
        cy.get(airMP.listOfAvailableCheckInAndCheckOutDates).eq(SEVEN_DAYS).click()
        cy.get(airMP.listOfAvailableCheckInAndCheckOutDates).eq(FORTEEN_DAYS).click({ force: true })
        cy.get(airMP.guestPicker).click()

        airMP.addOrSubstractGuests('Add',2,2,1)
        airMP.addOrSubstractGuests('Substract',0,2,1)

        cy.get(airMP.saveGuestsButton).click()
        cy.get(airMP.searchButton).click()
        console.log(this.airStuff.destination)

    })
})