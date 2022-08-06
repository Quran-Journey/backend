const faker = require("faker");
const utils = require("./utils");
const { apiGET, apiPOST, apiPATCH, apiDELETE } = utils;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function surahInfoTests() {
    it("getting a surah's information", async () => {
        let surahInfoA = seedData.SurahInfo[0];

        const resp1 = await apiGET(`/surah/info/1`);
        let surahInfoB = resp1.data.data[0];
        checkMatch(surahInfoA, surahInfoB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting a surah's information by surah ID", async () => {
        let surahInfoA = seedData.SurahInfo[0];

        const resp1 = await apiGET(`/surah/info/surahID/1`);
        let surahInfoB = resp1.data.data[0];
        checkMatch(surahInfoA, surahInfoB);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a surah info", async () => {
        let newsurahinfo = {
            surah: 1,
            title: "Umm al-Quran",
            info: "Al-Fātiĥah is the first surah recited in full in every rak'ah."
        };

        let resp1 = await apiPOST(`/surah/info`, newsurahinfo);
        let surahinfo = resp1.data.data[0];
        checkMatch(newsurahinfo, surahinfo);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a surah info", async () => {
        let newsurahinfo = {
            surah_info_id: 1,
            surah: 1,
            title: "Ash-Shifa",
            info: "when read during salah, is a direct conversation with Allah",
        };

        let resp1 = await apiGET(`/surah/info/1`);
        let original_surah_info = resp1.data.data[0];
        expect(original_surah_info.title).not.toEqual(newsurahinfo.title);
        expect(original_surah_info.info).not.toEqual(newsurahinfo.info);

        await apiPATCH(`/surah/info`, newsurahinfo);
        let resp2 = await apiGET(`/surah/info/1`);
        checkMatch(newsurahinfo, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("delete a surah info", async () => {
        let resp = await apiGET(`/surah/info/1`);
        let resp1 = await apiDELETE(`/surah/info/1`);
        // We want to ensure that the deleted lesson is the correct lesson.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/surah/info/1`);
        expect(resp2.data.ecode).toEqual(3); // Ecode 3 implies None found (i.e. DNE)
        expect(resp2.data.success).toEqual(false);
    });
}
function checkMatch(surahInfoA, surahInfoB) {
    expect(surahInfoA.title).toEqual(surahInfoB.title);
    expect(surahInfoA.surah).toEqual(surahInfoB.surah);
    expect(surahInfoA.info).toEqual(surahInfoB.info);
}

module.exports = {
    surahInfoTests: surahInfoTests,
};