/// <reference types="cypress" />

// import { makeFakePost } from '../../../src/pages/home/HomePage.test';

function makeFakePost(id: number, title: string) {
  return {
    id,
    title,
    content: "Bla bla bla",
    createdAt: "2020-10-06T14:05:05.976Z",
    updatedAt: "2020-10-06T14:05:06.258Z",
    author_id: 2,
    tags: [],
    post_likes: [],
  };
}

context("home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("main header check(s)", () => {
    cy.get("h1").should("not.contain.text", "bla bla bla");
    cy.get("h1").should("contain.text", "Codaisseur Coders Network");
  });

  it("home page with fake backend", () => {

    cy.intercept("https://codaisseur-coders-network.herokuapp.com/posts", {
      count: 2,
      rows: [makeFakePost(1, "Fake post #1"), makeFakePost(2, "Fake post #2")],
    });

    cy.get('div > h2').eq(0).should("contain.text", "Fake post #1");
  });

});
