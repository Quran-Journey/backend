/*
 * @api [get] /reflection/{reflection_id}
 *  summary: "Fetch a Reflection by ID"
 *  description: "Fetch a reflection by it's ID."
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

/*
 * @api [get] /reflection/{surah_id}/{verse_id}
 *  summary: "Fetch a Reflection by the surah and verse ID"
 *  description: "Fetch a reflection by it's surah id and verse ID."
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surah_id
 *        type: integer
 *        required: true
 *        example: 12
 *      - in: path
 *        name: verse_id
 *        type: integer
 *        required: true
 *        example: 134
 *  responses:
 *    200:
 *      description: The corresponding reflection.
 *      schema:
 *          $ref: '#/definitions/Reflection'
 *    404:
 *      description: No reflections found with those IDs.
 *
 */

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
 *          name: reflection information
 *          schema:
 *              type: object
 *              required:
 *                  - verse_id
 *                  - title
 *                  - reflection
 *              properties:
 *                  verse_id:
 *                      type: integer
 *                      description: to identify the verse that the reflection is refering to
 *                      example: 23
 *                  title:
 *                      type: string
 *                      description: a title to the refelction
 *                      example: "My Reflection"
 *                  reflection:
 *                      type: string
 *                      description: refelction on verse
 *                      example: "I have..."
 *
 *  responses:
 *    200:
 *      description: Reflection has been created.
 *      schema:
 *        $ref: '#/definitions/Reflection'
 *
 */

/*
 * @api [patch] /reflection
 *  summary: "Update a reflection"
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: reflection
 *          schema:
 *              $ref: '#/definitions/Reflection'
 *  responses:
 *    200:
 *      description: Reflection has been updated.
 *      schema:
 *          $ref: '#/definitions/Reflection'
 *    404:
 *      description: Could not find a reflection with that id.
 *
 */

/*
 * @api [delete] /reflection/{reflection_id}
 *  summary: "Delete a reflection"
 *  tags:
 *    - Reflection Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: path
 *          name: reflection_id
 *          description: the id of the reflection to be deleted
 *          type: integer
 *          required: true
 *  responses:
 *    200:
 *      description: The reflection has been deleted.
 *      schema:
 *          $ref: '#/definitions/Reflection'
 *    404:
 *      description: Could not find a reflection with that id.
 *
 */

/*
 * @api [get] /reflection
 *  summary: "Get all reflections"
 *  description: "This is used to request all reflections stored in the Reflection Table"
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


