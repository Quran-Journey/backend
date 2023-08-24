const c = require("./auth");


// Auth Error codes
const errorEnum = {
    NONE: 0,
    UNAUTHORIZED: 1, // Unauthorized access
    INVALID: 2, // Invalid Credentials
};

/**
 * This class represents error messages for authnetication.
 */
class Message {
    constructor(options) {
        this.authorized = options.authorized || "User is authorized.";
        this.login = options.loggedIn || "Log in Successful.";
        this.unauthorized = options.unauthorized || "Not authorized.";
    }
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
    authResponse,
};
