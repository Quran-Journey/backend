const router = require("express").Router();
const reflection = require("../model/reflection");
const utils = require("./utils");

/*
 * @api [get] /reflection/{reflection_id}
 *  summary: "Fetch a Reflection by ID"
 *  description: "This is a general fetch and has no parameters. It will fetch all of the reflections in the database."
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: reflection_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding reflection.
 *      schema:
 *          $ref: '#/definitions/Reflection'
 *    404:
 *      description: No reflections found with that ID.
 *
 */
router.get("/reflection/:reflection_id", async (request, response) => {
    await reflection.getReflectionById(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /reflection
 *  summary: "Create a reflection"
 *  description: "This creates a reflection from the data attribute in the request body"
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the reflection to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Reflection'
 *  responses:
 *    200:
 *      description: Reflection has been created.
 *
 */
router.post("/reflection", async (request, response) => {
    await reflection.createReflection(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /reflection
 *  summary: "Update a reflection"
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the reflection to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Reflection'
 *  responses:
 *    200:
 *      description: Reflection has been updated.
 *    404:
 *      description: Could not find a reflection with that id.
 *
 */
router.patch("/reflection", async (request, response) => {
    await reflection.updateReflection(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [delete] /reflection
 *  summary: "Delete a reflection"
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the reflection to be deleted
 *          schema:
 *              $ref: '#/definitions/Reflection'
 *  responses:
 *    200:
 *      description: The reflection has been deleted.
 *      schema:
 *          $ref: '#/definitions/reflection'
 *    404:
 *      description: Could not find a reflection with that id.
 *
 */
router.delete("/reflection/:reflection_id", async (request, response) => {
    await reflection.deleteReflection(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /reflection
 *  summary: "get all reflection"
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: All reflections have been fetched.
 *      schema:
 *          $ref: '#/definitions/Reflection'
 *    404:
 *      description: Could not find any reflections.
 *
 */
router.get("/reflection", async (request, response) => {
    await reflection.getAllReflections().then(async function (result) {
        return utils.simpleResponse(result, response);
    })
});

module.exports = router;