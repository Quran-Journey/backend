const requests = require("./request");
const { apiGET, apiPOST, apiPUT, apiDELETE } = requests;
const { seedData } = require("../services/postgres/seed");
const { Errors } = require("../utils/constants")

function mufasirTests() {
    it("getting all the mufasireen", async () => {
        let mufasir1 = seedData.Mufasir[0];

        const resp1 = await apiGET(`/mufasir`);
        let mufasirA = resp1.data.data[0];
        checkMatch(mufasir1, mufasirA);
        expect(resp1.data.success).toEqual(true);
    });

    it("adding a mufasir", async () => {
        let new_mufasir = {
            mufasir_name: "Ibn Abbas",
            death: "687 AD",
        };

        let resp1 = await apiPOST(`/mufasir`, new_mufasir);
        let mufasir = resp1.data.data[0];
        checkMatch(new_mufasir, mufasir);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a mufasir", async () => {
        let new_mufasir = {
            mufasir_id: 3,
            mufasir_name: "Muqatil",
            death: "767 AD",
        };

        let resp1 = await apiGET(`/mufasir/3`);
        let original_mufasir = resp1.data.data[0];
        expect(original_mufasir.mufasir_name).not.toEqual(
            new_mufasir.mufasir_name
        );
        expect(original_mufasir.death).not.toEqual(new_mufasir.death);

        await apiPUT(`/mufasir`, new_mufasir);
        let resp2 = await apiGET(`/mufasir/3`);
        checkMatch(new_mufasir, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("deleting a mufasir", async () => {
        let resp = await apiGET(`/mufasir/3`);
        let resp1 = await apiDELETE(`/mufasir/3`);
        // We want to ensure that the deleted mufasir is the correct mufasir.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/mufasir/3`);
        expect(resp2.data.code).toEqual(Errors.DB_DNE);
        expect(resp2.data.success).toEqual(false);
    });
}

function checkMatch(mufasirA, mufasirB) {
    expect(mufasirA.mufasir_name).toEqual(mufasirB.mufasir_name);
    expect(mufasirA.death).toEqual(mufasirB.death);
}

module.exports = {
    mufasirTests: mufasirTests,
};
