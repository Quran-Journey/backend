const lessonTests = require("./lesson-tests.js").lessonTests;
const reflectionTests = require("./reflection-tests.js").reflectionTests;
const surahInfoTests = require("./surah-info-tests.js").surahInfoTests;
const mufasirTests = require("./mufasir-tests.js").mufasirTests;
const rootTests = require("./word/word-tests.js").rootTests;
const meaningTests = require("./word/meaning-tests.js").meaningTests;
const quranTests = require("./quran-tests.js").quranTests;
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
