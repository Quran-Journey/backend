export class Lesson{
    lessonId?: number;
    lessonDate?: string;
    startVerse?: number;
    endVerse?: number;
    source?: string;
    document?: string;
    surahId?: number; // Assuming surahId is optional

    constructor(
        lessonId: number,
        lessonDate: string,
        startVerse: number,
        endVerse: number,
        source: string,
        document: string,
        surahId: number
    ) {
        this.lessonId = lessonId;
        this.lessonDate = lessonDate;
        this.startVerse = startVerse;
        this.endVerse = endVerse;
        this.source = source;
        this.document = document;
        this.surahId = surahId;
    }

    // Define any model methods here
}
