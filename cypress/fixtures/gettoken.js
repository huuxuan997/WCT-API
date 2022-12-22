let token
function getToken(token){
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
        
    })
}