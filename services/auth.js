const { Result } = require("../utils/validation");

async function login(idToken) {
    // Set session expiration to 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    return await utils.admin.auth().createSessionCookie(idToken, { expiresIn });
}

async function logout(data, sessionCookie) {
    res.clearCookie("session");
    res.redirect("/auth/home");
    res.status(200);
    res.json({
        data: "User Logout Successful",
        msg: "",
        success: "Pass",
        code: 0,
    });
}

module.exports = {
    login,
    logout,
};
