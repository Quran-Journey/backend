const utils = require("../utils");
const apiGET = utils.apiGET;
const setup = require("../setup");
const moment = require("moment");
const seedData = setup.seedData;

function lessonInfoTests() {
    it("getting verse info linked to a lesson", async () => {
        let lesson = seedData.Lesson[1];
        let verseWord = seedData.VerseWord;
        let arabicWord = seedData.ArabicWord;
        let verses = seedData.Verse;
        let tafsirs = seedData.Tafsir;
        let reflections = seedData.Reflection;

        let result = await apiGET("/lesson/2/verses");
        expect(result.data.data.lesson_content.length).toEqual(2);

        checkLessonMatch(result.data.data.lesson_id, lesson.lesson_id);

        checkVerseMatch(result.data.data.lesson_content[0].verse[0], verses[0]);
        checkVerseMatch(result.data.data.lesson_content[1].verse[0], verses[1]);

        checkReflectionMatch(
            result.data.data.lesson_content[0].reflections[0],
            reflections[0]
        );
        expect(result.data.data.lesson_content[0].reflections.length).toEqual(
            2
        );

        checkTafsirMatch(
            result.data.data.lesson_content[0].tafsirs[0],
            tafsirs[0]
        );

        checkWordMatch(
            result.data.data.lesson_content[1].words[0],
            verseWord[1],
            arabicWord[2]
        );
    });
}
function checkVerseMatch(t1, t2) {
    expect(t1.verse_index).toEqual(t2.verse_index);
    expect(t1.verse_text).toEqual(t2.verse_text);
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

function checkReflectionMatch(t1, t2) {
    expect(t1.reflection_id).toEqual(t2.reflection_id);
    expect(t1.reflection).toEqual(t2.reflection);
}

function checkLessonMatch(lessonA, lessonB) {
    expect(lessonA.source).toEqual(lessonB.source);
    expect(new moment(lessonA.lesson_date).format("YYYY-MM-DD")).toEqual(
        new moment(lessonB.lesson_date).format("YYYY-MM-DD")
    );
}

module.exports = {
    lessonInfoTests,
};
