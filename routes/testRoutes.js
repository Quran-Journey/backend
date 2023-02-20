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
router.get("/test", async (request, response) => {
    response.json({
        message: 'Hello World!'
    })
});

module.exports = router;
