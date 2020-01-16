export const destinationField = '#Koan-magic-carpet-koan-search-bar__input'
export const listOfDestinationResults = '._121z06r2'
export const listOfAvailableCheckInAndCheckOutDates = 'td[aria-disabled=false]'
export const guestPicker = '#lp-guestpicker'
export const addAndSubstractList = '._1iz654np'
export const saveGuestsButton = '._b0ybw8s'
export const searchButton = '._1vs0x720'

export function addOrRemoveGuests(action) {
    switch (action) {
        case 'Substract Adults':
            return 0;
        case 'Add Adults':
            return 1;
        case 'Substract Children':
            return 2;
        case 'Add Children':
            return 3;
        case 'Substract Infants':
            return 4;
        case 'Add Infants':
            return 5;
        default:
            return 'Operation not found'
    }
}

export function addOrSubstractGuests(operation, adults = 0, children = 0, infants = 0) {
    for (let i = 0; i < adults; i++) {
        cy.get(addAndSubstractList).eq(addOrRemoveGuests(operation + ' Adults')).click()
    }
    for (let i = 0; i < children; i++) {
        cy.get(addAndSubstractList).eq(addOrRemoveGuests(operation + ' Children')).click()
    }
    for (let i = 0; i < infants; i++) {
        cy.get(addAndSubstractList).eq(addOrRemoveGuests(operation + ' Infants')).click()
    }
}
