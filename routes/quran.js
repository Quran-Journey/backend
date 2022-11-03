const router = require("express").Router();
const quran = require("../model/quran");
const utils = require("./utils");

/*
 * @api [get] /chapters
 *  summary: "Get Chapters"
 *  description: "Fetch an ordered list of all of the english names of the chapters in the Quran."
 *  tags:
 *    - Quran Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: An ordered list of chapters with their names and sura_numbers.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Chapter'
 *
 */
router.get("/chapters", async (request, response) => {
    await quran.getChapters().then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /chapter/{sura_number}
 *  summary: "Get Chapter Verses"
 *  description: "Fetches the verses of a chapter"
 *  tags:
 *    - Quran Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: sura_number
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: A list of the verses in a chapter.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Verse'
 *    404:
 *      description: No chapter with that ID found.
 *
 */
router.get("/chapter/:sura_number", async (request, response) => {
    await quran.getChapterVerses(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
