const faker = require("faker");
const utils = require("./utils");
const { apiGET } = utils;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function verseInfoTests() {
    it("get complete verse info (positive test)", async () => {
        let reflectionInfo = seedData.Reflection[0];
        let tafsirInfo = seedData.Tafsir[0];
        let arabicWord = seedData.ArabicWord[0];
        let verseWord = seedData.VerseWord[0]

        const resp1 = await apiGET(`/verse/1`);
        expect(resp1.data.data.reflections[0]).toEqual(reflectionInfo)
        expect(resp1.data.data.reflections.length).toEqual(2)

        checkTafsirMatch(resp1.data.data.tafsirs[0], tafsirInfo)
        checkRootMatch(resp1.data.data.roots[0], verseWord, arabicWord)
        expect(resp1.data.success).toEqual(true);
    })
    it("get complete verse info (negative test)", async () => {
        const resp2 = await apiGET(`/verse/2`)
        expect(resp2.data.data.reflections.length).toEqual(0);
        expect(resp2.data.success).toEqual(false);

    })
}

function checkTafsirMatch(t1, t2) {
    expect(t1.tafsir_id).toEqual(t2.tafsir_id);
    expect(t1.content).toEqual(t2.content);
    expect(t1.verse_id).toEqual(t2.verse_id);
}
function checkRootMatch(t1, vw, aw) {
    expect(t1.root_id).toEqual(aw.root_id)
    expect(t1.verse_id).toEqual(vw.verse_id)
    expect(t1.word_id).toEqual(vw.word_id)
    expect(t1.word).toEqual(aw.word)
}

module.exports = {
    verseInfoTests: verseInfoTests,
};

