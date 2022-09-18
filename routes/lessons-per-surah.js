const router = require("express").Router();
const lessons_per_surah = require("../model/lessons-per-surah");
const utils = require("./utils");


/*
 * @api [get] /lessons_per_surah/{surah_id}
 *  summary: "Fetch the lessons by surah ID"
 *  description: "This is a general fetch and expects one parameter. 
 *  It will return all lessons for that surah ID. "
 *  tags:
 *    - Lesson Endpoints
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
 *      description: The surah ID for which we want the corresponding lessons for.
 *      schema:
 *          $ref: '#/definitions/lessons-per-surah'
 *    404:
 *      description: No lessons found with that ID.
 *
 */
router.get("/lessons-per-surah/:surah_id", async (request, response) => {
    await lessons_per_surah.getLessonsBySurahID(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;
