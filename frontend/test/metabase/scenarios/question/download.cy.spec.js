import { signInAsAdmin, restore } from "__support__/cypress";

describe("scenarios > question > download", () => {
  before(() => {
      restore();
      cy.server();
      cy.route("POST", "/api/card/3/query/xlsx").as("xlsx_download");
  });
  beforeEach(signInAsAdmin);

  describe("a question", () => {
    it("should download", () => {
        cy.visit("/question/3");
        cy.get(".Icon-download").click();
        cy.contains(".json").click();
        // cy.wait("@xlsx_download")
    });

    it("should download with a filter", () => {
        

        // *** You need to manualy check if filter worked correctly ***
    });
  });
});