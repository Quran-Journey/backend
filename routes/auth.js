const router = require("express").Router();
const utils = require("./utils");

/*
 * @api [get] /test
 *  summary: "authorization test endpoint"
 *  description: "This is endpoint to test checkAuth middleware."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: Hello World!.
 *    403:
 *      description: Unauthorized.
 *
 */
router.get("/test", async (req, res) => {
    res.json({
        message: 'Hello World!'
    })
});



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
router.get("/profile", function (req, res) {
    const sessionCookie = req.cookies.session || "";

    utils.admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            console.log("Logged in:", userData.email)
            console.log("profile-backend", userData)
            res.render("profile.html");
            res.status(200);
            res.json({ data: "user authorized", error: "no msg", success: "pass", ecode: 0 })
        })
        .catch((error) => {
            res.redirect("/auth/home");
            res.status(401);
            res.json({ data: "access denied", error: "user failed to authorize", success: "fail", ecode: 4 })
        });
});

module.exports = router;