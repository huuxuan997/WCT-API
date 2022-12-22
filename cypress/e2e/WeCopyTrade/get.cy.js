/// <reference types = "Cypress"/>

describe("get api user tests", () => {
  it("test", () => {
    const filename = "cypress/fixtures/test.json";
    let list = [];

    cy.readFile(filename).then((data) => {
      list = data;
      list.push({ username: "hai nho" });
      cy.writeFile(filename, list);
    });
    console.log(list.length);
  });
});
