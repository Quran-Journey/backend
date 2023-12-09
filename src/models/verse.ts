/**
 * @schema Verse
 * type: object
 * required:
 * - verse_index
 * - surah
 * - verse_number
 * - verse_text
 * properties:
 * verse_index:
 * type: integer
 * description: the index of the verse in the Quran
 * example: 1
 * surah:
 * type: integer
 * description: the Surah id/number that the verse belongs to
 * example: 1
 * verse_number:
 * type: integer
 * description: the ayah number within the Surah
 * example: 1
 * verse_text:
 * type: string
 * description: the text representation of the verse
 * example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 */

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

export default Verse;
