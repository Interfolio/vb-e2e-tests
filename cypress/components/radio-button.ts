export class RadioButton {
    private static radioButtonOnState = 'ant-radio ant-radio-checked'
    private static allRadioButtons = '.ant-radio-group'
    private static uncheckedRadioButtonList = 'label[class=ant-radio-wrapper]'

    public static checkState(isOn: boolean, index: number) {
        const { allRadioButtons, radioButtonOnState } = this;
        if (isOn) {
            cy.get(allRadioButtons).eq(index).children().eq(0).children().eq(0).should('have.class', radioButtonOnState)
            cy.get(allRadioButtons).eq(index).children().eq(1).children().eq(0).should('not.have.class', radioButtonOnState)
        } else {
            cy.get(allRadioButtons).eq(index).children().eq(0).children().eq(0).should('not.have.class', radioButtonOnState)
            cy.get(allRadioButtons).eq(index).children().eq(1).children().eq(0).should('have.class', radioButtonOnState)
        }
    }

    public static verifyStates(...radioButton: any[]) {
        radioButton.forEach((state, index) => {
            RadioButton.checkState(state, index);
        })
    }

    public static clickEachRadioButton() {
        const { uncheckedRadioButtonList } = this;
        cy.get(uncheckedRadioButtonList).click({ multiple: true })
    }
}