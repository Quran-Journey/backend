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
 * @api [get] /lesson
 *  summary: "Fetch a lesson by ID."
 *  tags:
 *    - Lessons
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 *  responses:
 *    200:
 *      description: A single lesson.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: No lessons found with that ID.
 *
 */
router.post("/lesson", async (request, response) => {
    await l.createLesson(request.body).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /lesson
 *  summary: "Update a lesson's information."
 *  tags:
 *    - Lessons
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *          required: true
 *  responses:
 *    200:
 *      description: A single lesson.
 *      schema:
 *          type: object
 *          properties:
 *              success:
 *                  type: boolean
 *                  example: true
 *                  description: true if attempt to update lesson was successful, false if unsuccesful
 *              
 *    404:
 *      description: No lessons found with that ID.
 *
 */
router.post("/lesson", async (request, response) => {
    await l.updateLesson(request.body).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

module.exports = router;
