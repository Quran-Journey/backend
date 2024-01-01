import { apiGET } from "./request";
import { seedData } from "../services/postgres/seed";
import { Errors, Result } from "../utils/constants";
import { Tafsir } from "../models/tafsir/tafsir";
import { VerseWord } from "../models/verse/verseWord";
import { VerseWordExplanations } from "../models/word";
import { ArabicWord } from "../models/word/arabicWord";
import { VerseInformation } from "../models/verse/verseInformation";
import { AxiosResponse } from "axios";
import { getVerseWordExplanations } from "../services/postgres/verseInfo";

export async function verseInfoTests() {
    it("get complete verse info", async () => {
        let verse = seedData.Verse[0];
        let reflectionInfo = seedData.Reflection[0];
        let tafsirInfo = seedData.Tafsir[0];
        let arabicWord = seedData.ArabicWord[0];
        let verseWord = seedData.VerseWord[0];

        const resp : AxiosResponse = await apiGET(`/verse/1`);
        expect(resp.data.success).toEqual(true);

        const result: VerseInformation = resp.data.data[0];
        expect(result.reflection!.length).toEqual(2);
        expect(result.reflection![0]).toEqual(reflectionInfo);
        expect(result.verse!.verseIndex).toEqual(verse.verseIndex);

        checkTafsirMatch(result.tafsir![0], tafsirInfo);
        checkWordMatch(result.words![0], verseWord, arabicWord);
    });

    it("get verse info with only verse explanation and one reflection", async () => {
        let arabicWord = seedData.ArabicWord[2];
        let verseWord = seedData.VerseWord[1];
        const resp : AxiosResponse = await apiGET(`/verse/2`);
        const result: VerseInformation = resp.data.data[0];
        // TODO: #173 include proper typing in, see verse info test example.
        expect(result.reflection?.length).toEqual(1);
        checkWordMatch(result.words![0], verseWord, arabicWord);
        expect(resp.data.success).toEqual(true);
    });

    it("get verse info for a verse that does not exist", async () => {
        const resp = await apiGET(`/verse/${seedData.Verse.length + 1}`);
        expect(resp.data.code).toEqual(Errors.DB_DNE);
        expect(resp.data.success).toEqual(false);
    });
}

export function checkTafsirMatch(t1: Tafsir, t2: Tafsir) {
    expect(t1.tafsirId).toEqual(t2.tafsirId);
    expect(t1.tafsirText).toEqual(t2.tafsirText);
}

export function checkWordMatch(
    t1: VerseWordExplanations,
    vw: VerseWord,
    aw: ArabicWord
) {
    expect(t1.rootId).toEqual(aw.rootId);
    expect(t1.wordId).toEqual(vw.wordId);
    expect(t1.visible).toEqual(vw.visible);
    expect(t1.wordExplanation).toEqual(vw.wordExplanation);
}
