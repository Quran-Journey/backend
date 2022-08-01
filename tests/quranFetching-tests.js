const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const setup = require("./setup");
const seedData = setup.seedData;

function rootWordTests() {
    it.todo("getting all chapters");

    it.todo("getting a specific chapter by chapter number", async () => {});

    it.todo("getting verses associated with a specific chapter", async () => {});
}

module.exports = {
    rootWordTests: rootWordTests,
};
