import { apiGET, apiPOST, apiPATCH, apiDELETE } from './request';
import { seedData } from "../services/postgres/seed";
import { Errors } from '../utils/constants';
import { SurahInfo } from '../models/surah/surahInfo';

function surahInfoTests() {
    it("getting a surah's information", async () => {
        let surahInfoA: SurahInfo = seedData.SurahInfo[0];

        const resp1 = await apiGET(`/surah/info?surahInfoId=1`);
        let surahInfoB: SurahInfo = resp1.data.data[0];
        checkMatch(surahInfoA, surahInfoB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting a surah's information by surah ID", async () => {
        let surahInfoA: SurahInfo = seedData.SurahInfo[0];

        const resp1 = await apiGET(`/surah/info?surah=1`);
        let surahInfoB: SurahInfo = resp1.data.data[0];
        checkMatch(surahInfoA, surahInfoB);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a surah info", async () => {
        let newsurahinfo: SurahInfo = {
            surah: 1,
            title: "Umm al-Quran",
            info: "Al-Fātiĥah is the first surah recited in full in every rak'ah.",
            surahInfoId: 0, // assuming surahInfoId is auto-incremented
        };

        let resp1 = await apiPOST(`/surah/info`, newsurahinfo);
        let surahinfo: SurahInfo = resp1.data.data[0];
        checkMatch(newsurahinfo, surahinfo);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a surah info", async () => {
        let newsurahinfo: SurahInfo = {
            surahInfoId: 1,
            surah: 1,
            title: "Ash-Shifa",
            info: "when read during salah, is a direct conversation with Allah",
        };

        let resp1 = await apiGET(`/surah/info?surahInfoId=1`);
        let originalSurahInfo: SurahInfo = resp1.data.data[0];
        expect(originalSurahInfo.title).not.toEqual(newsurahinfo.title);
        expect(originalSurahInfo.info).not.toEqual(newsurahinfo.info);

        await apiPATCH(`/surah/info`, newsurahinfo);
        let resp2 = await apiGET(`/surah/info?surahInfoId=1`);
        checkMatch(newsurahinfo, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("delete a surah info", async () => {
        let resp = await apiGET(`/surah/info?surahInfoId=1`);
        let resp1 = await apiDELETE(`/surah/info`, { surahInfoId: 1  });
        // We want to ensure that the deleted lesson is the correct lesson.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/surah/info?surahInfoId=1`);
        expect(resp2.data.code).toEqual(Errors.DB_DNE);
        expect(resp2.data.success).toEqual(false);
    });
}

function checkMatch(surahInfoA: SurahInfo, surahInfoB: SurahInfo) {
    expect(surahInfoA.title).toEqual(surahInfoB.title);
    expect(surahInfoA.surah).toEqual(surahInfoB.surah);
    expect(surahInfoA.info).toEqual(surahInfoB.info);
}

export { surahInfoTests };
