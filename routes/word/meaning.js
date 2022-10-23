const router = require("express").Router();
const meaning = require("../../model/word/meaning");
const utils = require("../utils");

/*
 * @api [get] /word/root/meanings/verse/{verse_id}
 *  summary: "Get the meanings of each word in a verse"
 *  description: "Fetches the words, their roots, and their meanings for a specific verse."
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: path
 *      name: verse_id
 *      type: integer
 *      required: true
 *      example: 1
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
 * @api [get] /word/root/meaning/{meaning_id}
 *  summary: "Fetch meaning"
 *  description: "This fetches a root word's meaning"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: path
 *      name: meaning_id
 *      description: the id of the meaning to be updated
 *      type: integer
 *      required: true
 *      example: 1
 *  responses:
 *    200:
 *      description: root meaning has been fetched.
 *      schema:
 *          $ref: '#/definitions/RootMeaning'
 *    404:
 *      description: No root meaning with that ID found.
 */
router.get("/root/meaning/:meaning_id", async (request, response) => {
    await meaning.getMeaning(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /word/root/meaning
 *  summary: "Add a meaning to a rootword"
 *  description: "This endpoint adds a meaning to a root word"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: body
 *      name: root meaning
 *      schema:
 *          type: object
 *          required:
 *            - root_id
 *            - meaning
 *          properties:
 *            root_id:
 *                type: integer
 *                description: the id of the root word
 *                example: 936
 *            meaning:
 *                type: string
 *                description: The meaning.
 *                example: A name
 *  responses:
 *    200:
 *      description: rootWord has been created.
 *      schema:
 *          $ref: '#/definitions/RootMeaning'
 */
router.post("/root/meaning", async (request, response) => {
    await meaning.addMeaning(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [put] /word/root/meaning
 *  summary: "Edit meaning"
 *  description: "This edits a root word's meaning"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: body
 *      name: root meaning
 *      schema:
 *          $ref: '#/definitions/RootMeaning'
 *  responses:
 *    200:
 *      description: root meaning has been updated.
 *      schema:
 *          $ref: '#/definitions/RootMeaning'
 *    404:
 *      description: No root meaning with that ID found.
 *
 */
router.put("/root/meaning", async (request, response) => {
    await meaning.editMeaning(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [delete] /word/root/meaning/{meaning_id}
 *  summary: "Delete meaning"
 *  description: "Deletes a root word's meaning"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: path
 *      name: meaning_id
 *      description: the id of the meaning to be deleted
 *      type: integer
 *      required: true
 *      example: 1
 *  responses:
 *    200:
 *      description: meaning has been deleted.
 *      schema:
 *          $ref: '#/definitions/RootMeaning'
 *    404:
 *      description: No verse with that ID found.
 */
router.delete("/root/meaning/:meaning_id", async (request, response) => {
    await meaning.deleteMeaning(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
