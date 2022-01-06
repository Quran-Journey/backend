const router = require("express").Router();
const l = require("../model/lesson");
const c = require("./routingConstants");

/*
 * @api [get] /lessons
 *  summary: "Fetch all lessons."
 *  description: "This is a general fetch and has no parameters. It will fetch all of the lessons in the database."
 *  tags:
 *    - Lessons
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: A list of lessons.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Lesson'
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
 * @api [get] /lessons
 *  summary: "Fetch all lessons."
 *  description: "This is a general fetch and has no parameters. It will fetch all of the lessons in the database."
 *  tags:
 *    - Lessons
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: A list of lessons.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: No lessons found with that ID.
 *
 */
router.get("/lesson/:lesson_id", async (request, response) => {
    await l.getLessonById(request.params).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

/*
 * @api [post] /lesson
 *  summary: "Create a lesson."
 *  tags:
 *    - Lessons
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to update and it's new attributes
 *          schema:
 *              type: object
 *              required:
 *                  - lesson_id
 *                  - lesson_date
 *                  - source
 *              properties:
 *                  lesson_id:
 *                      type: integer
 *                      example: 1
 *                  lesson_date:
 *                      type: date
 *                      example: 2025-1-30
 *                  source:
 *                      type: string
 *                      example: "aURL.com/video"
 *  responses:
 *    200:
 *      description: Lesson has been created.
 *
 */
router.post("/lesson", async (request, response) => {
    await l.createLesson(request.body).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /lesson
 *  summary: "Update a lesson."
 *  tags:
 *    - Lessons
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to update and it's new attributes
 *          schema:
 *              type: object
 *              required:
 *                  - lesson_id
 *                  - lesson_date
 *                  - source
 *              properties:
 *                  lesson_id:
 *                      type: integer
 *                      example: 1
 *                  lesson_date:
 *                      type: date
 *                      example: 2022-1-30
 *                  source:
 *                      type: string
 *                      example: "aNewURL.com/video"
 *  responses:
 *    200:
 *      description: Lesson has been updated.
 *    404:
 *      description: Could not find a lesson with that id.
 *
 */
router.patch("/lesson", async (request, response) => {
    await l.updateLesson(request.body).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

module.exports = router;
