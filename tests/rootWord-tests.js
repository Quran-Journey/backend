const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPUT = utils.apiPUT;
const apiDELETE = utils.apiDELETE;
const setup = require("./setup");
const seedData = setup.seedData;

function rootWordTests() {
    it("getting all of the root words associated with a specific verse.", async () => {
        let root1 = seedData.root[0];

        const resp1 = await apiGET(`/root`);
        let rootA = resp1.data.data[0];
        checkMatch(root1, rootA);
        expect(resp1.data.success).toEqual(true);
    });

    it("adding a root", async () => {
        let new_root = {
            root_name: "Ibn Abbas",
            death: "687 AD",
        };

        let resp1 = await apiPOST(`/root`, new_root);
        let root = resp1.data.data[0];
        checkMatch(new_root, root);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a root", async () => {
        let new_root = {
            root_id: 3,
            root_name: "Muqatil",
            death: "767 AD",
        };

        let resp1 = await apiGET(`/root/3`);
        let original_root = resp1.data.data[0];
        expect(original_root.root_name).not.toEqual(
            new_root.root_name
        );
        expect(original_root.death).not.toEqual(new_root.death);

        await apiPUT(`/root`, new_root);
        let resp2 = await apiGET(`/root/3`);
        checkMatch(new_root, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("deleting a root", async () => {
        let resp = await apiGET(`/root/3`);
        let resp1 = await apiDELETE(`/root/3`);
        // We want to ensure that the deleted root is the correct root.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/root/3`);
        expect(resp2.data.ecode).toEqual(3); // Ecode 3 implies None found (i.e. DNE)
        expect(resp2.data.success).toEqual(false);
    });
}

function checkMatch(rootA, rootB) {
    expect(rootA.root_name).toEqual(rootB.root_name);
    expect(rootA.death).toEqual(rootB.death);
}

module.exports = {
    rootTests: rootTests,
};
