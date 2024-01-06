
/*
 * @api [get] /verse/{verseId}
 *  summary: "Get Verse"
 *  description: "Fetch a verse by ID."
 *  tags:
 *    - Verse Endpoints
 *  produces:
 *    - application/json
 *
 *  parameters:
 *      - in: path
 *        name: verseId
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The verse's complete information.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/VerseInformation'
 *
 */
