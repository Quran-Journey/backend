const router = require("express").Router();
const tafsir = require("../services/tafsir");
const utils = require("./utils");


/*
 * @api [get] /tafsir/{tafsir_id}
 *  summary: "Fetch a tafsir by ID"
 *  description: "This is a general fetch and expects one parameter. It will return tafisr information. "
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: tafsir_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding tafsir along with any mufasir and book information.
 *      schema:
 *          $ref: '#/definitions/Tafsir'
 *    404:
 *      description: No tafsirs found with that ID.
 *
 */
router.get("/tafsir/:tafsir_id", async (request, response) => {
    await tafsir.getTafsirById(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /tafsir
 *  summary: "Create a tafsir"
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          description: the tafsir to create and its values
 *          schema:
 *              $ref: '#/definitions/Tafsir'
 *  responses:
 *    200:
 *      description: Tafsir has been created.
 *
 */
router.post("/tafsir", async (request, response) => {
    await tafsir.createTafsir(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /tafsir
 *  summary: "Update a tafsir"
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the tafsir to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Tafsir'
 *  responses:
 *    200:
 *      description: Tafsir has been updated.
 *    404:
 *      description: Could not find a tafsir with that id.
 *
 */
router.patch("/tafsir", async (request, response) => {
    await tafsir.updateTafsir(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});
/*
 * @api [delete] /tafsir
 *  summary: "Delete a tafsir"
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the tafsir to be deleted
 *          schema:
 *              $ref: '#/definitions/Tafsir'
 *  responses:
 *    200:
 *      description: The Tafsir has been deleted.
 *      schema:
 *          $ref: '#/definitions/Tafsir'
 *    404:
 *      description: Could not find a Tafsir with that id.
 *
 */
router.delete("/tafsir", async (request, response) => {
    await tafsir.deleteTafsir(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});


module.exports = router;
