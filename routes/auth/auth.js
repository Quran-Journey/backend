


/*
 * @api [post] /login
 *  summary: "Creates a session cookie"
 *  description: "This endpoint uses firebase to create cookies for the admin to access privliged endpoints."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: creates session cookie.
 *    401:
 *      description: unauthorized request.
 *
 */

/*
 * @api [post] /logout
 *  summary: "Clears the session cookie"
 *  description: "This endpoint clears cookies, effectively unauthorizing the user."
 *  tags:
 *    - Auth
 *  produces:
 *    - application/json
 *  responses:
 *    301:
 *      description: successfully clears the session cookies.
 *
 */
async function logout(data, sessionCookie) {
    res.clearCookie("session");
    res.status(302).redirect("offlinequran.com"); // TODO: This should not be hardcoded
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
