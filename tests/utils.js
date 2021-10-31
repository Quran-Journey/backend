require("dotenv").config();
const Client = require("pg").Client;
const axios = require("axios");

const dbConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
};

const API_URL = "http://localhost:3001/api"; // This should be an env variable.

async function apiPOST(path, body = {}) {
    return await axios.post(API_URL + path, body, { validateStatus: false }).catch((e) => {
        console.log(e.toJSON());
    });
}

async function apiGET(path) {
    return await axios.get(API_URL + path, { validateStatus: false }).catch((e) => {
        console.log(e.toJSON());
    });
}

module.exports = {
    apiGET: apiGET,
    apiPOST: apiPOST,
    dbConfig: dbConfig,
};
