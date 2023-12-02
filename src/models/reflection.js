/**
 *  @schema Reflection
 *  type: object
 *  required:
 *      - reflection_id
 *      - verse_id
 *      - title
 *      - reflection
 *  properties:
 *      reflection_id:
 *          type: integer
 *          description: to identify the reflection from others
 *          example: 1
 *      verse_id:
 *          type: integer
 *          description: to identify the verse that the reflection is refering to
 *          example: 23
 *      title:
 *          type: string
 *          description: a title to the refelction
 *          example: "My Reflection"
 *      reflection:
 *          type: string
 *          description: refelction on verse
 *          example: "I have..."
 */
class Reflection {
    constructor(reflectionId, verseId, title, reflection) {
        this.reflectionId = reflectionId;
        this.verseId = verseId;
        this.title = title;
        this.reflection = reflection;
    }

    // Define any model methods here
}

module.exports = Reflection;
