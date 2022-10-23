const router = require("express").Router();
const verseWord = require("../../model/word/verseWord");
const utils = require("../utils");

/*
 * @api [get] /word/verse/{verse_word_id}
 *  summary: "Fetch a verseWord by ID"
 *  description: "Fetch a verse_word word by it's ID."
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: verse_word_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding verseWord.
 *      schema:
 *          $ref: '#/definitions/VerseWord'
 *    404:
 *      description: No verseWords found with that ID.
 *
 */
router.get("/verse/:verse_word_id", async (request, response) => {
    await verseWord
        .getVerseWordById(request.params)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

/*
 * @api [post] /word/verse
 *  summary: "Create a verseWord"
 *  description: "This creates a verseWord from the data attribute in the request body"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: body
 *        name: the word's explanation
 *        schema:
 *            type: object
 *            required:
 *                - word_id
 *                - verse_id
 *                - visible
 *                - explanation
 *            properties:
 *                word_id:
 *                    type: integer
 *                    description: the id of the arabic word being associated with the verse
 *                    example: 1
 *                verse_id:
 *                    type: integer
 *                    description: the id of the verse that is being associated with the word
 *                    example: 1
 *                visible:
 *                    type: boolean
 *                    description: whether the value is visible or not
 *                    example: true
 *                explanation:
 *                    type: string
 *                    description: The explanation that is made for the word in the verse.
 *                    example: The وَ in the word وَالْعَادِيَاتِ is for taking an oath. Thus we can look for the response to the oath in ayah 6.
 *  responses:
 *    200:
 *      description: verseWord has been created.
 *
 */
router.post("/verse", async (request, response) => {
    await verseWord.linkVerseToWord(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /word/verse
 *  summary: "Update a verseWord"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: body
 *        name: Verse Word
 *        schema:
 *            $ref: '#/definitions/VerseWord'
 *  responses:
 *    200:
 *      description: VerseWord has been updated.
 *      schema:
 *          $ref: '#/definitions/VerseWord'
 *    404:
 *      description: Could not find a verseWord with that id.
 *
 */
router.patch("/verse", async (request, response) => {
    await verseWord.updateVerseWord(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [delete] /word/verse/{verse_word_id}
 *  summary: "Delete a verseWord"
 *  tags:
 *    - Linguistic Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: path
 *          name: verse_word_id
 *          type: integer
 *          required: true
 *          example: 1
 *  responses:
 *    200:
 *      description: The verseWord has been deleted.
 *      schema:
 *          $ref: '#/definitions/VerseWord'
 *    404:
 *      description: Could not find a verseWord with that id.
 *
 */
router.delete("/verse/:verse_word_id", async (request, response) => {
    await verseWord
        .deleteVerseWord(request.params)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

module.exports = router;
