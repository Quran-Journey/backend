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

/*
 * @api [post] /mufasir
 *  summary: "Add Mufasir"
 *  description: "Add a mufasir."
 *  tags:
 *    - Mufasir Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: Successfully added mufasir.
 *
 */
router.post("/mufasir", async (request, response) => {
    await lesson.addMufasir(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [Put] Add Mufasir"
 *  description: "Add a mufasir."
 *  tags:
 *    - Mufasir Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: Successfully updated mufasir.
 *    404:
 *      description: A mufasir with that ID does not exist.
 *
 */
router.put("/mufasir", async (request, response) => {
    await lesson.updateMufasir(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [Delete] Delete Mufasir"
 *  description: "Remove a mufasir."
 *  tags:
 *    - Mufasir Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: Successfully deleted mufasir.
 *    404:
 *      description: A mufasir with that ID does not exist.
 *
 */
router.put("/mufasir", async (request, response) => {
    await lesson.updateMufasir(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
