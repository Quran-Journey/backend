import { apiGET } from '../request';
import moment from 'moment';
import data  from '../../services/postgres/seed';
import {Tafsir} from "../../types/Tafsir";
import {Lesson} from "../../types/Lesson";
import {Word} from "../../types/Word";
import {Reflection} from "../../types/Reflection";

const seedData = data.seedData;

interface Verse {
    verse_index: number;
    verse_text: string;
}

async function lessonInfoTests(): Promise<void> {
    it("getting verse info linked to a lesson", async () => {
        let lesson: Lesson = seedData.Lesson[1];
        let verseWord = seedData.VerseWord;
        let arabicWord = seedData.ArabicWord;
        let verses: Verse[] = seedData.Verse;
        let tafsirs: Tafsir[] = seedData.Tafsir;
        let reflections: Reflection[] = seedData.Reflection;

        let result:any = await apiGET("/lesson/2/verses");
        expect(result.data.data.lesson_content.length).toEqual(2);

        checkLessonMatch(result.data.data, lesson);

        checkVerseMatch(result.data.data.lesson_content[0], verses[0]);
        checkVerseMatch(result.data.data.lesson_content[1], verses[1]);

        checkReflectionMatch(
            result.data.data.lesson_content[0].reflections[0],
            reflections[0]
        );
        expect(result.data.data.lesson_content[0].reflections.length).toEqual(2);

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
    expect(t1.verse_index).toEqual(t2.verse_index);
    expect(t1.verse_text).toEqual(t2.verse_text);
}

function checkTafsirMatch(t1: Tafsir, t2: Tafsir): void {
    expect(t1.tafsir_id).toEqual(t2.tafsir_id);
    expect(t1.tafsir_text).toEqual(t2.tafsir_text);
}

function checkWordMatch(t1: Word, vw: any, aw: any): void {
    expect(t1.root_id).toEqual(aw.root_id);
    expect(t1.word_id).toEqual(vw.word_id);
    expect(t1.word).toEqual(aw.word);
    expect(t1.visible).toEqual(vw.visible);
    expect(t1.word_explanation).toEqual(vw.word_explanation);
}

function checkReflectionMatch(t1: Reflection, t2: Reflection): void {
    expect(t1.reflection_id).toEqual(t2.reflection_id);
    expect(t1.reflection).toEqual(t2.reflection);
}

function checkLessonMatch(lessonA: Lesson, lessonB: Lesson): void {
    expect(lessonA.source).toEqual(lessonB.source);
    expect(moment(lessonA.lesson_date).format("YYYY-MM-DD")).toEqual(
        moment(lessonB.lesson_date).format("YYYY-MM-DD")
    );
}

export {
    lessonInfoTests,
};