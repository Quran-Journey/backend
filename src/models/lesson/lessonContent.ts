import { VerseInformation } from "../verse/verseInformation";
import { Lesson } from "./lesson";

export class LessonContent {
    lesson?: Lesson;
    numberOfVerses?: number;
    lessonContent?: VerseInformation[];

    constructor(
        lesson?: Lesson,
        numberOfVerses?: number,
        lessonContent?: VerseInformation[]
    ) {
        this.lesson = lesson;
        this.numberOfVerses = numberOfVerses;
        this.lessonContent = lessonContent;
    }

    // Define any model methods here
}

// TODO: #172 include documentation for LessonContent type and update route for LessonVerses to use this type