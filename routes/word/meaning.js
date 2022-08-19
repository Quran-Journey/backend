const router = require("express").Router();
const meaning = require("../../model/word/meaning");
const utils = require("../utils");

/*
 * @api [get] /meanings/{verse_id}
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
router.get("/root/meanings/verse/:verse_id/", async (request, response) => {
    await meaning
        .getVerseRootWordsSentences(request.params)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

/*
 * @api [post] /meaning
 *  summary: "Add a meaning to a rootword"
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
router.post("/root/meaning", async (request, response) => {
    await meaning.addMeaning(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /meaning
 *  summary: "Edit meaning"
 *  description: "This edits a root word's meaning"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the rootWord to update and it's new attributes
 *  responses:
 *    200:
 *      description: rootWord has been created.
 *      schema:
 *          $ref: '#/definitions/RootMeaning'
 *
 */
router.patch("/root/meaning", async (request, response) => {
    await meaning.editMeaning(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
