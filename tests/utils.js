require("dotenv").config();
const Client = require("pg").Client;
const axios = require("axios");


const config = {
    user: "qj",
    password: "Yatathakar123!",
    host: "localhost",
    port: 5434,
    database: "quranJourney",
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
                return false;
            })
            .catch(async (err) => {
                if (retries == 0) {
                    console.log(err)
                }
                retries--;
                console.log(`Tests could not connect to db.\nretries left: ${retries}\nretrying.`);

                // wait 3 seconds
                await new Promise((res) => setTimeout(() => res(), 3000));
            });
    }
    return db;
}

const API_URL = "http://localhost:3001/api"; // This should be an env variable.

async function apiPOST(path, body = {}) {
    console.log(API_URL + path)
    return await axios
        .post(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiGET(path) {
    console.log(API_URL + path)
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
