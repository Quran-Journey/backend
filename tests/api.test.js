const lessonTests = require("./lesson-tests.js").lessonTests;
// const registrationTests = require("./registration-tests.js").registrationTests;
// const teamTests = require("./team-tests.js").teamTests;
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

// describe("Test Registration", () => {
//     registrationTests();
// });

// describe("Test Team", () => {
//     teamTests();
// });
