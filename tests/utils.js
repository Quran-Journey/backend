require("dotenv").config();
const Client = require("pg").Client;
const axios = require("axios");

const config = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
};
let db = new Client(config);

async function connect_to_db() {
    let retries = 5;
    while (retries) {
        db = new Client(config);
        await db
            .connect()
            .then(() => {
                console.log("Tests have connected to db successfully");
                retries = 0;
                return;
            })
            .catch(async (err) => {
                if (retries == 0) {
                    console.log(err);
                }
                retries--;
                console.log(
                    `Tests could not connect to db.\nretries left: ${retries}\nretrying.`
                );

                // wait 3 seconds
                await new Promise((res) => setTimeout(() => res(), 3000));
            });
    }
    return db;
}

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

module.exports = {
    apiGET: apiGET,
    apiPOST: apiPOST,
    connect_to_db: connect_to_db,
};
