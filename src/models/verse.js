/**
 *  @schema Verse
 *  type: object
 *  required:
 *      - index
 *      - surah
 *      - aya
 *      - text
 *  properties:
 *      verse_index:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      surah:
 *          type: integer
 *          description: the surah id/number that the verse belongs to
 *          example: 1
 *      verse_number:
 *          type: integer
 *          description: the ayah number within the surah
 *          example: 1
 *      verse_text:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 */
class Verse {
    constructor(verseIndex, surah, verseNumber, verseText) {
        this.verseIndex = verseIndex;
        this.surah = surah;
        this.verseNumber = verseNumber;
        this.verseText = verseText;
    }

    // Define any model methods here
}

module.exports = Verse;
