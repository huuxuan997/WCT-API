/// <reference types = "Cypress"/>

const url = require("../../../fixtures/url.json");
const tk = require("../../../fixtures/token.json");
const dt = require("../../../fixtures/data_trading_account_transaction.json");

describe("Send Withdraw request for a WCT account", () => {
  it.skip("Verify It can send a withdraw request successfully", () => {
    cy.request({
      method: "POST",
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[0].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
      body: {
        bankingAccountId: 38,
        amount: 100,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
  it("Verify receive an error when using invalid trading account Id", () => {
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[1].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
      body: {
        bankingAccountId: 38,
        amount: 100,
      },
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.statusText).to.eq("Trading Account not found!");
    });
  });
  it("Verify receive error when not using token to send request", () => {
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[0].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].invalidToken,
      },
      body: {
        bankingAccountId: 38,
        amount: 100,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(401);
    });
  });
  it("Verify receive an error when using invalid banking account Id", () => {
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[0].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
      body: {
        bankingAccountId: 38123123,
        amount: 100,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(404);
      expect(res.body.statusText).to.eq("Banking Account not found!");
    });
  });
  it("Verify receive error when bankingAccountId fields is null", () => {
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[0].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
      body: {
        bankingAccountId: null,
        amount: 100,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq(
        "The JSON value could not be converted to System.Int64. Path: $.bankingAccountId | LineNumber: 0 | BytePositionInLine: 24."
      );
    });
  });
  it("Verify receive error when amount fields is null", () => {
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[0].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
      body: {
        bankingAccountId: 38,
        amount: null,
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq(
        "One or more validation errors occurred"
      );
      expect(res.body.data[0]).to.eq(
        "The JSON value could not be converted to System.Decimal. Path: $.amount | LineNumber: 0 | BytePositionInLine: 36."
      );
    });
  });
  it("Verify receive error when inputting amount fields more than 5000 ", () => {
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[0].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
      body: {
        bankingAccountId: 38,
        amount: 5001,
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq("Maximum limit is exceeded!");
    });
  });
  it("Verify receive error when inputting amount fields less than 100 ", () => {
    cy.request({
      method: "POST",
      failOnStatusCode: false,
      url:
        url[0].urlStaging +
        "/backoffice/api/1/TradingAccountTransaction/" +
        dt[0].masterId +
        "/Withdrawal",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
      body: {
        bankingAccountId: 38,
        amount: 99,
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.statusText).to.eq("Minimum limit is exceeded!");
    });
  });
});
