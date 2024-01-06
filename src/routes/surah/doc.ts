/*
 * @api [get] /surah/{surahId}
 *  summary: "Fetch a surah by ID"
 *  description: "This is a fetch based on surahId (same as surahNumber)."
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surahId
 *        type: integer
 *        required: true
 *        example: 1
 *      - in: query
 *        name: surahNumber
 *        type: integer
 *        required: false
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding surah.
 *      schema:
 *          - $ref: '#/definitions/Surah'
 *    404:
 *      description: No surahs found with that ID.
 *
 */


/*
 * @api [get] /surah/{surahId}/verses
 *  summary: "Fetch a surah's verses by the surah id"
 *  description: "This is a fetch based on surahId (same as surahNumber)."
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surahId
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding surah.
 *      schema:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Verse'
 *    404:
 *      description: No surahs found with that ID.
 *
 */


/*
 * @api [get] /surah/{surahId}/lessons
 *  summary: "Fetch a surah's lessons by surah id"
 *  description: "This is a fetch based on either surahId or surahNumber. One of the two must be passed in."
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surahId
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding surah.
 *      schema:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Lesson'
 *    404:
 *      description: No surahs found with that ID.
 *
 */

/*
 * @api [put] /surah
 *  summary: "Update a Surah"
 *  tags:
 *    - Surah Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: Surah
 *          description: the Surah to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Surah'
 *  responses:
 *    200:
 *      description: Surah has been updated.
 *    404:
 *      description: Could not find a surah with that id.
 *
 */

/*
 * @api [get] /surahs
 *  summary: "Get Surahs"
 *  description: "Fetch an ordered list of all of the english names of the surahs in the Quran."
 *  tags:
 *    - Quran Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: An ordered list of surahs with their names and sura_numbers.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Surah'
 *
 */
