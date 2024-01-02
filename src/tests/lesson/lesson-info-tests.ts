import { apiGET } from "../request";
import moment from "moment";
import { seedData } from "../../services/postgres/seed";
import { Lesson } from "../../models/lesson/lesson";
import { Reflection } from "../../models/reflection/reflection";
import { Tafsir } from "../../models/tafsir/tafsir";
import { checkTafsirMatch, checkWordMatch } from "../verse-info-tests";
import { checkLessonMatch } from "./lesson-tests";
import { checkReflectionMatch } from "../reflection-tests";
import { AxiosResponse } from "axios";
import { LessonContent } from "../../models/lesson/lessonContent";
import { Verse } from "../../models/verse/verse";

export async function lessonInfoTests() {
    it("getting verse info linked to a lesson", async () => {
        let lesson: Lesson = seedData.Lesson[1];
        let verseWord = seedData.VerseWord;
        let arabicWord = seedData.ArabicWord;
        let verses: Verse[] = seedData.Verse;
        let tafsirs: Tafsir[] = seedData.Tafsir;
        let reflections: Reflection[] = seedData.Reflection;

        let result: AxiosResponse = await apiGET("/lesson/2/verses");
        let lessonContent: LessonContent = result.data.data[0];
        expect(lessonContent.content!.length).toEqual(2);
        expect(lessonContent.lesson).not.toBeNull();
        expect(lessonContent.content).not.toBeNull();
        expect(lessonContent.verseCount).not.toBeNull();
        checkLessonMatch(lessonContent.lesson!, lesson);
        checkVerseMatch(lessonContent.content![0].verse!, verses[0]);
        checkVerseMatch(lessonContent.content![1].verse!, verses[1]);

        checkReflectionMatch(
            lessonContent.content![0].reflection![0],
            reflections[0]
        );
        expect(lessonContent.content![0].reflection!.length).toEqual(
            2
        );

        checkTafsirMatch(
            lessonContent.content![0].tafsir![0],
            tafsirs[0]
        );

        console.log(verseWord[1])
        console.log(arabicWord[2])
        console.log(lessonContent.content![0].words)
        checkWordMatch(
            lessonContent.content![0].words![0],
            verseWord[1],
            arabicWord[2]
        );
    });
}

function checkVerseMatch(t1: Verse, t2: Verse) {
    expect(t1.verseIndex).toEqual(t2.verseIndex);
    expect(t1.verseText).toEqual(t2.verseText);
}
