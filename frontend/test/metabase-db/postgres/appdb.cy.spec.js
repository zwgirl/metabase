import {
  signInAsAdmin,
  restore,
  modal,
  typeAndBlurUsingLabel,
} from "__support__/cypress";

describe("postgres > admin > validate", () => {
  beforeEach(() => {
    restore();
    signInAsAdmin();
    cy.server();
  });

  it("should have postgres as our sample dataset", () => {
    cy.visit("/admin/databases");
  });
});
