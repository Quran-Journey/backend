const personTests = require("./person-tests.js").personTests;
const registrationTests = require("./registration-tests.js").registrationTests;
const teamTests = require("./team-tests.js").teamTests;
const setup = require("./setup.js");

describe("Set up", () => {
    test("setup database", async () => {
        await setup.seedDatabase();
    });
});

describe("Test Person", () => {
    personTests();
});

describe("Test Registration", () => {
    registrationTests();
});

describe("Test Team", () => {
    teamTests();
});
