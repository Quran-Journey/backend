
/*
 * @api [get] /tafsir/{tafsir_id}
 *  summary: "Fetch a tafsir by ID"
 *  description: "This is a general fetch and expects one parameter. It will return tafsir information."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: tafsir_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding tafsir along with any mufasir and book information.
 *      schema:
 *          $ref: '#/definitions/Tafsir'
 *    404:
 *      description: No tafsirs found with that ID.
 *
 */

/*
 * @api [post] /tafsir
 *  summary: "Create a tafsir"
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          description: the tafsir to create and its values
 *          schema:
 *              $ref: '#/definitions/Tafsir'
 *  responses:
 *    200:
 *      description: Tafsir has been created.
 *
 */

/*
 * @api [patch] /tafsir
 *  summary: "Update a tafsir"
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the tafsir to update and its new attributes
 *          schema:
 *              $ref: '#/definitions/Tafsir'
 *  responses:
 *    200:
 *      description: Tafsir has been updated.
 *    404:
 *      description: Could not find a tafsir with that id.
 *
 */

/*
 * @api [delete] /tafsir
 *  summary: "Delete a tafsir"
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the tafsir to be deleted
 *          schema:
 *              $ref: '#/definitions/Tafsir'
 *  responses:
 *    200:
 *      description: The Tafsir has been deleted.
 *      schema:
 *          $ref: '#/definitions/Tafsir'
 *    404:
 *      description: Could not find a Tafsir with that id.
 *
 */
