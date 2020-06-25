export const reorderSelectors = {
    elementsList: '.m-b-tiny.cdk-drag:nth-child(n) .section',
}

export function getColumnName(index: number) {
    return cy.log(`get column number ${index} name`).get(reorderSelectors.elementsList).eq(index).children().eq(1).invoke('text')
}

export function makeNthColumnShownOrHidden(index: number) {
    return cy.log(`make column number ${index} Shown or Hidden`).get(reorderSelectors.elementsList).eq(index).children().eq(2).click()
}

export function moveNthColumnUp(index: number) {
    return cy.log(`move column number ${index} up`).get(reorderSelectors.elementsList).eq(index).children().eq(3).children().eq(0).click()
}

export function moveNthColumnDown(index: number) {
    return cy.log(`move column number ${index} down`).get(reorderSelectors.elementsList).eq(index).children().eq(3).children().eq(2).click()
}

export function getNthColumnShownOrHiddenState(index: number) {
    return cy.log(`get number ${index} column shown or hidden state`).get(reorderSelectors.elementsList).eq(index).children().eq(2).invoke('text')
}