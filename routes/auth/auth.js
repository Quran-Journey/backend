const serviceAccount = require("../../serviceAccountKey.json");
const auth = require('firebase/auth');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

/**
 * Check if the user accessing the resource is authorized or not.
 * 
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next the next middleware function
 * @returns a boolean value indicating whether the user is authenticated or not.
 */
function checkAuth(req, res, next) {
    if (req.method === 'GET') {
        // Allow GET requests to proceed without authentication
        next();
        return true;
    }
    if (req.cookies.session) {
        return admin.auth().verifySessionCookie(req.cookies.session)
            .then(() => {
                next();
                return true;
            }).catch(() => {
                res.status(403).send('Unauthorized!');
                return false;
            });
    } else {
        res.status(403).send('Unauthorized!');
        return false;
    }
}

module.exports = {
    checkAuth,
    admin,
}
