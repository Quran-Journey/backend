const requests = require("../request");
const { apiGET, apiPOST, apiPATCH, apiDELETE } = requests;
const { seedData } = require("../../services/postgres/seed");
const { Errors } = require("../../utils/constants")

function rootTests() {
    it("getting a root word by id", async () => {
        let rootA = seedData.RootWord[0];

        const resp1 = await apiGET(`/word/root/1`);
        let rootB = resp1.data.data[0];
        checkMatch(rootA, rootB);
        expect(resp1.data.success).toEqual(true);
    });

    it("adding a root word", async () => {
        let newRoot = {
            root_id: seedData.RootWord.length + 2,
            root_word: "ر ب",
        };

        let resp1 = await apiPOST(`/word/root`, newRoot);
        let root = resp1.data.data[0];
        expect(resp1.data.success).toEqual(true);
        checkMatch(newRoot, root);
    });

    it("updating a root word", async () => {
        let newRoot = {
            root_id: seedData.RootWord.length + 2,
            root_word: "ر ب ب",
        };

        let resp1 = await apiGET(`/word/root/${newRoot.root_id}`);
        let originalRoot = resp1.data.data[0];
        expect(originalRoot.root_word).not.toEqual(newRoot.root_word);

        await apiPATCH(`/word/root`, newRoot);
        let resp2 = await apiGET(`/word/root/${newRoot.root_id}`);
        checkMatch(newRoot, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("deleting a root", async () => {
        async () => {
            let resp = await apiGET(`/word/root/1`);
            let resp1 = await apiDELETE(`/word/root/1`);
            // We want to ensure that the deleted lesson is the correct lesson.
            expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
            expect(resp1.data.success).toEqual(true);

            let resp2 = await apiGET(`/word/root/1`);
            expect(resp2.data.code).toEqual(Errors.DB_DNE);
            expect(resp2.data.success).toEqual(false);
        };
    });
}

function checkMatch(rootA, rootB) {
    expect(rootA.root_id).toEqual(rootB.root_id);
    expect(rootA.root_word).toEqual(rootB.root_word);
}

module.exports = {
    rootTests,
};
