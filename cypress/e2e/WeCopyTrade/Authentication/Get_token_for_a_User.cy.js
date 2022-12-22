/// <reference types = 'Cypress'/>


describe('Get token for User',()=>{
    it('Verify It can login and get token successfully',()=>{
        cy.request({
            method:'POST',
            url:'https://apigatewayaca-staging.ambitiousmoss-3ec704eb.eastasia.azurecontainerapps.io/authen/api/1.0/Authenticate/Login',
            body:{
                    "client_id": "wecopytrade",
                    "client_secret": "vYd2NaOeQnjh+Ow7BlV0XAIWt11lGktwGlOq36Ta5pU=",
                    "scope": "BackOfficeAPI",
                    "username": "1tpcw2h2fc@drowblock.com",
                    "password": "cb0o/t5e1SkH/EIiY/iTpg=="
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.statusText).to.eq('Ok')
        })
    })
    it.skip('Verify it can verify email WCT account successfully', () => {
        cy.request({
            method: 'POST',
            url: tk[0].urlStaging + '/authen/api/1.0/Authenticate/DecryptUrlTokenForTest',
            headers: {
                'token': tk[0].DecrytToken
            }
        }).then((res) => {
            let response = JSON.stringify(res.body)
            let splitdata1 = response.split("&")
            let resemail = splitdata1[0].split('=')
            let resphone = splitdata1[1].split('=')

            //expect(resemail[1]).to.eq(testEmail)
        })

    })
    it.skip('Verify It can login and get token successfully', () => {
        cy.request({
            method: 'POST',
            url: tk[0].urlStaging + '/authen/api/1.0/Authenticate/Login',
            body: {
                "client_id": "wecopytrade",
                "client_secret": "vYd2NaOeQnjh+Ow7BlV0XAIWt11lGktwGlOq36Ta5pU=",
                "scope": "BackOfficeAPI",
                "username": "orson.truong@lfglobaltech.com",
                "password": "lHNpwyZka5XN5t0nQTkYoA=="
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.statusText).to.eq('Ok')
        })
    })



})