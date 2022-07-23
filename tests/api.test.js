const lessonTests = require("./lesson-tests.js").lessonTests;
const reflectionTests = require("./reflection-tests.js").reflectionTests;
const surahInfoTests = require("./surah-info-tests.js").surahInfoTests;
const setup = require("./setup.js");
const utils = require("./utils.js");

describe("Set up", () => {
    test("setup database", async () => {
        let db = await utils.connect_to_db();
        await setup.seedDatabase(db);
    }, 30000);
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