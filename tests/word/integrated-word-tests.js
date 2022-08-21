const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPATCH = utils.apiPATCH;
const apiDELETE = utils.apiDELETE;
const setup = require("./setup");
const seedData = setup.seedData;

function integratedWordTests() {
    it.todo(
        "getting all of the root words along with their meanings associated with a specific verse."
    );
    it.todo(
        "get a structured sentence of root words and meanings associated with a specific verse."
    );
}

function checkMatch(rootA, rootB) {
    expect(rootA.root_id).toEqual(rootB.root_id);
    expect(rootA.root_word).toEqual(rootB.root_word);
}

module.exports = {
    wordTests: wordTests,
};
