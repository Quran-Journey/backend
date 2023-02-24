const router = require("express").Router();
const utils = require("./utils");


router.get("/home", (req, res) => {
    res.render("index.html")
})

router.get("/login", (req, res) => {
    res.render("login.html")
})

router.get("/signup", (req, res) => {
    res.render("signup.html")
})

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