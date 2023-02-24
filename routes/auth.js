const router = require("express").Router();
const utils = require("./utils");

// TODO: https://firebase.google.com/docs/auth/admin/custom-claims
// 1. Create an admin(can only be done by a logged -in master admin)
router.post("/setCustomClaims", (req,res)=>{

})
// 2. Change admin permissions
router.post("/modifyAccess", (req,res)=>{

})
// 3. Delete an admin(can only be done by a logged -in master admin)
router.delete("/deleteCustomClaims", (req,res)=>{

})

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
router.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();

    // Set session expiration to 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    utils.admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
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
router.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/auth/home");
    res.status(200);
    res.json({ data: "user logout successful", error: "no msg", success: "pass", ecode: 0 })
});


module.exports = router;