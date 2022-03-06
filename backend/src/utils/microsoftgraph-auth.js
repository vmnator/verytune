const msal = require("@azure/msal-node");

const tokenCalls = async (auth) => {
    const msalConfig = {
        auth: auth
    };
    
    // Create msal application object
    const cca = new msal.ConfidentialClientApplication(msalConfig);
    const clientCredentialRequest = {
        scopes: ["https://graph.microsoft.com/.default"], // replace with your resource
    };
    
    return await cca.acquireTokenByClientCredential(clientCredentialRequest)
}

module.exports = {
    tokenCalls
}