const router = require("express").Router();
const user = require("../../services/postgres/auth");
const utils = require("../utils");

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
router.post("/login", async (req, res) => {
    const idToken = req.body.idToken.toString();
    // Set session expiration to 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const options = { maxAge: expiresIn, httpOnly: true };

    user.login.then(
        (sessionCookie) => {
            res.cookie("session", sessionCookie, options);
            res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
            res.status(401).send("UNAUTHORIZED REQUEST!");
        }
    );
});

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
router.get("/logout", (req, res) => {
    res.clearCookie("session");
    res.status(200);
    res.json({
        data: "User Logout Successful",
        error: "",
        success: "Pass",
        ecode: 0,
    });
});

module.exports = router;
