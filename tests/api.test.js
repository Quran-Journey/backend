const lessonTests = require("./lesson/lesson-tests.js").lessonTests;
const reflectionTests = require("./reflection-tests.js").reflectionTests;
const surahInfoTests = require("./surah-info-tests.js").surahInfoTests;
const mufasirTests = require("./mufasir-tests.js").mufasirTests;
const rootTests = require("./word/word-tests.js").rootTests;
const meaningTests = require("./word/meaning-tests.js").meaningTests;
const integratedWordTests =
    require("./word/integrated-word-tests.js").integratedWordTests;
const quranTests = require("./quran-tests.js").quranTests;
const verseInfoTests = require("./verse-info-tests").verseInfoTests;
const lessonInfoTests = require("./lesson/lesson-info-tests").lessonInfoTests;

const setup = require("./setup.js");
const utils = require("./utils.js");

describe("Set up", () => {
    test("setup database", async () => {
        let db = await utils.connect_to_db();
        await setup.seedDatabase(db);
    }, 30000);
});

describe("Test Quran Endpoints", () => {
    quranTests();
});

describe("Test Lesson", () => {
    lessonTests();
});

describe("Test Verse Info", () => {
    verseInfoTests();
});

describe("Test Lesson Info", () => {
    lessonInfoTests();
})

describe("Test Reflection", () => {
    reflectionTests();
});

describe("Test SurahInfo", () => {
    surahInfoTests();
});

describe("Test Mufasir", () => {
    mufasirTests();
});

describe("Test everything related to words", () => {
    rootTests();
    meaningTests();
    integratedWordTests();
});


