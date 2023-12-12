import { apiGET, apiPOST, apiPATCH, apiDELETE } from "../request";
import { seedData } from "../../services/postgres/seed";
import { Errors } from "../../utils/constants";
import { VerseWord } from "../../models/verse/verseWord";

function verseWordTests() {
    it("getting a verseWord by id", async () => {
        let verseWordA = seedData.VerseWord[0];

        const resp1 = await apiGET(`/word/verse/1`);
        let verseWordB = resp1.data.data[0];
        checkMatch(verseWordA, verseWordB);
        expect(resp1.data.success).toEqual(true);
    });

    it("linking a verse to a word", async () => {
        let newVerseWord: VerseWord = {
            verseWordId: seedData.VerseWord.length + 2,
            wordId: seedData.ArabicWord[0].wordId,
            verseId: seedData.Verse[0].verseIndex,
            wordExplanation:
                "The wordExplanation for the word in this verse goes here.",
            visible: false,
        };

        let resp1 = await apiPOST(`/word/verse`, newVerseWord);
        let verseWord = resp1.data.data[0];
        expect(resp1.data.success).toEqual(true);
        checkMatch(newVerseWord, verseWord);
    });

    it("updating a verseWord", async () => {
        let newVerseWord: VerseWord = {
            verseWordId: seedData.VerseWord.length + 2,
            wordId: seedData.ArabicWord[0].wordId,
            verseId: seedData.Verse[0].verseIndex,
            wordExplanation:
                "The updated wordExplanation for the word in this verse goes here.",
            visible: true,
        };

        let resp1 = await apiGET(`/word/verse/${newVerseWord.verseWordId}`);
        let originalVerseWord = resp1.data.data[0];
        expect(originalVerseWord.visible).not.toEqual(newVerseWord.visible);
        expect(originalVerseWord.wordExplanation).not.toEqual(
            newVerseWord.wordExplanation
        );

        await apiPATCH(`/word/verse`, newVerseWord);
        let resp2 = await apiGET(`/word/verse/${newVerseWord.verseWordId}`);
        checkMatch(newVerseWord, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("deleting a verseWord", async () => {
        let resp = await apiGET(`/word/verse/1`);
        let resp1 = await apiDELETE(`/word/verse/1`);
        // We want to ensure that the deleted lesson is the correct lesson.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/word/verse/1`);
        expect(resp2.data.code).toEqual(Errors.DB_DNE);
        expect(resp2.data.success).toEqual(false);
    });
}

function checkMatch(verseWordA: VerseWord, verseWordB: VerseWord) {
    expect(verseWordA.verseWordId).toEqual(verseWordB.verseWordId);
    expect(verseWordA.verseId).toEqual(verseWordB.verseId);
    expect(verseWordA.wordId).toEqual(verseWordB.wordId);
    expect(verseWordA.wordExplanation).toEqual(verseWordB.wordExplanation);
    expect(verseWordA.visible).toEqual(verseWordB.visible);
}

export { verseWordTests };
