/// <reference types="cypress" />
// cypress/integration/nav.spec.ts

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    // ^^ possible because we set the `baseUrl` config option
    //     in the project root's cypress.json
  });

  it("should work", () => {
    cy.get(".MuiToolbar-root").contains("Signup").click();
    cy.get("p").should("contain.text", "Welcome! Signup");

    cy.get(".MuiToolbar-root").contains("Login").click();
    cy.get("p").should("contain.text", "Welcome! Login");
  });
});

