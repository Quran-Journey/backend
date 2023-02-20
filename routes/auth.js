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


router.get("/profile", function (req, res) {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            console.log("Logged in:", userData.email)
            console.log("profile-backend", userData)
            res.render("profile.html");
        })
        .catch((error) => {
            res.redirect("/login");
        });
});

router.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();

    // Set session expiration to 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
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

router.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/home");
});

module.exports = router;
