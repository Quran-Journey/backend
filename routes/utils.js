const c = require("../model/utils");

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
        console.log("Could not set a valid response status.")
    }
    response.json(result)
    return true;
}

function checkAuth(req, res, next) {
    if (req.cookies.session) {
        admin.auth().verifySessionCookie(req.cookies.session)
            .then(() => {
                next();
            }).catch(() => {
                res.status(403).send('Unauthorized')
            });
    } else {
        res.status(403).send('Unauthorized!')
    }
}

module.exports = {
    simpleResponse,
    checkAuth
}