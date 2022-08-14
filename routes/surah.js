const router = require("express").Router();
const surah = require("../model/surah");
const utils = require("./utils");

/*
 * @api [get] /surah/{surah_id}
 *  summary: "Fetch a surah by ID"
 *  description: "This is a general fetch and has no parameters. It will fetch all of the lessons in the database."
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: lesson_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding lesson.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: No lessons found with that ID.
 *
 */
router.get("/surah/:surah_id", async (request, response) => {
    await surah.getSurahById(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /lesson
 *  summary: "Create a Surah"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Lesson'
 *  responses:
 *    200:
 *      description: Lesson has been created.
 *
 */
router.post("/lesson", async (request, response) => {
    await lesson.createLesson(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /lesson
 *  summary: "Update a Surah"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Lesson'
 *  responses:
 *    200:
 *      description: Lesson has been updated.
 *    404:
 *      description: Could not find a lesson with that id.
 *
 */
router.patch("/surah", async (request, response) => {
    await surah.updateSurah(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [delete] /Surah
 *  summary: "Delete a Surah"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to be deleted
 *          schema:
 *              $ref: '#/definitions/Lesson'
 *  responses:
 *    200:
 *      description: The Lesson has been deleted.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: Could not find a lesson with that id.
 *
 */
router.delete("/surah/:surah", async (request, response) => {
    await surah.deleteSurah(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});


module.exports = router;
