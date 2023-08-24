const utils = require("../utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPUT = utils.apiPUT;
const apiDELETE = utils.apiDELETE;
const setup = require("../setup");
const seedData = setup.seedData;

function meaningTests() {
    it("getting a root meaning by id", async () => {
        let rootA = seedData.RootMeaning[0];

        const resp1 = await apiGET(`/word/root/meaning/1`);
        let rootB = resp1.data.data[0];
        checkMatch(rootA, rootB);
        expect(resp1.data.success).toEqual(true);
    });

    it("adding a root meaning", async () => {
        let newMeaning = {
            root_id: 1,
            meaning: "high",
        };

        let resp1 = await apiPOST(`/word/root/meaning`, newMeaning);
        let meaning = resp1.data.data[0];
        expect(resp1.data.success).toEqual(true);
        checkMatch(newMeaning, meaning);
    });

    it("updating a root meaning", async () => {
        let newMeaning = {
            meaning_id: 1,
            root_id: 1,
            meaning: "elevated",
        };

        let resp1 = await apiGET(`/word/root/meaning/${newMeaning.root_id}`);
        let originalMeaning = resp1.data.data[0];
        expect(originalMeaning.meaning).not.toEqual(newMeaning.meaning);

        await apiPUT(`/word/root/meaning`, newMeaning);
        let resp2 = await apiGET(`/word/root/meaning/${newMeaning.root_id}`);
        checkMatch(newMeaning, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("deleting a root meaning", async () => {
        async () => {
            let resp = await apiGET(`/word/root/meaning/1`);
            let resp1 = await apiDELETE(`/word/root/meaning/1`);
            // We want to ensure that the deleted meaning is the correct meaning.
            expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
            expect(resp1.data.success).toEqual(true);

            let resp2 = await apiGET(`/word/root/meaning/1`);
            expect(resp2.data.code).toEqual(3); // code 3 implies None found (i.e. DNE)
            expect(resp2.data.success).toEqual(false);
        };
    });
}

function checkMatch(meaningA, meaningB) {
    expect(meaningA.root_id).toEqual(meaningB.root_id);
    expect(meaningA.meaning).toEqual(meaningB.meaning);
}

module.exports = {
    meaningTests,
};
