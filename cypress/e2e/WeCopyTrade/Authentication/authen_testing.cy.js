/// <reference types = "Cypress"/>

const dt = require('../../../fixtures/data.json')
const tk = require('../../../fixtures/token.json')
let rdText = ''
rdText = Math.floor(Math.random() * 100000)
let testEmail = 'xuanmai' + rdText + '@gmail.com'
let rdNum = ''
rdNum = Math.floor(Math.random() * 1000000)
let testPhoneNumber = '0713' + rdNum


describe('Register WeCopyTrade account', () => {
    it.skip('Verify It can register a Wecopytrade account without token', () => {

        cy.request({
            method: 'POST',
            url: tk[0].urlStaging + '/authen/api/1.0/Authenticate/Register',
            body: {
                "FirstName": dt[0].FirstName,
                "LastName": dt[0].LastName,
                "countryId": 1,
                "phoneNumber": testPhoneNumber,
                "email": testEmail,
                "password": "vLKGWW/U71V7V1o0qB2f4Q=="
            }
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200)
            expect(res.body.statusText).to.eq('Your WeCopyTrade account has been registered. Please check email to verify it.')
            expect(res.body.data).to.eq(null)
        })
    })

    it('Verify It only can input firstName fields not more than 50 digits', () => {


        cy.request({
            method: 'POST',
            url: tk[0].urlStaging + '/authen/api/1.0/Authenticate/Register',
            failOnStatusCode: false,
            body: {
                "FirstName": dt[1].FirstName,
                "LastName": dt[1].LastName,
                "countryId": 1,
                "phoneNumber": testPhoneNumber,
                "email": testEmail,
                "password": "vLKGWW/U71V7V1o0qB2f4Q=="
            }
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(400)
            expect(res.body.statusText).to.eq('One or more validation errors occurred')
            //cy.log(res.body.data[0])
            expect(res.body.data[1]).to.eq('The field FirstName must be a string with a maximum length of 50.')
            
        })


    })
    it('Verify It only can input lastName fields not more than 50 digits', () => {


        cy.request({
            method: 'POST',
            url: tk[0].urlStaging + '/authen/api/1.0/Authenticate/Register',
            failOnStatusCode: false,
            body: {
                "FirstName": dt[2].FirstName,
                "LastName": dt[2].LastName,
                "countryId": 1,
                "phoneNumber": testPhoneNumber,
                "email": testEmail,
                "password": "vLKGWW/U71V7V1o0qB2f4Q=="
            }
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(400)
            expect(res.body.statusText).to.eq('One or more validation errors occurred')
            expect(res.body.data[0]).to.eq('The field LastName must be a string with a maximum length of 50.')
            
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
            let resuserid = splitdata1[2].split('=')

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