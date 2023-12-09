/**
 * @schema Reflection
 * type: object
 * required:
 * - reflection_id
 * - verse_id
 * - title
 * - reflection
 * properties:
 * reflection_id:
 * type: integer
 * description: to identify the reflection from others
 * example: 1
 * verse_id:
 * type: integer
 * description: to identify the verse that the reflection is referring to
 * example: 23
 * title:
 * type: string
 * description: a title to the reflection
 * example: "My Reflection"
 * reflection:
 * type: string
 * description: reflection on verse
 * example: "I have..."
 */

class Reflection {
    reflectionId: number;
    verseId: number;
    title: string;
    reflection: string;

    constructor(reflectionId: number, verseId: number, title: string, reflection: string) {
        this.reflectionId = reflectionId;
        this.verseId = verseId;
        this.title = title;
        this.reflection = reflection;
    }

    // Define any model methods here
}

export default Reflection;
