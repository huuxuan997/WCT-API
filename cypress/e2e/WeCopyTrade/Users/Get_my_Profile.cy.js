/// <reference types = "Cypress"/>

const tk = require("../../../fixtures/token.json");
const url = require("../../../fixtures/url.json");

describe("Get My Profile", () => {
  it("Verify it can query all fied of user", () => {
    cy.request({
      method: "GET",
      url: url[0].urlStaging + "/backoffice/api/1/User/Profile",
      headers: {
        authorization: "Bearer " + tk[0].token,
      },
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eq(200);
      expect(res.body.data.userId).to.eq(
        "7fee7c79-a624-46de-a934-d3b41176d92c"
      );
      expect(res.body.data.email).to.eq("mhxdec211@drowblock.com");
      expect(res.body.data.firstName).to.eq("Xuan");
      expect(res.body.data.lastName).to.eq("Mai");
      expect(res.body.data.phoneNumber).to.eq("01682702136");
      expect(res.body.data.gender).to.eq(true);
      expect(res.body.data.countryId).to.eq(245);
    });
  });
});
