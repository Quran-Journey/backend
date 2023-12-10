/*
 * @api [get] /lessons
 *  summary: "Filter lessons"
 *  description: "This fetch acts as a filter based on the given query params. If none are given, then all params are fetched. Operator must be one of: eq, gt, lt, gte, or lte."
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: query
 *        name: property
 *        type: string
 *        required: false
 *        example: 'lesson_date'
 *      - in: query
 *        name: operator
 *        type: string
 *        required: false
 *        example: 'eq'
 *      - in: query
 *        name: value
 *        type: string
 *        required: false
 *        example: '2021-5-28'
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

/*
 * @api [get] /lesson/{lesson_id}
 *  summary: "Fetch a lesson by ID"
 *  description: "This is a general fetch and has no parameters. It will fetch all of the lessons in the database."
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: lesson_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding lesson.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: No lessons found with that ID.
 *
 */

/*
 * @api [get] /lesson/{lesson_id}/verses
 *  summary: "Fetch a lessons complete verse info by lesson ID"
 *  description: "This is a general fetch and has lesson id as parameter. It will fetch all of the verses associated with a lesson in the database."
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: lesson_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The verses info associated with a lesson.
 *      schema:
 *          $ref: '#/definitions/LessonContent'
 *    404:
 *      description: No lessons found with that ID.
 *
 */

/*
 * @api [post] /lesson
 *  summary: "Create a lesson"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *    - in: body
 *      name: lesson information
 *      schema:
 *          type: object
 *          required:
 *             - lesson_date
 *             - source
 *             - surah_id
 *             - start_verse
 *             - end_verse
 *          properties:
 *             lesson_date:
 *                 type: string
 *                 description: to identify the day that the lesson was taught
 *                 example: 2021-10-30
 *             source:
 *                 type: string
 *                 description: a URL to the lesson recording
 *                 example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 *  responses:
 *    200:
 *      description: Lesson has been created.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *
 */

/*
 * @api [patch] /lesson
 *  summary: "Update a lesson"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: lesson
 *          description: the lesson to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Lesson'
 *  responses:
 *    200:
 *      description: Lesson has been updated.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: Could not find a lesson with that id.
 *
 */

/*
 * @api [delete] /lesson/{lesson_id}
 *  summary: "Delete a lesson"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: path
 *          name: lesson_id
 *          description: the lesson to be deleted
 *          type: integer
 *          required: true
 *          example: 1
 *  responses:
 *    200:
 *      description: The Lesson has been deleted.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: Could not find a lesson with that id.
 *
 */
