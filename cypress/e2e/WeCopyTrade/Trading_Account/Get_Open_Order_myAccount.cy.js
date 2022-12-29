/// <reference types = "Cypress"/>

const dt = require("../../../fixtures/data.json");
const tk = require("../../../fixtures/token.json");
const dtlogin = require("../../../fixtures/data_login.json");

let token = "";
describe("Get open order my account", () => {
  //console.log(dtlogin);
  it("It can get open order my account successfully", () => {
    cy.request(
      "POST",
      tk[0].urlStaging + "/authen/api/1.0/Authenticate/Login",
      {
        client_id: "wecopytrade",
        client_secret: "vYd2NaOeQnjh+Ow7BlV0XAIWt11lGktwGlOq36Ta5pU=",
        scope: "BackOfficeAPI",
        username: "mhxdec23@drowblock.com",
        password: "vLKGWW/U71V7V1o0qB2f4Q==",
      }
    ).then((res) => {
      token = res.body.data.accessToken;
      var i = 0;
      for (i = 0; i < 1000; i++) {
        cy.request({
          method: "GET",
          url:
            tk[0].urlStaging +
            "/BackOffice/api/1.0/TradingAccount/201/OpenOrders?PageNumber=1&MaxPerPage=10",
          headers: {
            authorization: "Bearer " + token,
          },
        });
        cy.wait(540000);
        i++;
      }
    });
  });
});
