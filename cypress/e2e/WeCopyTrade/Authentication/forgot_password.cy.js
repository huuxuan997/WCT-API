/// <reference types = "Cypress"/>

const dt = require("../../../fixtures/data.json");
const tk = require("../../../fixtures/token.json");
describe("Forgot passowrd", () => {
  it("Verify it can send mail when user enter correct format mail ", () => {
    cy.request({
      method: "POST",
      url: tk[0].urlStaging + "/authen/api/1/Authenticate//ForgotPassword",
      body: {
        email: "mhxdec61@cloud-mail.top",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(200);
      expect(res.body.statusText).to.eq(
        "Your request has been processed. Please check email to reset your password."
      );
      expect(res.body.data).to.eq(null);
    });
  });
  it("Verify receive error when mail null", () => {
    cy.request({
      method: "POST",
      url: tk[0].urlStaging + "/authen/api/1/Authenticate//ForgotPassword",
      failOnStatusCode: false,
      body: {
        email: "",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq("The Email field is required.");
    });
  });
  it("Verify receive error when user enter mail over 50 character", () => {
    cy.request({
      method: "POST",
      url: tk[0].urlStaging + "/authen/api/1/Authenticate//ForgotPassword",
      failOnStatusCode: false,
      body: {
        email: "jklkjhkljhlkjhlkjdhflzzzxzdasdakjzzhdlkhj@gmail.com",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq(
        "The field Email must be a string with a maximum length of 50."
      );
    });
  });
  it("Verify receive error when using mail invalid format ", () => {
    cy.request({
      method: "POST",
      url: tk[0].urlStaging + "/authen/api/1/Authenticate//ForgotPassword",
      failOnStatusCode: false,
      body: {
        email: "xuanmai.mail.com",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq("Invalid email");
      expect(res.body.data).to.eq(null);
    });
  });
  it("Verify receive error when using mail not exist on the system ", () => {
    cy.request({
      method: "POST",
      url: tk[0].urlStaging + "/authen/api/1/Authenticate//ForgotPassword",
      failOnStatusCode: false,
      body: {
        email: "mhxtestnotexist@mail.com",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(404);
      expect(res.body.statusText).to.eq("Email is not already exists");
      expect(res.body.data).to.eq(null);
    });
  });
});
