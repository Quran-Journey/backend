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

    it.todo(
        "getting all of the root words associated with a specific verse.",
        async () => {
            let resp = await apiGET(`/word/root/1`);
            let resp1 = await apiDELETE(`/word/root/1`);
            // We want to ensure that the deleted lesson is the correct lesson.
            expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
            expect(resp1.data.success).toEqual(true);

            let resp2 = await apiGET(`/word/root/1`);
            expect(resp2.data.ecode).toEqual(3); // Ecode 3 implies None found (i.e. DNE)
            expect(resp2.data.success).toEqual(false);
        }
    );
}

function checkMatch(rootA, rootB) {
    expect(reflectionA.root_id).toEqual(reflectionB.root_id);
    expect(reflectionA.root_word).toEqual(reflectionB.root_word);
}

module.exports = {
    wordTests: wordTests,
};
