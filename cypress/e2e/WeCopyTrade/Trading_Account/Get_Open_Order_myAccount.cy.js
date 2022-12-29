/// <reference types = "Cypress"/>

const dt = require("../../../fixtures/data.json");
const tk = require("../../../fixtures/token.json");
let token = "";
describe("Get open order my account", () => {
  it("It can get open order my account successfully", () => {
    cy.request(
      "POST",
      tk[0].urlStaging + "/authen/api/1.0/Authenticate/Login",
      {
        client_id: dtlogin[0].client_id,
        client_secret: dtlogin[0].client_secret,
        scope: dtlogin[0].scope,
        username: dtlogin[0].username,
        password: dtlogin[0].password,
      }
    ).then((res) => {
      token = res.body.data.accessToken;
      var i = 0;
      for (i = 0; i < 1000; i++) {
        cy.request({
          method: "GET",
          url:
            tk[0].urlStaging +
            "BackOffice/api/1.0/TradingAccount/201/OpenOrders?PageNumber=1&MaxPerPage=10",
          headers: {
            authorization: "Bearer " + token,
          },
        });
      }
    });
  });
});
