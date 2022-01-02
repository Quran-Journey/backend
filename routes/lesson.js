const router = require("express").Router();
const l = require("../model/lesson");
const c = require("./routingConstants");

/*
 * @api [get] /lessons
 *  summary: "Fetch all lessons."
 *  tags:
 *    - Lesson Endpoints
 *  responses:
 *    200:
 *      description: A list of lessons.
 *      response:
 *        - $ref: '#/components/schemas/AllLessons'
 *    404:
 *      description: No lessons found.
 *
 */
router.get("/lessons", async (request, response) => {
    await l.getLessons(request.body).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

/*
 * @api [post] /lesson
 *  summary: "Fetch a lesson by ID."
 *  tags:
 *    - Lesson Endpoints
 *  parameters:
 *        - id: integer
 *          required: true
 *  responses:
 *    200:
 *      description: A single lesson.
 *      response:
 *        - $ref: '#/components/schemas/lesson'
 *
 */
router.post("/lesson", async (request, response) => {
    await l.createLesson(request.body).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

/*
 * @api [post] /surah/notes
 *  summary: "Upload notes to a particular surah."
 *  tags:
 *    - Surah Endpoints
 *  parameters:
 *        - surah_id: integer
 *          required: true
 *        - name: notes
 *          in: formdata
 *          description: The uploaded notes
 *          required: true
 *          type: file
 *  responses:
 *    200:
 *      description: A single lesson.
 *
 */
router.post("/lesson", async (request, response) => {});

module.exports = router;
