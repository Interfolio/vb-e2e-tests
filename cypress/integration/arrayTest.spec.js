/// <reference types="Cypress" />
context('Connectors', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/connectors')
  })

  it('.each() - iterate over an array of elements', () => {
    const ceva = ['Lara Williams','Lara William123s4']
    // https://on.cypress.io/each
    cy.get('.connectors-each-ul>li')
      .each(($el,index) => expect($el.get(0).innerText).to.contain(ceva[index]))
      // .each(($el,index,list) => expect(list).to.contain('Lara Williams')
      //                      .and.expect(list).contain('Lara Williams123'))
      //   //debugger;
      //   //console.log($el)
      //   ceva.push($el[0].innerText)
      //   //.expect(ceva[0]).to.contain('Lara Williams')
      //   //Cypress.then($testaaa[0]).should('eq', 'asdfg')
      //   //return($testaaa.get(0))
      //   return list
      
      // .then((list) => {
      //   expect(list.get(0).innerText).to.contain('Lara Williams')
      //   expect(list.get(1).innerText).to.contain('Lara William123s')
      //   // expect(ceva[1]).to.contain('William Grey')
      //   // expect(ceva[2]).to.contain('Lara Williams')
      //   console.log(arguments)
      // })
      //expect(ceva[0]).to.contain('Lara Williams')
      //expect(ceva[1]).to.contain('abc')
      //.then()
  })

  // https://on.cypress.io/each
  // cy.get('.connectors-each-ul>li').as('vasile')
  // console.log(cy.get('@vasile').length())

  // let abc = []
  // abc.push( cy.get('.connectors-each-ul>li'))
  // console.log(abc.length)
  // for (let i = 0; i<abc.length; i++) {
  //   console.log("hallloooo")
  //   console.log(abc[i])
  // }
  // cy.get('.connectors-each-ul>li')
  //   .should('have.length', 3)
  //   .each((x) => {
  //     expect(x).to.contain('eventType');
  //   })

  // cy.get('.connectors-each-ul>li').each(should((x) => {
  //   const text = x.text()
  //   expect(text).to.include('foo');
  // }))

  //should('have.text', 'Lara Williams'))

  // cy.get('.connectors-each-ul>li').invoke('text').then((text => {
  //   expect(text).to.eq('66.67%')
  // }));
  // const arr = [cy.get('.connectors-each-ul>li')]
  // console.log(arr)
  // const cars = ["Saab", "Volvo", "BMW"];
  // console.log(cars)
  // cy.wrap(arr).spread((foo, bar, baz) => {
  //   expect(foo).to.eq('Lara Williams')
  //   expect(bar).to.eq('William Greybar')
  //   expect(baz).to.eq('Monica Pharrel')
  // })

})