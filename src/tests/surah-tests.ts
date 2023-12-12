import { apiGET, apiPUT } from "./request";
import { checkLessonMatch } from "./lesson/lesson-tests";
import { seedData } from "../services/postgres/seed";
import { Surah } from "../models/surah/surah";
import { Verse } from "../models/verse/verse";

function surahTests() {
    it("getting a surah by id", async () => {
        let surahA: Surah = seedData.Surah[0];

        const resp1 = await apiGET(`/surah/${surahA.surahId}`);
        let surahB: Surah = resp1.data.data[0];
        checkMatch(surahA, surahB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting all surahs", async () => {
        let surahs: Surah[] = seedData.Surah;
        let resp1 = await apiGET(`/surahs`);
        let surahsResp: Surah[] = resp1.data.data;
        for (let surah = 1; surah < surahs.length; surah++) {
            checkMatch(surahs[surah], surahsResp[surah]);
        }
    });

    it("updating a surah", async () => {
        let newsurah: Surah = {
            surahId: 2,
            surahNumber: 2,
            nameComplex: "al-Baqarah",
            nameArabic: "",
        };

        let resp1 = await apiGET(`/surah/${newsurah.surahId}`);
        let originalSurah: Surah = resp1.data.data[0];
        expect(originalSurah.nameComplex).not.toEqual(newsurah.nameComplex);

        await apiPUT(`/surah`, newsurah);
        let resp2 = await apiGET(`/surah/${newsurah.surahId}`);
        checkMatch(newsurah, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("getting verses associated with a specific Surah", async () => {
        let surahA: Surah = seedData.Surah[0];
        let verses = seedData.Verse.filter((verse: any) => {
            verse.surah = surahA.surahId;
        });

        const resp1 = await apiGET(`/surah/${surahA.surahId}/verses`);
        checkVerses(verses, resp1.data.data);
    });

    it("getting lessons associated with a specific Surah", async () => {
        let surahA: Surah = seedData.Surah[0];
        let lessons = seedData.Lesson.filter((lesson: any) => {
            lesson.surah = surahA.surahId;
        });

        const resp1 = await apiGET(`/surah/${surahA.surahId}/verses`);
        checkLessons(lessons, resp1.data.data);
    });
}

function checkMatch(surahA: Surah, surahB: Surah) {
    expect(surahA.surahNumber).toEqual(surahB.surahNumber);
    expect(surahA.nameComplex).toEqual(surahB.nameComplex);
    expect(surahA.nameArabic).toEqual(surahB.nameArabic);
}

function checkVerses(versesA: Verse[], versesB: Verse[]) {
    for (let verse = 0; verse < versesA.length; verse++) {
        expect(versesA[verse].surah).toEqual(versesB[verse].surah);
        expect(versesA[verse].verseIndex).toEqual(versesB[verse].verseIndex);
        expect(versesA[verse].verseNumber).toEqual(
            versesB[verse].verseNumber
        );
        expect(versesA[verse].verseText).toEqual(versesB[verse].verseText);
    }
}

function checkLessons(lessonsA: any[], lessonsB: any[]) {
    for (let lesson = 0; lesson < lessonsA.length; lesson++) {
        checkLessonMatch(lessonsA[lesson], lessonsB[lesson]);
    }
}

export { surahTests };
