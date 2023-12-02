/**
 * Contains routes specific to authentication (authorization is handled in middleware)
 */
const router = require("express").Router();
const AuthMiddlware = require("../middleware/auth");
const responses = require("../utils/responses");

/*
 * @api [get] /login
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

    AuthMiddlware.authenticate(idToken).then(
        (sessionCookie) => {
            res.cookie("session", sessionCookie, AuthMiddlware.OPTIONS);
            
            res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
            res.status(401).send("UNAUTHORIZED REQUEST!");
        }
    );
});

/*
 * @api [get] /logout
 *  summary: "clears session cookies"
 *  description: "This endpoint clears session cookies, removing state history of user."
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
    res.status(302).redirect("offlinequran.com"); // TODO: This should not be hardcoded
    response.authResponse();
});

module.exports = router;
