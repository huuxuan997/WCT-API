/// <reference types = "Cypress"/>

const url = require("../../../fixtures/url.json");
const tk = require("../../../fixtures/token.json");
const dt = require("../../../fixtures/data_trading_account_transaction.json");

describe("Send Withdraw request for a WCT account", () => {
  console.log(tk[0].invalidToken);
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
  it.skip("Verify receive an error when using invalid trading account Id", () => {
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
});
