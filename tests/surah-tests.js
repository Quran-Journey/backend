const faker = require("faker");
const utils = require("./utils");
const lessonsCheckMatch = require("./lesson/lesson-tests").checkMatch;
const { apiGET, apiPUT } = utils;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function surahTests() {
    it("getting a surah by id", async () => {
        let surahA = seedData.Surah[0];

        const resp1 = await apiGET(`/surah/${surahA.surah_id}`);
        let surahB = resp1.data.data[0];
        checkMatch(surahA, surahB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting all surahs", async () => {
        let surahs = seedData.Surah;
        let resp1 = await apiGET(`/surahs`);
        let surahs_resp = resp1.data.data;
        for (let surah = 1; surah < surahs.length; surah++) {
            checkMatch(surahs[surah], surahs_resp[surah]);
        }
    });

    it("updating a surah", async () => {
        let newsurah = {
            surah_id: 2,
            surah_number: 2,
            name_complex: "al-Baqarah",
            name_arabic: "",
        };

        let resp1 = await apiGET(`/surah/${newsurah.surah_id}`);
        let original_surah = resp1.data.data[0];
        expect(original_surah.name_complex).not.toEqual(newsurah.name_complex);

        await apiPUT(`/surah`, newsurah);
        let resp2 = await apiGET(`/surah/${newsurah.surah_id}`);
        checkMatch(newsurah, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("getting verses associated with a specific Surah", async () => {
        let surahA = seedData.Surah[0];
        let verses = seedData.Verse.filter((verse) => {
            verse.surah = surahA.surah_id;
        });

        const resp1 = await apiGET(`/surah/${surahA.surah_id}/verses`);
        checkVerses(verses, resp1.data.data);
    });

    it("getting lessons associated with a specific Surah", async () => {
        let surahA = seedData.Surah[0];
        let lessons = seedData.Lesson.filter((lesson) => {
            lesson.surah = surahA.surah_id;
        });

        const resp1 = await apiGET(`/surah/${surahA.surah_id}/verses`);
        checkLessons(lessons, resp1.data.data);
    });
}

function checkMatch(surahA, surahB) {
    expect(surahA.surah_number).toEqual(surahB.surah_number);
    expect(surahA.name_complex).toEqual(surahB.name_complex);
    expect(surahA.name_arabic).toEqual(surahB.name_arabic);
}

function checkVerses(versesA, versesB) {
    for (let verse = 0; verse < versesA.length; verse++) {
        expect(versesA[verse].surah).toEqual(versesB[verse].surah);
        expect(versesA[verse].verse_index).toEqual(versesB[verse].verse_index);
        expect(versesA[verse].verse_number).toEqual(
            versesB[verse].verse_number
        );
        expect(versesA[verse].verse_text).toEqual(versesB[verse].verse_text);
    }
}

function checkLessons(lessonsA, lessonsB) {
    for (let lesson = 0; lesson < lessonsA.length; lesson++) {
        lessonsCheckMatch(lessonsA[lesson], lessonsB[lesson]);
    }
}

module.exports = {
    surahTests: surahTests,
};
