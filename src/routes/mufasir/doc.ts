/*
 * @api [get] /mufasir
 *  summary: "Get Mufasireen"
 *  description: "Fetch an ordered list of all of the names of mufasireen."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: An ordered list of mufasireen with their information.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Mufasir'
 *
 */

/*
 * @api [get] /mufasir/{mufasirId}
 *  summary: "Get a Mufasir"
 *  description: "Fetch a mufasir by ID."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *
 *  parameters:
 *      - in: path
 *        name: mufasirId
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The mufasir's information.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Mufasir'
 *
 */

/*
 * @api [post] /mufasir
 *  summary: "Add Mufasir"
 *  description: "Add a mufasir."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: body
 *      name: mufasir information
 *      schema:
 *         type: object
 *         required:
 *           - mufasirName
 *           - death
 *         properties:
 *           mufasirName:
 *            type: string
 *            description: The name of the mufasir
 *            example: "Ibn Kathir"
 *           death:
 *            type: string
 *            description: The date that the mufasir passed away
 *            example: 1203 H
 *  responses:
 *    200:
 *      description: Successfully added mufasir.
 *      schema:
 *          $ref: '#/definitions/Mufasir'
 *    404:
 *      description: A mufasir with that ID does not exist.
 *
 */

/*
 * @api [put] /mufasir
 *  summary: "Update Mufasir"
 *  description: "Update a mufasir."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: body
 *      name: mufasir
 *      schema:
 *          $ref: "#/definitions/Mufasir"
 *  responses:
 *    200:
 *      description: Successfully updated mufasir.
 *      schema:
 *          $ref: '#/definitions/Mufasir'
 *    404:
 *      description: A mufasir with that ID does not exist.
 *
 */

/*
 * @api [delete] /mufasir/{mufasirId}
 *  summary: "Remove Mufasir"
 *  description: "Remove a mufasir."
 *  tags:
 *    - Tafsir Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: mufasirId
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: Successfully deleted mufasir.
 *      schema:
 *          $ref: '#/definitions/Reflection'
 *    404:
 *      description: A mufasir with that ID does not exist.
 *
 */
