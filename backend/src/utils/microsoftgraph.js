const fetch = require('./microsoftgraph-fetch');
const auth = require('./microsoftgraph-auth');

const GRAPH_URL = "https://graph.microsoft.com/beta/"

async function getDevices(authConfig) {
    // call the web API with the access token
    return auth.tokenCalls(authConfig)
        .then(authResponse => {
            return fetch.callApi(GRAPH_URL + "devices", authResponse.accessToken)
        .catch(error => {
            console.log("Authentication failed. Detailed message: ", error)
        })
    })
}

const MicrosoftGraph = {
    getDevices: function(authConfig) {
      return getDevices(authConfig)
    },
}

module.exports = MicrosoftGraph