const utils = require("utils");

const defaultMsg = new Message({});

/*
 * @api [get] /profile
 *  summary: "verify session cookie"
 *  description: "This endpoint is protected. only authorized admins can access"
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: redirect to profile.
 *    403:
 *      description: redirect to login.
 *
 */
async function getProfile(req, res) {
    const sessionCookie = req.cookies.session || "";

    utils.admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            // console.log("Logged in:", userData.email);
            // console.log("profile-backend", userData);
            return utils.setResult(
                {},
                true,
                defaultMsg.success,
                Errors.NONE
            )
        })
        .catch((error) => {
            res.status(401);
            return utils.setResult(
                {},
                false,
                defaultMsg.unauthorized,
                utils.Errors.NONE
            )
        });
}

/*
 * @api [get] /sessionLogin
 *  summary: "create session cookie"
 *  description: "This endpoint uses firebase to create cookies for the admin to access privliged endpoints."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: creates session cookie.
 *    401:
 *      description: UNAUTHORIZED REQUEST!
 *
 */
async function login(idToken) {
    // Set session expiration to 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    return await utils.admin.auth().createSessionCookie(idToken, { expiresIn });
}

/*
 * @api [get] /sessionLogout
 *  summary: "clears cookies"
 *  description: "This endpoint clears cookies, removing state history of user."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: redirect.
 *
 */
async function logout(data, sessionCookie) {
    res.clearCookie("session");
    res.redirect("/auth/home");
    res.status(200);
    res.json({
        data: "User Logout Successful",
        error: "",
        success: "Pass",
        ecode: 0,
    });
}

module.exports = {
    login,
    logout,
};
