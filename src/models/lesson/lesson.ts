export class Lesson {
    lessonId?: number;
    lessonDate?: string;
    startVerse?: number;
    endVerse?: number;
    source?: string;
    surahId?: number; // Assuming surahId is optional

    constructor(
        lessonId: number,
        lessonDate: string,
        startVerse: number,
        endVerse: number,
        source: string,
        surahId?: number
    ) {
        this.lessonId = lessonId;
        this.lessonDate = lessonDate;
        this.startVerse = startVerse;
        this.endVerse = endVerse;
        this.source = source;
        this.surahId = surahId;
    }

    // Define any model methods here
}
