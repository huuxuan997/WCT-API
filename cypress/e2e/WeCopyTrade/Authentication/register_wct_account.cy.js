/// <reference types = "Cypress"/>

const url = require("../../../fixtures/url.json");
const dt = require("../../../fixtures/data.json");
const tk = require("../../../fixtures/token.json");
let rdText = "";
rdText = Math.floor(Math.random() * 1000000);
let testEmail = "xuanmai" + rdText + "@gmail.com";
let rdNum = "";
rdNum = Math.floor(Math.random() * 1000000);
let testPhoneNumber = "0713" + rdNum;
let TN_length_15 = "07134564444" + rdNum;

describe("Register WeCopyTrade account", () => {
  it.skip("Verify It can register a Wecopytrade account without token", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      body: {
        FirstName: dt[0].FirstName,
        LastName: dt[0].LastName,
        countryId: 1,
        phoneNumber: testPhoneNumber,
        email: testEmail,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(200);
      expect(res.body.statusText).to.eq(
        "Your WeCopyTrade account has been registered. Please check email to verify it."
      );
      expect(res.body.data).to.eq(null);
    });
  });

  it.skip("Verify It only can input firstName fields not more than 50 digits", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: dt[1].FirstName,
        LastName: dt[1].LastName,
        countryId: 1,
        phoneNumber: testPhoneNumber,
        email: testEmail,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[1]).to.eq(
        "The field FirstName must be a string with a maximum length of 50."
      );
    });
  });
  it.skip("Verify It only can input lastName fields not more than 50 digits", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: dt[2].FirstName,
        LastName: dt[2].LastName,
        countryId: 1,
        phoneNumber: testPhoneNumber,
        email: testEmail,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq(
        "The field LastName must be a string with a maximum length of 50."
      );
    });
  });
  it("Verify It can input upper-case, low-case. special characters for fullName field", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: dt[3].FirstName,
        LastName: dt[3].LastName,
        countryId: 1,
        phoneNumber: testPhoneNumber,
        email: testEmail,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(200);
      expect(res.body.statusText).to.eq(
        "Your WeCopyTrade account has been registered. Please check email to verify it."
      );
      expect(res.body.data).to.eq(null);
    });
  });
  it.skip("Verify phoneNumber only can input with length not more than 15", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: dt[0].FirstName,
        LastName: dt[0].LastName,
        countryId: 1,
        phoneNumber: TN_length_15,
        email: testEmail,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq(
        "The field PhoneNumber must be a string with a maximum length of 15."
      );
    });
  });
  it.skip("Verify Email field only can input with length no more than 50", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: dt[0].FirstName,
        LastName: dt[0].LastName,
        countryId: dt[0].countryId,
        phoneNumber: testPhoneNumber,
        email: dt[1].email,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq(
        "The field Email must be a string with a maximum length of 50."
      );
    });
  });
  it.skip("Verify receive error when inputting incorrect email forrmat", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: dt[0].FirstName,
        LastName: dt[0].LastName,
        countryId: dt[0].countryId,
        phoneNumber: testPhoneNumber,
        email: dt[2].email,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq("Invalid email");
      expect(res.body.data).to.eq(null);
    });
  });
  it.skip("Verify receive error when inputting email already exists on the system", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: dt[0].FirstName,
        LastName: dt[0].LastName,
        countryId: dt[0].countryId,
        phoneNumber: testPhoneNumber,
        email: dt[0].email,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq("Account already exists");
      expect(res.body.data).to.eq(null);
    });
  });
  it.skip("Verify receive error when using invalid URL", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register/invalid",
      failOnStatusCode: false,
      body: {
        FirstName: dt[0].FirstName,
        LastName: dt[0].LastName,
        countryId: dt[0].countryId,
        phoneNumber: testPhoneNumber,
        email: testEmail,
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      },
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
  it.skip("Verify receive error when any fields is empty", () => {
    cy.request({
      method: "POST",
      url: url[0].urlStaging + "/authen/api/1.0/Authenticate/Register",
      failOnStatusCode: false,
      body: {
        FirstName: "",
        LastName: "",
        countryId: 1,
        phoneNumber: "",
        email: "",
        password: "",
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq("The Email field is required.");
      expect(res.body.data[1]).to.eq("The LastName field is required.");
      expect(res.body.data[2]).to.eq("The Password field is required.");
      expect(res.body.data[3]).to.eq("The FirstName field is required.");
      expect(res.body.data[4]).to.eq("The PhoneNumber field is required.");
      console.log(res.body.data);
    });
  });
});
