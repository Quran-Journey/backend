import { apiGET, apiPUT } from './request';
import { checkMatch as lessonsCheckMatch } from './lesson/lesson-tests';
import  data from '../services/postgres/seed';
const seedData = data.seedData;

interface Surah {
    surah_id: number;
    surah_number: number;
    name_complex: string;
    name_arabic: string;
}

function surahTests() {
    it("getting a surah by id", async () => {
        let surahA: Surah = seedData.Surah[0];

        const resp1 = await apiGET(`/surah/${surahA.surah_id}`);
        let surahB: Surah = resp1.data.data[0];
        checkMatch(surahA, surahB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting all surahs", async () => {
        let surahs: Surah[] = seedData.Surah;
        let resp1 = await apiGET(`/surahs`);
        let surahs_resp: Surah[] = resp1.data.data;
        for (let surah = 1; surah < surahs.length; surah++) {
            checkMatch(surahs[surah], surahs_resp[surah]);
        }
    });

    it("updating a surah", async () => {
        let newsurah: Surah = {
            surah_id: 2,
            surah_number: 2,
            name_complex: "al-Baqarah",
            name_arabic: "",
        };

        let resp1 = await apiGET(`/surah/${newsurah.surah_id}`);
        let original_surah: Surah = resp1.data.data[0];
        expect(original_surah.name_complex).not.toEqual(newsurah.name_complex);

        await apiPUT(`/surah`, newsurah);
        let resp2 = await apiGET(`/surah/${newsurah.surah_id}`);
        checkMatch(newsurah, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("getting verses associated with a specific Surah", async () => {
        let surahA: Surah = seedData.Surah[0];
        let verses = seedData.Verse.filter((verse:any) => {
            verse.surah = surahA.surah_id;
        });

        const resp1 = await apiGET(`/surah/${surahA.surah_id}/verses`);
        checkVerses(verses, resp1.data.data);
    });

    it("getting lessons associated with a specific Surah", async () => {
        let surahA: Surah = seedData.Surah[0];
        let lessons = seedData.Lesson.filter((lesson:any) => {
            lesson.surah = surahA.surah_id;
        });

        const resp1 = await apiGET(`/surah/${surahA.surah_id}/verses`);
        checkLessons(lessons, resp1.data.data);
    });
}

function checkMatch(surahA: Surah, surahB: Surah) {
    expect(surahA.surah_number).toEqual(surahB.surah_number);
    expect(surahA.name_complex).toEqual(surahB.name_complex);
    expect(surahA.name_arabic).toEqual(surahB.name_arabic);
}

function checkVerses(versesA:any[], versesB:any[]) {
    for (let verse = 0; verse < versesA.length; verse++) {
        expect(versesA[verse].surah).toEqual(versesB[verse].surah);
        expect(versesA[verse].verse_index).toEqual(versesB[verse].verse_index);
        expect(versesA[verse].verse_number).toEqual(
            versesB[verse].verse_number
        );
        expect(versesA[verse].verse_text).toEqual(versesB[verse].verse_text);
    }
}

function checkLessons(lessonsA:any[], lessonsB:any[]) {
    for (let lesson = 0; lesson < lessonsA.length; lesson++) {
        lessonsCheckMatch(lessonsA[lesson], lessonsB[lesson]);
    }
}

export { surahTests };
