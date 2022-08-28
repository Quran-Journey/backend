const utils = require("./utils");
const { apiGET } = utils;
const setup = require("./setup");
const seedData = setup.seedData;

function verseInfoTests() {
    it("get complete verse info", async () => {
        let verse = seedData.Verse[0];
        let reflectionInfo = seedData.Reflection[0];
        let tafsirInfo = seedData.Tafsir[0];
        let arabicWord = seedData.ArabicWord[0];
        let verseWord = seedData.VerseWord[0];

        const resp1 = await apiGET(`/verse/1`);
        expect(resp1.data.data.reflections[0]).toEqual(reflectionInfo);
        expect(resp1.data.data.reflections.length).toEqual(2);
        expect(resp1.data.data.verse[0]).toEqual(verse);

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
        expect(resp.data.ecode).toEqual(3);
        expect(resp.data.success).toEqual(false);
    });
}

function checkTafsirMatch(t1, t2) {
    expect(t1.tafsir_id).toEqual(t2.tafsir_id);
    expect(t1.tafsir_text).toEqual(t2.tafsir_text);
}
function checkWordMatch(t1, vw, aw) {
    expect(t1.root_id).toEqual(aw.root_id);
    expect(t1.word_id).toEqual(vw.word_id);
    expect(t1.word).toEqual(aw.word);
    expect(t1.visible).toEqual(vw.visible);
    expect(t1.word_explanation).toEqual(vw.word_explanation);
}

module.exports = {
    verseInfoTests: verseInfoTests,
};
