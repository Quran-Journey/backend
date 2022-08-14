const router = require("express").Router();
const rootWord = require("../model/words");
const utils = require("./utils");

/*
 * @api [get] /verse/{verse_id}
 *  summary: "Get the meanings of each word in a verse"
 *  description: "Fetches the words, their roots, and their meanings for a specific verse."
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: query
 *        name: verse_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: A list of the root words and their meanings pertaining to each word in a verse.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/VerseWordMeaning'
 *    404:
 *      description: No verse with that ID found.
 *
 */
router.get("/rootWord/:verse_id/", async (request, response) => {
    await lesson
        .getVerseRootWordsSentences(request.params)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

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
 *        name: rootWord_id
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
router.get("/rootWord/:rootWord_id", async (request, response) => {
    await rootWord
        .getrootWordById(request.params)
        .then(async function (result) {
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
router.post("/rootWord", async (request, response) => {
    await rootWord.createrootWord(request.body).then(async function (result) {
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
router.patch("/rootWord", async (request, response) => {
    await rootWord.updaterootWord(request.body).then(async function (result) {
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
router.delete("/rootWord/:rootWord_id", async (request, response) => {
    await rootWord.deleterootWord(request.params).then(async function (result) {
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
router.get("/rootWord", async (request, response) => {
    await rootWord.getAllrootWords().then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
