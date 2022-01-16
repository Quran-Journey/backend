const c = require("../model/constants");

function simpleResponse(result, response) {
    // A result takes the following format: { data: d, error: msg, success: pass, ecode: code }
    var data = result.data;
    var message = result.error;
    var success = result.success;
    var ecode = result.ecode;

    if (success) {
        response.status(200);
    } else if (ecode == c.errorEnum.SERVER) {
        response.status(500);
    } else if (ecode == c.errorEnum.UNIQUE || ecode == c.errorEnum.FOREIGN) {
        // Should only occur in queries that includes insert and update.
        response.status(409);
    } else if (ecode == c.errorEnum.DNE) {
        // Should only occur in queries that includes select and delete.
        response.status(404);
    } else if (ecode == c.errorEnum.INVALID) {
        // Should only occur if the values passed into the body of the request are invalid i.e. a bad request
        response.status(400);
    } else {
        console.log("Could not set a valid response status.")
    }
    response.json(result)
    return true;
}

module.exports = {
    simpleResponse: simpleResponse
}