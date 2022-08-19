const router = require("express").Router();
const root = require("../../model/word/root");
const utils = require("../utils");

/*
 * @api [get] /rootWord/{rootWord_id}
 *  summary: "Fetch a rootWord by ID"
 *  description: "Fetch a root word by it's ID."
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: root_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding rootWord.
 *      schema:
 *          $ref: '#/definitions/RootWord'
 *    404:
 *      description: No rootWords found with that ID.
 *
 */
router.get("/root/:root_id", async (request, response) => {
    await root.getrootWordById(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /rootWord
 *  summary: "Create a rootWord"
 *  description: "This creates a rootWord from the data attribute in the request body"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the rootWord to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/RootWord'
 *  responses:
 *    200:
 *      description: rootWord has been created.
 *
 */
router.post("/root", async (request, response) => {
    await root.createrootWord(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /rootWord
 *  summary: "Update a rootWord"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the rootWord to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/RootWord'
 *  responses:
 *    200:
 *      description: rootWord has been updated.
 *    404:
 *      description: Could not find a rootWord with that id.
 *
 */
router.patch("/root", async (request, response) => {
    await root.updaterootWord(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [delete] /rootWord
 *  summary: "Delete a rootWord"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: params
 *          name: id
 *          description: the rootWord to be deleted
 *          schema:
 *              $ref: '#/definitions/rootWord'
 *  responses:
 *    200:
 *      description: The rootWord has been deleted.
 *      schema:
 *          $ref: '#/definitions/RootWord'
 *    404:
 *      description: Could not find a rootWord with that id.
 *
 */
router.delete("/root/:root_id", async (request, response) => {
    await root.deleterootWord(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /rootWord
 *  summary: "Get all rootWords"
 *  description: "This is used to request all rootWords stored in the rootWord Table"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: All rootWords have been fetched.
 *      schema:
 *          $ref: '#/definitions/RootWord'
 *    404:
 *      description: Could not find any rootWords.
 *
 */
router.get("/roots", async (request, response) => {
    await root.getAllrootWords().then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;