const axios = require('axios');

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 */
async function callApi(endpoint, accessToken) {
    return axios.get(endpoint, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })    
    .then(res => {
        return res.data.value
    })
}

module.exports = {
    callApi: callApi
};