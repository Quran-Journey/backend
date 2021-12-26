const lessonTests = require("./lesson-tests.js").lessonTests;
// const registrationTests = require("./registration-tests.js").registrationTests;
// const teamTests = require("./team-tests.js").teamTests;
const setup = require("./setup.js");

describe("Set up", () => {
    test("setup database", async () => {
        await setup.seedDatabase();
    });
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
