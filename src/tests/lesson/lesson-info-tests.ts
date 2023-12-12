import { apiGET } from "../request";
import moment from "moment";
import { seedData } from "../../services/postgres/seed";
import { Lesson } from "../../models/lesson/lesson";
import { Reflection } from "../../models/reflection/reflection";
import { Tafsir } from "../../models/tafsir/tafsir";
import { checkTafsirMatch, checkWordMatch } from "../verse-info-tests";
import { checkLessonMatch } from "./lesson-tests";
import { checkReflectionMatch } from "../reflection-tests";

interface Verse {
    verseIndex: number;
    verseText: string;
}

export async function lessonInfoTests(): Promise<void> {
    it("getting verse info linked to a lesson", async () => {
        let lesson: Lesson = seedData.Lesson[1];
        let verseWord = seedData.VerseWord;
        let arabicWord = seedData.ArabicWord;
        let verses: Verse[] = seedData.Verse;
        let tafsirs: Tafsir[] = seedData.Tafsir;
        let reflections: Reflection[] = seedData.Reflection;

        let result: any = await apiGET("/lesson/2/verses");
        expect(result.data.data.lesson_content.length).toEqual(2);

        checkLessonMatch(result.data.data, lesson);

        checkVerseMatch(result.data.data.lesson_content[0], verses[0]);
        checkVerseMatch(result.data.data.lesson_content[1], verses[1]);

        checkReflectionMatch(
            result.data.data.lesson_content[0].reflections[0],
            reflections[0]
        );
        expect(result.data.data.lesson_content[0].reflections.length).toEqual(
            2
        );

        checkTafsirMatch(
            result.data.data.lesson_content[0].tafsirs[0],
            tafsirs[0]
        );

        checkWordMatch(
            result.data.data.lesson_content[1].words[0],
            verseWord[1],
            arabicWord[2]
        );
    });
}

function checkVerseMatch(t1: Verse, t2: Verse): void {
    expect(t1.verseIndex).toEqual(t2.verseIndex);
    expect(t1.verseText).toEqual(t2.verseText);
}
