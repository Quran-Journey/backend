export class Verse {
    verseIndex?: number;
    surah?: number;
    verseNumber?: number;
    verseText?: string;

    constructor(
        verseIndex: number,
        surah: number,
        verseNumber: number,
        verseText: string
    ) {
        this.verseIndex = verseIndex;
        this.surah = surah;
        this.verseNumber = verseNumber;
        this.verseText = verseText;
    }

    // Define any model methods here
}
