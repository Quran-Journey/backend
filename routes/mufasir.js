const router = require("express").Router();
const lesson = require("../model/mufasir");
const utils = require("./utils");

/*
 * @api [get] /mufasir
 *  summary: "Get Mufasireen"
 *  description: "Fetch an ordered list of all of the names of mufasireen."
 *  tags:
 *    - Tafsir Endpoints
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
 * @api [get] /mufasir/{mufasir_id}
 *  summary: "Get a Mufasir"
 *  description: "Fetch a mufasir by ID."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *
 *  parameters:
 *      - in: path
 *        name: mufasir_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The mufasir's information.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Mufasir'
 *
 */
router.get("/mufasir/:mufasir_id", async (request, response) => {
    await lesson.getMufasir(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /mufasir
 *  summary: "Add Mufasir"
 *  description: "Add a mufasir."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: body
 *      name: mufasir information
 *      schema:
 *         type: object
 *         required:
 *           - mufasir_name
 *           - death
 *         properties:
 *           mufasir_name:
 *            type: string
 *            description: The name of the mufasir
 *            example: "Ibn Kathir"
 *           death:
 *            type: string
 *            description: The date that the mufasir passed away
 *            example: 1203 H
 *  responses:
 *    200:
 *      description: Successfully added mufasir.
 *      schema:
 *          $ref: '#/definitions/Mufasir'
 *    404:
 *      description: A mufasir with that ID does not exist.
 *
 */
router.post("/mufasir", async (request, response) => {
    await lesson.addMufasir(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [put] /mufasir
 *  summary: "Update Mufasir"
 *  description: "Update a mufasir."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: body
 *      name: mufasir
 *      schema:
 *          $ref: "#/definitions/Mufasir"
 *  responses:
 *    200:
 *      description: Successfully updated mufasir.
 *      schema:
 *          $ref: '#/definitions/Mufasir'
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
 * @api [delete] /mufasir/{mufasir_id}
 *  summary: "Remove Mufasir"
 *  description: "Remove a mufasir."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: mufasir_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: Successfully deleted mufasir.
 *      schema:
 *          $ref: '#/definitions/Reflection'
 *    404:
 *      description: A mufasir with that ID does not exist.
 *
 */
router.delete("/mufasir/:mufasir_id", async (request, response) => {
    await lesson.deleteMufasir(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
