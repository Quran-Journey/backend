const c = require("./constants");

/**
 * Prepares a generic response template for all requests.
 *
 * @param {*} result the result of the operation conducted based on the request
 * @param {*} response the response that will be modified and sent back to the user
 * @returns true if successful, none otherwise.
 */
function simpleResponse(result, response) {
    // A result takes the following format: { data: d, msg: msg, success: pass, code: code }
    var success = result.success;
    var code = result.code;

    if (success) {
        response.status(200);
    } else if (code == c.Errors.DB_SERVER) {
        response.status(500);
    } else if (code == c.Errors.DB_UNIQUE || code == c.Errors.DB_FOREIGN) {
        response.status(409);
    } else if (code == c.Errors.DB_DNE) {
        response.status(404);
    } else if (code == c.Errors.DB_INVALID) {
        response.status(400);
    } else {
        console.log("Could not set a valid response status.");
    }
    response.json(result);
    return true;
}

/**
 * Prepares a response template for auth requests.
 *
 * @param {} result the result of the operation conducted based on the request
 * @param {} response the response that will be modified and sent back to the user
 * @returns true if successful, none otherwise.
 */
function authResponse(result, response) {
    // A result takes the following format: { data: d, msg: msg, success: pass, code: code }
    var success = result.success;
    var code = result.code;

    if (success) {
        response.status(200);
        response.redirect()
    } else if (code == c.Errors.AUTH_UNAUTHORIZED) {
        response.status(403);
    } else {
        console.log("Could not set a valid response status.");
    }
    response.json(result);
    return true;
}

module.exports = {
    simpleResponse,
    authResponse,
};
