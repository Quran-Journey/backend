const requests = require("../request");
const { apiGET, apiPOST, apiPATCH, apiDELETE } = requests;
const { seedData } = require("../../services/postgres/seed");
const { Errors } = require("../../utils/constants")

function verseWordTests() {
    it("getting a verseWord by id", async () => {
        let verseWordA = seedData.VerseWord[0];

        const resp1 = await apiGET(`/word/verse/1`);
        let verseWordB = resp1.data.data[0];
        checkMatch(verseWordA, verseWordB);
        expect(resp1.data.success).toEqual(true);
    });

    it("linking a verse to a word", async () => {
        let newVerseWord = {
            verse_word_id: seedData.VerseWord.length + 2,
            word_id: seedData.ArabicWord[0].word_id,
            verse_id: seedData.Verse[0].verse_index,
            word_explanation:
                "The word_explanation for the word in this verse goes here.",
            visible: false,
        };

        let resp1 = await apiPOST(`/word/verse`, newVerseWord);
        let verseWord = resp1.data.data[0];
        expect(resp1.data.success).toEqual(true);
        checkMatch(newVerseWord, verseWord);
    });

    it("updating a verseWord", async () => {
        let newVerseWord = {
            verse_word_id: seedData.VerseWord.length + 2,
            word_id: seedData.ArabicWord[0].word_id,
            verse_id: seedData.Verse[0].verse_index,
            word_explanation:
                "The updated word_explanation for the word in this verse goes here.",
            visible: true,
        };

        let resp1 = await apiGET(`/word/verse/${newVerseWord.verse_word_id}`);
        let originalVerseWord = resp1.data.data[0];
        expect(originalVerseWord.visible).not.toEqual(newVerseWord.visible);
        expect(originalVerseWord.word_explanation).not.toEqual(
            newVerseWord.word_explanation
        );

        await apiPATCH(`/word/verse`, newVerseWord);
        let resp2 = await apiGET(`/word/verse/${newVerseWord.verse_word_id}`);
        checkMatch(newVerseWord, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("deleting a verseWord", async () => {
        async () => {
            let resp = await apiGET(`/word/verse/1`);
            let resp1 = await apiDELETE(`/word/verse/1`);
            // We want to ensure that the deleted lesson is the correct lesson.
            expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
            expect(resp1.data.success).toEqual(true);

            let resp2 = await apiGET(`/word/verse/1`);
            expect(resp2.data.code).toEqual(Errors.DB_DNE);
            expect(resp2.data.success).toEqual(false);
        };
    });
}

function checkMatch(verseWordA, verseWordB) {
    expect(verseWordA.verse_word_id).toEqual(verseWordB.verse_word_id);
    expect(verseWordA.verse_id).toEqual(verseWordB.verse_id);
    expect(verseWordA.word_id).toEqual(verseWordB.word_id);
    expect(verseWordA.word_explanation).toEqual(verseWordB.word_explanation);
    expect(verseWordA.visible).toEqual(verseWordB.visible);
}

module.exports = {
    verseWordTests,
};
