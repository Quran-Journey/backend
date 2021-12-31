import { lessonTests } from './lesson-tests.js';

// const registrationTests = require("./registration-tests.js").registrationTests;
// const teamTests = require("./team-tests.js").teamTests;
import setup from './setup.js';

import utils from './utils.js';

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
