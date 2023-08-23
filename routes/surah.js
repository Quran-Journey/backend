const router = require("express").Router();
const surah = require("../services/surah");
const utils = require("./utils");

/*
 * @api [get] /surah/{surah_id}
 *  summary: "Fetch a surah by ID"
 *  description: "This is a fetch based on surah_id (same as surah_number)."
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surah_id
 *        type: integer
 *        required: true
 *        example: 1
 *      - in: query
 *        name: surah_number
 *        type: integer
 *        required: false
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding surah.
 *      schema:
 *          - $ref: '#/definitions/Surah'
 *    404:
 *      description: No surahs found with that ID.
 *
 */
router.get("/surah/:surah_id?", async (request, response) => {
    await surah.getSurahById(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /surah/{surah_id}/verses
 *  summary: "Fetch a surah's verses by the surah id"
 *  description: "This is a fetch based on surah_id (same as surah_number)."
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surah_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding surah.
 *      schema:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Verse'
 *    404:
 *      description: No surahs found with that ID.
 *
 */
router.get("/surah/:surah_id/verses", async (request, response) => {
    await surah.getSurahVerses(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /surah/{surah_id}/lessons
 *  summary: "Fetch a surah's lessons by surah id"
 *  description: "This is a fetch based on either surah_id or surah_number. One of the two must be passed in."
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surah_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding surah.
 *      schema:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Lesson'
 *    404:
 *      description: No surahs found with that ID.
 *
 */
router.get("/surah/:surah_id/lessons", async (request, response) => {
    await surah.getSurahLessons(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [put] /surah
 *  summary: "Update a Surah"
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: Surah
 *          description: the Surah to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Surah'
 *  responses:
 *    200:
 *      description: Surah has been updated.
 *    404:
 *      description: Could not find a surah with that id.
 *
 */
router.put("/surah", async (request, response) => {
    await surah.updateSurah(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /surahs
 *  summary: "Get Surahs"
 *  description: "Fetch an ordered list of all of the english names of the surahs in the Quran."
 *  tags:
 *    - Quran Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: An ordered list of surahs with their names and sura_numbers.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Surah'
 *
 */
router.get("/surahs", async (request, response) => {
    await surah.getSurahs().then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
