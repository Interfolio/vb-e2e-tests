export class SidebarButtons {
    private static blueColoredButtons = '.ant-btn.ant-btn-primary'
    private static whiteColoredButtons = '.ant-btn.ant-btn-default'
    private static noBorderButtons = '.ant-btn.ant-btn-link'
    private static archiveButton = '.m-l-small.ant-btn.ant-btn-danger'

    public static clickOn(buttonText: string) {
        const { blueColoredButtons, whiteColoredButtons, noBorderButtons, archiveButton } = this;
        switch (buttonText) {
            case "Apply Changes":
                return cy.get(blueColoredButtons).contains(buttonText).click({ force: true });
            case "Cancel":
                return cy.get(whiteColoredButtons).contains(buttonText).click({ force: true });
            case "Close":
                return cy.get(noBorderButtons).contains(buttonText).click({ force: true });
            case "Archive":
                return cy.get(archiveButton).contains(buttonText).click({ force: true });
            default:
                return "Button not found"
        }
    }
}