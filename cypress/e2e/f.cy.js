/// <reference types="cypress" />

describe("first test", () => {
    beforeEach(() => {
        // cy.visit("https://example.cypress.io");
    });

    // -------------------
    // multiple elements - get text of each element
    // -------------------

    it("multi-elements-1", () => {
        cy.visit("https://example.cypress.io");

        cy.get(".home-list a[href='/commands/querying']").first().should("have.text", "Querying");
        cy.get(".home-list a[href='/commands/querying']").last().should("have.text", "root");
        cy.get(".home-list a[href='/commands/querying']").eq(1).should("have.text", "get");
    });

    it("multi-elements-2", () => {
        cy.visit("https://example.cypress.io");

        cy.get(".home-list a[href='/commands/querying']").then((els) => {
            expect(els.first().text()).to.eq("Querying"); // els.first() => first link, so need to get text
            expect(els.last().text()).to.eq("root");
            expect(els.eq(1).text()).to.eq("get");
        });
    });

    // -------------------
    // wrap() - click on the element
    // -------------------

    it("wrap", () => {
        cy.visit("https://example.cypress.io");

        cy.get(".home-list a[href='/commands/querying']").then((els) => {
            cy.wrap(els.first()).click();
        });

        cy.get("h1").should("have.text", "Querying");
    });

    // -------------------
    // each() - compare each element
    // -------------------

    it("each", () => {
        const elements = ["Querying", "get", "contains", "within", "root"];

        cy.visit("https://example.cypress.io");

        cy.get(".home-list a[href='/commands/querying']").each((item, index, list) => {
            expect(item.text()).to.be.eq(elements[index]);
        });
    });

    // -------------------
    // as()
    // -------------------

    it("as with @ (alias)", () => {
        cy.visit("https://example.cypress.io");

        cy.get("h1").as("pageTitle");

        cy.get("@pageTitle").should("have.text", "Kitchen Sink");
    });

    it("as with this (alias)", function () {
        cy.visit("https://example.cypress.io");

        cy.get("h1")
            .invoke("text")
            .as("pageTitle")
            .then(() => {
                cy.log(`Title of the page is ${this.pageTitle}`);
            });
    });
});

//
//
//
//

import pageElements from "../fixtures/pageElements.json";

describe("first test 2", () => {
    // -------------------
    // fixtures
    // -------------------

    it("fixtures from import", () => {
        cy.visit("https://example.cypress.io");

        cy.get(".home-list a[href='/commands/querying']").each((item, index, list) => {
            expect(item.text()).to.be.eq(pageElements.elements[index]);
        });
    });

    //
    //

    beforeEach(() => {
        cy.fixture("pageElements.json").as("beforeEls"); //.json можно опустить, тогда возьмет первый найденый
    });

    it("fixtures from method with beforeEach", function () {
        cy.visit("https://example.cypress.io");

        cy.get("h1").should("have.text", this.beforeEls.pageTitle);
    });

    //
    //

    it("fixtures from method", function () {
        cy.visit("https://example.cypress.io");

        cy.fixture("pageElements.json").as("methodEls");
        cy.get("@methodEls").then((methodEls) => {
            cy.get("h1").should("have.text", methodEls.pageTitle);
        });
    });
});

//
//
//
//

import "cypress-real-events";

describe("first test 3", () => {
    it.only("real events", () => {
        cy.visit("https://example.cypress.io/commands/querying");
        cy.get(".query-button .btn").realHover().should("have.css", "background-color", "rgb(230, 230, 230)");
    });
});
