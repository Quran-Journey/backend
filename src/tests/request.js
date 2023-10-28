const axios = require("axios");

const API_URL = "http://localhost:3001/api"; // This should be an env variable.

async function apiPOST(path, body = {}) {
    return await axios
        .post(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiGET(path) {
    return await axios
        .get(API_URL + path, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiPATCH(path, body = {}) {
    return await axios
        .patch(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiPUT(path, body = {}) {
    return await axios
        .put(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiDELETE(path, body = {}) {
    return await axios
        .delete(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

module.exports = {
    apiGET: apiGET,
    apiPOST: apiPOST,
    apiPATCH: apiPATCH,
    apiPUT: apiPUT,
    apiDELETE: apiDELETE,
};
