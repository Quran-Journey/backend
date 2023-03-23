const router = require("express").Router();
const { errorEnum } = require("../model/utils");
const utils = require("./utils");

/*
 * @api [get] /login
 *  summary: "login test endpoint"
 *  description: "This is endpoint to support backend login."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *
 */
router.get("/login", async (req, res) => {
    const email = req.body.email;
    const pwd = req.body.password;

    utils.auth.signInWithEmailAndPassword(email, pwd)
        .then(async ({ user }) => {
            res.json({
                message: `Welcome ${user.displayName}`,
                idToken: user.accessToken,
                user,
            })
        })
})


/*
 * @api [post] /setCustomClaims
 *  summary: "set admin custom claim"
 *  description: "Create an admin(can only be done by a logged -in master admin)."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: successfully added to admin group.
 *    403:
 *      description: Error creating custom claims for user:
 *
 */
router.post("/setCustomClaims", (req, res) => {
    // Set admin privilege on the user corresponding to uid.
    const isMaster = req.body.isMaster;

    utils.admin
        .auth()
        .verifyIdTokenk(req.body.idToken)
        .then((claims) => {
            if (claims.master !== true) {
                throw new Error('current user unauthorized to create other admin')
            }
        })
        .setCustomUserClaims(req.body.uid, isMaster ? { master: true } : { admin: true })
        .then(() => {
            // The new custom claims will propagate to the user's ID token the
            // next time a new one is issued.
            currentUser.getIdToken(true)
            res.status(200).send("successfully added to admin group")
        })
        .catch((error) => {
            res.status(403).send(`Error creating custom claims for user: ${error}`)
            console.log('Error creating custom claims for user:', error);
        });
})

/*
 * @api [delete] /delete
 *  summary: "delete admin if custom claims is master"
 *  description: "Delete an admin(can only be done by a logged -in master admin)."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: Successfully deleted user.
 *    403:
 *      description: Error deleting user: ...
 *
 */
router.delete("/delete", (req, res) => {

    utils.admin
        .auth()
        .verifyIdTokenk(req.body.idToken)
        .then((claims) => {
            if (claims.master !== true) {
                throw new Error('current user unauthorized to delete other admin')
            }
        })
        .deleteUser(req.body.uid)
        .then(() => {
            res.status(200).send("Successfully deleted user")
            console.log('Successfully deleted user');
        })
        .catch((error) => {
            res.status(403).send(`Error deleting user: ${error}`)
            console.log('Error deleting user:', error);
        });
})


/*
 * @api [get] /verify
 *  summary: "verify custom claims set appropriately"
 *  description: "This is endpoint to test custom claims."
 *  tags:
 *    - Test Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: user is included in admin group.
 *    403:
 *      description: user unable to access resource.
 *
 */
router.get("/verify", (req, res) => {
    // Set admin privilege on the user corresponding to uid.
    utils.admin
        .auth()
        .verifyIdToken(req.body.idToken)
        .then((claims) => {
            if (claims.admin === true) {
                // Allow access to requested admin resource.
                res.status(200).send("user is included in admin group")
            } else {
                res.status(403).send("user unable to access resource")
            }
        });
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