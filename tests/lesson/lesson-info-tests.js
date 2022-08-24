const utils = require("../utils");
const apiGET = utils.apiGET;
const setup = require("../setup");
const seedData = setup.seedData;

function lessonInfoTests() {
    it("getting verse info linked to a lesson", async () => {
        let verseWord = seedData.VerseWord
        let arabicWord = seedData.ArabicWord
        let verses = seedData.Verse
        let tafsirs = seedData.Tafsir
        let reflections = seedData.Reflection

        let result = await apiGET("/lesson/2/verses")
        expect(result.data.data.lessonInfo.length).toEqual(2)

        checkVerseMatch(result.data.data.lessonInfo[0].verse[0], verses[0])
        checkVerseMatch(result.data.data.lessonInfo[1].verse[0], verses[1])

        checkReflectionMatch(result.data.data.lessonInfo[0].reflections[0], reflections[0])
        checkReflectionMatch(result.data.data.lessonInfo[0].reflections[1], reflections[1])
        checkReflectionMatch(result.data.data.lessonInfo[1].reflections[0], reflections[2])

        checkTafsirMatch(result.data.data.lessonInfo[0].tafsirs[0], tafsirs[0])

        checkWordMatch(result.data.data.lessonInfo[1].words[0], verseWord[1], arabicWord[2])

    })

}
function checkVerseMatch(t1, t2) {
    expect(t1.verse_index).toEqual(t2.verse_index);
    expect(t1.verse_text).toEqual(t2.verse_text)

}
function checkTafsirMatch(t1, t2) {
    expect(t1.tafsir_id).toEqual(t2.tafsir_id);
    expect(t1.content).toEqual(t2.content);
}
function checkWordMatch(t1, vw, aw) {
    expect(t1.root_id).toEqual(aw.root_id);
    expect(t1.word_id).toEqual(vw.word_id);
    expect(t1.word).toEqual(aw.word);
    expect(t1.visible).toEqual(vw.visible);
    expect(t1.word_explanation).toEqual(vw.word_explanation);
}

function checkReflectionMatch(t1, t2) {
    expect(t1.reflection_id).toEqual(t2.reflection_id)
    expect(t1.reflection).toEqual(t2.reflection)
}

module.exports = {
    lessonInfoTests: lessonInfoTests
}
