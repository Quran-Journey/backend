import { apiGET } from "../request";
import moment from "moment";
import { seedData } from "../../services/postgres/seed";
import { Lesson } from "../../models/lesson/lesson";
import { Reflection } from "../../models/reflection/reflection";
import { Tafsir } from "../../models/tafsir/tafsir";
import { checkTafsirMatch } from "../verse-info-tests";
import { checkLessonMatch } from "./lesson-tests";
import { checkReflectionMatch } from "../reflection-tests";
import { AxiosResponse } from "axios";
import { LessonContent } from "../../models/lesson/lessonContent";
import { Verse } from "../../models/verse/verse";
import { VerseWordExplanation } from "../../models/word";

export async function lessonInfoTests() {
    it.todo("getting verse info linked to a lesson")
    // , async () => {
    //     let lesson_id = 1;
    //     // let lesson = seedData.Lesson[lesson_id];
    //     // let verseWordExplanation = seedData.VerseWordExplanation[0];
    //     // let tafsirs = seedData.Tafsir[0];
    //     // let reflections = seedData.Reflection[0];
    //     let seededLessonContent = seedData._LessonContent[0];

    //     let result: AxiosResponse = await apiGET(
    //         `/lesson/${lesson_id + 1}/verses`
    //     );
    //     let lessonContent: LessonContent = result.data.data[0];
    //     expect(lessonContent.content!.length).toEqual(2);
    //     expect(lessonContent.lesson).not.toBeNull();
    //     expect(lessonContent.content).not.toBeNull();
    //     expect(lessonContent.verseCount).not.toBeNull();
    //     expect(lessonContent).toEqual(seededLessonContent);

    //     // Check lesson
    //     // checkLessonMatch(lessonContent.lesson!, lesson);

    //     // // Check verses
    //     // checkVerseMatch(lessonContent.content![0].verse, verseWordExplanation.verseId);
    //     // checkVerseMatch(lessonContent.content![1].verse, verseWordExplanation.verseId);

    //     // // Check reflections
    //     // checkReflectionMatch(
    //     //     lessonContent.content![0].reflection![0],
    //     //     reflections
    //     // );
    //     // expect(lessonContent.content![0].reflection!.length).toEqual(2);

    //     // // Check tafsirs
    //     // checkTafsirMatch(lessonContent.content![0].tafsir![0], tafsirs);

    //     // // Check verse word explanations
    //     // checkWordMatch(
    //     //     lessonContent.content![0].words![0],
    //     //     verseWordExplanation
    //     // );
    // });
}

// function checkVerseMatch(t1: VerseWord?, t2: VerseWordExplanation?) {
//     expect(t1?.verseIndex).toEqual(t2?.verseId);
//     expect(t1?.verseNumber).toEqual(t2?.verseNumber);
// }

export function checkWordMatch(
    vwe1: VerseWordExplanation,
    vwe2: VerseWordExplanation
) {
    expect(vwe1.visible).toEqual(vwe2.visible);
    expect(vwe1.wordExplanation).toEqual(vwe2.wordExplanation);
    expect(vwe1.wordId).toEqual(vwe2.wordId);
    expect(vwe1.rootWord?.rootId).toEqual(vwe2.rootWord?.rootId);
}
