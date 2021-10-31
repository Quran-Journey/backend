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