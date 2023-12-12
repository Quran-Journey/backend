import { apiGET } from "./request";
import { seedData } from "../services/postgres/seed";
import { Errors } from "../utils/constants";
import { Tafsir } from "../models/tafsir/tafsir";
import { VerseWord } from "../models/verse/verseWord";
import { VerseWordExplanations } from "../models/word";
import { ArabicWord } from "../models/word/arabicWord";

export async function verseInfoTests() {
    it("get complete verse info", async () => {
        let verse = seedData.Verse[0];
        let reflectionInfo = seedData.Reflection[0];
        let tafsirInfo = seedData.Tafsir[0];
        let arabicWord = seedData.ArabicWord[0];
        let verseWord = seedData.VerseWord[0];

        const resp1 = await apiGET(`/verse/1`);
        expect(resp1.data.data.reflections[0]).toEqual(reflectionInfo);
        expect(resp1.data.data.reflections.length).toEqual(2);
        expect(resp1.data.data.verseIndex).toEqual(verse.verseIndex);

        checkTafsirMatch(resp1.data.data.tafsirs[0], tafsirInfo);
        checkWordMatch(resp1.data.data.words[0], verseWord, arabicWord);
        expect(resp1.data.success).toEqual(true);
    });

    it("get verse info with only verse explanation and one reflection", async () => {
        let arabicWord = seedData.ArabicWord[2];
        let verseWord = seedData.VerseWord[1];
        const resp = await apiGET(`/verse/2`);
        expect(resp.data.data.reflections.length).toEqual(1);
        checkWordMatch(resp.data.data.words[0], verseWord, arabicWord);
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
