describe("first test", () => {
    beforeEach(() => {
        // cy.visit("https://example.cypress.io");
    });

    // it("verify link Querying", () => {
    //     cy.visit("https://example.cypress.io");
    //     cy.get("h1").then((b) => {
    //         console.log(b);
    //     });
    //     cy.get("h1").should("include.text", "Kit");
    //     cy.get("h1").should("contain", "Kit");
    //     cy.get("h1").should("have.text", "Kitchen Sink");
    // });

    it("verify link Querying", () => {
        cy.visit("https://example.cypress.io");
        // cy.get(".home-list > li > a[href='/commands/querying']").click();
        // cy.get("#query-btn")

        cy.get(".home-list a[href='/commands/querying']").then((els) => {
            // cy.wrap(els.first()).click();
            console.log("then: ", els);
        });

        cy.get(".home-list a[href='/commands/querying']").each((els) => {
            console.log("each: ", els);
        });
    });
});
