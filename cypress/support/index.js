import './commands'

before(() => {
    cy.LogInUsingAPI()
    deleteAllVitas()
    deleteAllTemplates()
    //get template names and ids from seedData.json
    cy.fixture('seedData.json').then((seedData) => {
        //create one template then use its ID as base template for all other templates
        cy.log('Create first template').createTemplateAPI(seedData.activeTemplates[0].name, seedData.activeTemplates[0].unitId, 6547, true)
        let baseTemplateId
        cy.log('Get all templates call in order to get base template id').getAllTemplateIdsAPI(true).then(data => {
            baseTemplateId = data.vitaTemplates.items[0].id
            //create active test templates
            seedData.activeTemplates.forEach(template => cy.log('Create active templates').createTemplateAPI(template.name, template.unitId, baseTemplateId, true))
            //create archived test templates
            seedData.archivedTemplates.forEach(template => {
                cy.log('Create archived templates').createTemplateAPI(template.name, template.unitId, baseTemplateId, false)
            });
            createVitas(baseTemplateId)
        });
    });
});

after(() => {
    //deleteAllVitas()
    //deleteAllTemplates()
});

function createVitas(baseTemplateId) {
    cy.fixture('seedData.json').then((seedData) => {
        //create personal vitas, first half of vitas with one template id, other half with another template id
        for (let i = 0; i < seedData.personalVitas.length / 2; i++) {
            cy.log('Create personal vitas').createVitaAPI(seedData.personalVitas[i].name, 2, baseTemplateId, true)
        }
        for (let i = seedData.personalVitas.length / 2; i < seedData.personalVitas.length; i++) {
            cy.log('Create personal vitas').createVitaAPI(seedData.personalVitas[i].name, 2, parseInt(baseTemplateId) + 1, true)
        }
        //create institutional vitas, first half of vitas with one template id, other half with another template id
        for (let i = 0; i < seedData.institutionalVitas.length / 2; i++) {
            cy.log('Create institutional vitas').createVitaAPI(seedData.institutionalVitas[i].name, 1, baseTemplateId, true)
        }
        for (let i = seedData.personalVitas.length / 2; i < seedData.institutionalVitas.length; i++) {
            cy.log('Create institutional vitas').createVitaAPI(seedData.institutionalVitas[i].name, 1, parseInt(baseTemplateId) + 10, true) // + 10 so it takes a base template with a different unit
        }
        //create archived vitas, first half institutional, other half personal
        for (let i = 0; i < seedData.archivedVitas.length / 2; i++) {
            cy.log('Create archived vitas').createVitaAPI(seedData.archivedVitas[i].name, 1, baseTemplateId, false)
        }
        for (let i = seedData.personalVitas.length / 2; i < seedData.archivedVitas.length; i++) {
            cy.log('Create archived vitas').createVitaAPI(seedData.archivedVitas[i].name, 2, parseInt(baseTemplateId) + 10, false)
        }
    });
}

function deleteAllTemplates() {
    // get all active template ids
    var IdsForDeletion = []
    cy.log('Get all active templates for deletion').getAllTemplateIdsAPI(true).then(data => {
        if (data.vitaTemplates.items.length != 0) {
            data.vitaTemplates.items.forEach(ids => IdsForDeletion.push(+ids.id))
        }

        const index = IdsForDeletion.indexOf(6547, 0);
        if (index > -1) {
            IdsForDeletion.splice(index, 1);
        }

        //delete all active templates
        cy.log('Delete active templates').deleteTemplatesByIdsAPI(IdsForDeletion)
    })
    IdsForDeletion = []
    // get all archived template ids
    cy.log('Get all archived templates for deletion').getAllTemplateIdsAPI(false).then(data => {
        if (data.vitaTemplates.items.length != 0) {
            data.vitaTemplates.items.forEach(ids => IdsForDeletion.push(ids.id))
        }
        //delete all archived templates
        cy.log('Delete all archived templates').deleteTemplatesByIdsAPI(IdsForDeletion)
    })
}

function deleteAllVitas() {
    // get all active vitas ids
    let IdsForDeletion = []
    cy.log('Get all active vitas for deletion').getAllVitasIdsAPI(true).then(data => {
        if (data.vitas.items.length != 0) {
            data.vitas.items.forEach(ids => IdsForDeletion.push(ids.id))
        }
        //delete all active vitas
        cy.log('Delete active vitas').deleteVitasByIdsAPI(IdsForDeletion)
    })
    IdsForDeletion = []
    // get all archived vitas ids
    cy.log('Get all archived vitas for deletion').getAllVitasIdsAPI(false).then(data => {
        if (data.vitas.items.length != 0) {
            data.vitas.items.forEach(ids => IdsForDeletion.push(ids.id))
        }
        //delete all archived vitas
        cy.log('Delete all archived vitas').deleteVitasByIdsAPI(IdsForDeletion)
    })
}