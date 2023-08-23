const c = require("../services/utils");

/**
 * Prepares a generic response template for all requests.
 *
 * @param {*} result the result of the operation conducted based on the request
 * @param {*} response the response that will be modified and sent back to the user
 * @returns true if successful, none otherwise.
 */
function simpleResponse(result, response) {
    // A result takes the following format: { data: d, error: msg, success: pass, ecode: code }
    var success = result.success;
    var ecode = result.ecode;

    if (success) {
        response.status(200);
    } else if (ecode == c.errorEnum.SERVER) {
        response.status(500);
    } else if (ecode == c.errorEnum.UNIQUE || ecode == c.errorEnum.FOREIGN) {
        response.status(409);
    } else if (ecode == c.errorEnum.DNE) {
        response.status(404);
    } else if (ecode == c.errorEnum.INVALID) {
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
 * @param {*} result the result of the operation conducted based on the request
 * @param {*} response the response that will be modified and sent back to the user
 * @returns true if successful, none otherwise.
 */
function authResponse(result, response) {
    // A result takes the following format: { data: d, error: msg, success: pass, ecode: code }
    var success = result.success;
    var ecode = result.ecode;

    if (success) {
        response.status(200);
    } else if (ecode == c.errorEnum.UNAUTHORIZED) {
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
