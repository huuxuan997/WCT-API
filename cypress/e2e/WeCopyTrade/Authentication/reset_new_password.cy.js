/// <reference types = "Cypress"/>

const url = require("../../../fixtures/url.json");
const tk = require("../../../fixtures/token.json");
const dtlogin = require("../../../fixtures/data_login.json");
const dtencrytpw = require("../../../fixtures/data_encryt_pw.json");
const pathFile = "cypress/fixtures/data_login.json";
let newPW = [];
let token = "";
describe("Reset new Password for a WCT account", () => {
  it("Verify It can change password successfully", () => {
    cy.request(
      "POST",
      url[0].urlStaging + "/authen/api/1.0/Authenticate/Login",
      {
        client_id: dtlogin[0].client_id,
        client_secret: dtlogin[0].client_secret,
        scope: dtlogin[0].scope,
        username: dtlogin[0].username,
        password: dtlogin[0].password,
      }
    )
      .then((res) => {
        token = res.body.data.accessToken;
        //console.log(token);
        cy.request({
          method: "POST",
          url:
            url[0].urlStaging +
            "/authen/api/1.0/Authenticate/EncryptPasswordForTest?password=" +
            dtencrytpw[0].newPassword,
        });
      })
      .then((respo) => {
        newPW.push({
          client_id: dtlogin[0].client_id,
          client_secret: dtlogin[0].client_secret,
          scope: dtlogin[0].scope,
          username: dtlogin[0].username,
          password: respo.body.data,
        });
        cy.wait(2000);
        cy.request({
          method: "PUT",
          url: url[0].urlStaging + "/backoffice/api/1/User/ChangePassword",
          headers: {
            authorization: "Bearer " + token,
          },
          body: {
            oldPassword: dtlogin[0].password,
            newPassword: respo.body.data,
          },
        });
      })
      .then((respon) => {
        expect(respon.status).to.eq(200);
        expect(respon.body.statusText).to.eq("Change password successfully");
        expect(respon.body.data).to.eq(null);
        cy.readFile(pathFile).then((data) => {
          console.log(data);
          cy.writeFile(pathFile, newPW);
        });
      });
  });
});
