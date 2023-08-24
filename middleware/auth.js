const express = require("express");
const FireBaseAuthService = require("../services/firebase/auth");

/**
 * Currently, any get requests should not be blocked by auth.
 * Everything else should be checked.
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
function authMiddleware(req, res, next) {
    if (req.method != "GET") {
        FireBaseAuthService.checkAuth(req, res, next)
    }
    next();
}

module.exports = {
    authMiddleware: authMiddleware
}