/**
 * @schema Lesson
 * type: object
 * required:
 * - lesson_id
 * - lesson_date
 * - start_verse
 * - end_verse
 * - source
 * properties:
 * lesson_id:
 * type: integer
 * description: to identify the lesson from others
 * example: 1
 * lesson_date:
 * type: string
 * description: to identify the day that the lesson was taught
 * example: 2021-10-30
 * start_verse:
 * type: integer
 * description: first verse in a lesson
 * example: 1
 * end_verse:
 * type: integer
 * description: last verse in a lesson
 * example: 3
 * source:
 * type: string
 * description: a URL to the lesson recording
 * example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 */

class Lesson {
    lessonId: number;
    lessonDate: string;
    startVerse: number;
    endVerse: number;
    source: string;
    surahId?: number; // Assuming surahId is optional

    constructor(lessonId: number, lessonDate: string, startVerse: number, endVerse: number, source: string, surahId?: number) {
        this.lessonId = lessonId;
        this.lessonDate = lessonDate;
        this.startVerse = startVerse;
        this.endVerse = endVerse;
        this.source = source;
        this.surahId = surahId;
    }

    // Define any model methods here
}

export default Lesson;
