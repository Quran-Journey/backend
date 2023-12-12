/**
 * @schema Lesson
 * type: object
 * required:
 *   - lessonId
 *   - lessonDate
 *   - startVerse
 *   - endVerse
 *   - source
 * properties:
 *   lessonId:
 *     type: integer
 *     description: Identifier to distinguish the lesson from others.
 *     example: 1
 *   lessonDate:
 *     type: string
 *     description: Date when the lesson was taught (YYYY-MM-DD format).
 *     example: "2021-10-30"
 *   startVerse:
 *     type: integer
 *     description: The first verse covered in the lesson.
 *     example: 1
 *   endVerse:
 *     type: integer
 *     description: The last verse covered in the lesson.
 *     example: 3
 *   source:
 *     type: string
 *     description: URL linking to the lesson recording.
 *     example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 * */

/**
 *  @schema LessonContent
 *  type: object
 *  required:
 *      - lessonContent
 *      - lessonId
 *      - lessonDate
 *      - startVerse
 *      - endVerse
 *      - source
 *  properties:
 *      lessonContent:
 *          type: array
 *          items:
 *              $ref: "#/definitions/VerseInformation"
 *          description: collection of complete verse Information for verses assocaited with a lesson
 *      lessonId:
 *          type: integer
 *          description: to identify the lesson from others
 *          example: 1
 *      lessonDate:
 *          type: string
 *          description: to identify the day that the lesson was taught
 *          example: 2021-10-30
 *      startVerse:
 *          type: integer
 *          description: first verse in a lesson
 *          example: 1
 *      endVerse:
 *          type: integer
 *          description: last verse in a lesson
 *          example: 3
 *      source:
 *          type: string
 *          description: a URL to the lesson recording
 *          example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 */