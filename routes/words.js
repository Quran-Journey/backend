const router = require("express").Router();
const rootWord = require("../model/words");
const utils = require("./utils");

/*
 * @api [get] /verse/{verse_id}
 *  summary: "Get a Verse's root words"
 *  description: "Fetches the root words and their meanings for each of the words in a verse."
 *  tags:
 *    - Root Endpoints
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
 *          $ref: '#/definitions/RootWord'
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
 *    - RootWord Endpoints
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
 *          $ref: '#/definitions/rootWord'
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
 *    - RootWord Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the rootWord to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/rootWord'
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
 *    - RootWord Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the rootWord to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/rootWord'
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
 *    - RootWord Endpoints
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
 *          $ref: '#/definitions/rootWord'
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
 *    - RootWord Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: All rootWords have been fetched.
 *      schema:
 *          $ref: '#/definitions/rootWord'
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
