const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPUT = utils.apiPUT;
const apiDELETE = utils.apiDELETE;
const setup = require("./setup");
const seedData = setup.seedData;

function wordTests() {
    it.todo("getting a root word by id");

    it.todo("adding a root word");

    it.todo("updating a root word");

    it.todo("deleting a root");

    it.todo("getting all of the root words associated with a specific verse.");

}

function checkMatch(rootA, rootB) {}

module.exports = {
    wordTests: wordTests,
};
