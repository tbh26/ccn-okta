context("home", () => {
  beforeEach(() => {
    cy.visit("/");
    // ^^ possible because we set the `baseUrl` config option
    //     in the project root's cypress.json
  });

  it("main header check(s)", () => {
    cy.get("h1").should("not.contain.text", "bla bla bla");
    cy.get("h1").should("contain.text", "Codaisseur Coders Network");
  });

});
