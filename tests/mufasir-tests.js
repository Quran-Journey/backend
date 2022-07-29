const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPATCH = utils.apiPATCH;
const apiDELETE = utils.apiDELETE;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function mufasirTests() {
    it("getting all the mufasireen", async () => {
        let mufasir1 = seedData.mufasir[0];
        let mufasir2 = seedData.mufasir[1];

        const resp1 = await apiGET(`/mufasirs`);
        let mufasirA = resp1.data.data[0];
        let mufasirB = resp1.data.data[1];
        checkMatch(mufasir1, mufasirA);
        checkMatch(mufasir2, mufasirB);
        expect(resp1.data.success).toEqual(true);
    });

    it("adding a mufasir", async () => {
        let new_mufasir = {
            mufasir_name: "Ibn Abbas",
            death: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
        };

        let resp1 = await apiPOST(`/mufasir`, new_mufasir);
        let mufasir = resp1.data.data[0];
        checkMatch(new_mufasir, mufasir);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a mufasir", async () => {
        let new_mufasir = {
            mufasir_id: 2,
            mufasir_name: "Muqatil",
            death: new moment(faker.date.past(1350)).format("YYYY-MM-DD"),
        };

        let resp1 = await apiGET(`/mufasir/1`);
        let original_mufasir = resp1.data.data[0];
        expect(original_mufasir.source).not.toEqual(new_mufasir.source);
        expect(
            new moment(original_mufasir.mufasir_date).format("YYYY-MM-DD")
        ).not.toEqual(
            new moment(new_mufasir.mufasir_date).format("YYYY-MM-DD")
        );

        await apiPUT(`/mufasir`, new_mufasir);
        let resp2 = await apiGET(`/mufasir/1`);
        checkMatch(new_mufasir, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("deleting a mufasir", async () => {
        let resp = await apiGET(`/mufasir/2`);
        let resp1 = await apiDELETE(`/mufasir/2`);
        // We want to ensure that the deleted mufasir is the correct mufasir.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/mufasir/4`);
        expect(resp2.data.ecode).toEqual(3); // Ecode 3 implies None found (i.e. DNE)
        expect(resp2.data.success).toEqual(false);
    });
}

function checkMatch(mufasirA, mufasirB) {
    expect(mufasirA.name).toEqual(mufasirB.name);
    expect(new moment(mufasirA.death).format("YYYY-MM-DD")).toEqual(
        new moment(mufasirB.death).format("YYYY-MM-DD")
    );
}

module.exports = {
    mufasirTests: mufasirTests,
};
