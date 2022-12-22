/// <reference types ="Cypress"/>
const path = 'cypress/fixtures/texxxxt.json'

describe('test path',()=>{
    it('Reads file', () => {
        cy.readFile(path).then((t)=>{
            console.log(t); //Text qweqweqweqwqwewqeqwe
        })
        cy.writeFile(path,'123123')
      })
})