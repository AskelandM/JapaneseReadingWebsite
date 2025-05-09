describe("Admin Login", () => {
  it("passes", () => {
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();
  });
});

describe("Header to Leaderboard", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.get("a[href='/leaderboard']").click();
    cy.url().should("include", "/leaderboard");
  });
});

describe("Header to Lessons", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.get("a[href='/lessons']").click();
    cy.url().should("include", "/lessons");
  });
});

describe("Header to Sentences", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.get("a[href='/sentences']").click();
    cy.url().should("include", "/sentences");
  });
});

describe("Header to Admin back to home", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.get("a[href='/admin']").click();
    cy.url().should("include", "/admin");

    cy.get("a[href='/']").click();
    cy.url().should("include", "/");
  });
});

describe("Home to Add new Lesson", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.get("a[href='/custom']").click();
    cy.url().should("include", "/custom");
  });
});

describe("Home to My Custom Lessons", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.get("a[href='/custom/edit']").click();
    cy.url().should("include", "/custom/edit");
  });
});

describe("Home to Lesson 1 Vocab", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.contains("Lesson 1").click();
    cy.contains("Vocab").click();
    cy.url().should("include", "/Vocab?lesson=1");
    cy.get(".vocab-title").should("contain.text", "Lesson 1 Vocabulary");
  });
});

describe("Home to Lesson 1 Flashcards", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    cy.contains("Lesson 1").click();
    cy.contains("Flashcards").click();
    cy.url().should("include", "/flashcards?lesson=1");
    cy.get(".page-title").should("contain.text", "Flashcards");
  });
});

describe("Login and Logout", () => {
  it("passes", () => {
    //Sign in
    cy.visit("localhost:3000");
    cy.contains("button", "Admin Sign In").click();
    cy.get("input[type=text]").type(Cypress.env().CYPRESS_ADMIN_EMAIL);
    cy.get("input[type=password]").type(Cypress.env().CYPRESS_ADMIN_PASSWORD);
    cy.get("button").contains("Log In").click();

    //Sign out
    cy.get(".logout-button").click();
    cy.contains("button", "Admin Sign In").should("be.visible");
  });
});
