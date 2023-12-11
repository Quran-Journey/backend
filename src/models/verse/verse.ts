
class Verse {
    verseIndex: number;
    surah: number;
    verseNumber: number;
    verseText: string;

    constructor(verseIndex: number, surah: number, verseNumber: number, verseText: string) {
        this.verseIndex = verseIndex;
        this.surah = surah;
        this.verseNumber = verseNumber;
        this.verseText = verseText;
    }

    // Define any model methods here
}

/**
 *  @schema VerseInformation
 *  type: object
 *  required:
 *      - verse_index
 *      - surah
 *      - verse_number
 *      - verse_text
 *      - reflections
 *      - tafsirs
 *      - roots
 *  properties:
 *      verse_index:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      surah:
 *          type: integer
 *          description: the sura id/number that the verse belongs to
 *          example: 1
 *      verse_number:
 *          type: integer
 *          description: the aya number within the surah
 *          example: 1
 *      verse_text:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 *      reflections:
 *          type: array
 *          items:
 *              $ref: "#/definitions/Reflection"
 *          description: collection of reflections associated with a verse
 *      tafsirs:
 *          type: array
 *          description: collection of tafsirs for a verse from different mufasirs
 *          items:
 *              $ref: "#/definitions/Tafsir"
 *      words:
 *          type: array
 *          items:
 *              $ref: "#/definitions/VerseWordInformation"
 *
 */

export default Verse;
