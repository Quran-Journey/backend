const router = require("express").Router();
import l from '../model/lesson';
import c from './routingConstants';

/*
 * @api [get] /lessons
 *  summary: "Returns all lessons from the system."
 *  tags:
 *    - lesson
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
 * @api [get] /lessons
 *  summary: "Returns all lessons from the system."
 *  tags:
 *    - lesson
 *  parameters:
 *        - $ref: '#/components/AllLessons'
 *  responses:
 *    200:
 *      description: A list of lessons.
 *      response:
 *        - $ref: '#/components/schemas/AllLessons'
 *    404:
 *      description: No lessons found.
 *
 */
router.post("/lesson", async (request, response) => {
  await l.createLesson(request.body).then(async function (result) {
      return c.simpleResponse(result, response);
  });
});

export default router;
