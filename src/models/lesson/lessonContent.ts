import { VerseInformation } from "../verse/verseInformation";
import { Lesson } from "./lesson";

export class LessonContent {
    lesson?: Lesson;
    content?: VerseInformation[];
    verseCount?: number;
    
    constructor(
        lesson?: Lesson,
        verseCount?: number,
        content?: VerseInformation[]
    ) {
        this.lesson = lesson;
        this.verseCount = verseCount;
        this.content = content;
    }

    // Define any model methods here
}

// TODO: #172 include documentation for LessonContent type and update route for LessonVerses to use this type