const lessonTests = require("./lesson-tests.js").lessonTests;
const reflectionTests = require("./reflection-tests.js").reflectionTests;
const surahInfoTests = require("./surah-info-tests.js").surahInfoTests;
const mufasirTests = require("./mufasir-tests.js").mufasirTests;
const rootWordTests = require("./rootWord-tests.js").rootWordTests;
const rootWordTests = require("./quranFetching-tests.js").rootWordTests;
const setup = require("./setup.js");
const utils = require("./utils.js");

describe("Set up", () => {
    test("setup database", async () => {
        let db = await utils.connect_to_db();
        await setup.seedDatabase(db);
    }, 30000);
});

describe("Test Quran fetching", () => {
    quranFetchingTests();
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

describe("Test RootWord", () => {
    rootWordTests();
});

