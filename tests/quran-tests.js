const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const setup = require("./setup");
const seedData = setup.seedData;

function quranTests() {
    it.todo("getting all chapters");

    it.todo("getting a specific chapter by chapter number");

    it.todo("getting verses associated with a specific chapter");
}

module.exports = {
    quranTests,
};
