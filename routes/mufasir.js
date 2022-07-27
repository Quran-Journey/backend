const router = require("express").Router();
const lesson = require("../model/mufasir");
const utils = require("./utils");

/*
 * @api [get] /mufasir
 *  summary: "Get Mufasireen"
 *  description: "Fetch an ordered list of all of the names of mufasireen."
 *  tags:
 *    - Mufasir Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: An ordered list of mufasireen with their information.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Mufasir'
 *
 */
router.get("/mufasir", async (request, response) => {
    await lesson.getMufasireen().then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});


module.exports = router;
