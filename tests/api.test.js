const lessonTests = require("./lesson/lesson-tests.js").lessonTests;
const reflectionTests = require("./reflection-tests.js").reflectionTests;
const surahInfoTests = require("./surah-info-tests.js").surahInfoTests;
const surahTests = require("./surah-tests.js").surahTests;
const mufasirTests = require("./mufasir-tests.js").mufasirTests;
const rootTests = require("./word/word-tests.js").rootTests;
const meaningTests = require("./word/meaning-tests.js").meaningTests;
const integratedWordTests =
    require("./word/integrated-word-tests.js").integratedWordTests;
const verseInfoTests = require("./verse-info-tests").verseInfoTests;
const lessonInfoTests = require("./lesson/lesson-info-tests").lessonInfoTests;
const verseWordTests = require("./word/verse-word-tests").verseWordTests;
const tafsirTests = require("./tafsir-tests").tafsirTests;
const setup = require("./setup.js");
const utils = require("./utils.js");

describe("Set up", () => {
    test("setup database", async () => {
        let db = await utils.connect_to_db();
        await setup.seedDatabase(db);
    }, 30000);
});

describe("Test everything related to lessons", () => {
    lessonTests();
    lessonInfoTests();
});

describe("Test Verse Info", () => {
    verseInfoTests();
});

describe("Test Reflection", () => {
    reflectionTests();
});

describe("Test Surah Related endpoints", () => {
    surahInfoTests();
    surahTests();
});

describe("Test Mufasir", () => {
    mufasirTests();
});

describe("Test everything related to words", () => {
    rootTests();
    meaningTests();
    verseWordTests();
    integratedWordTests();
});

describe("Test Tafsir", () => {
    tafsirTests();
});
