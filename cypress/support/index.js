import './commands'

before(() => {
    cy.LogInUsingAPI()
    cleanEnvironment()
    //get template names and ids from seedData.json
    cy.fixture('seedData.json').then((seedData) => {
        //create one template then use its ID as base template for all other templates
        cy.log('Create first template').createTemplateAPI(seedData.activeTemplates[0].name, seedData.activeTemplates[0].unitId, 1)
        let baseTemplateId
        cy.log('Get all templates call in order to get base template id').getAllTemplateIdsAPI(true).then(data => {
            baseTemplateId = data.vitaTemplates.items[0].id
            //create active test templates
            seedData.activeTemplates.forEach(template => cy.log('Create active templates').createTemplateAPI(template.name, template.unitId, baseTemplateId))
            //create archived test templates and update them as archived
            seedData.archivedTemplates.forEach(template => {
                cy.log('Create archived templates').createTemplateAPI(template.name, template.unitId, baseTemplateId).then(data => {
                    cy.log('Update templates to archived').updateTemplateToArchivedAPI(data.createVitaTemplate.id, template.name, template.unitId, baseTemplateId, false)
                });
            });
        });
    });
});

after(() => {
    //cleanEnvironment()
});

function cleanEnvironment() {
    // get all active template ids
    let IdsForDeletion = []
    cy.log('Get all active templates for deletion').getAllTemplateIdsAPI(true).then(data => {
        if (data.vitaTemplates.items.length != 0) {
            data.vitaTemplates.items.forEach(ids => IdsForDeletion.push(ids.id))
        }
    })
    //delete all active templates
    cy.log('Delete active templates').deleteTemplatesByIdsAPI(IdsForDeletion)
    IdsForDeletion = []
    // get all archived template ids
    cy.log('Get all archived templates for deletion').getAllTemplateIdsAPI(false).then(data => {
        if (data.vitaTemplates.items.length != 0) {
            data.vitaTemplates.items.forEach(ids => IdsForDeletion.push(ids.id))
        }
    })
    //delete all archived templates
    cy.log('Delete all archived templated').deleteTemplatesByIdsAPI(IdsForDeletion)
}