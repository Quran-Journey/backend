const faker = require("faker");
const utils = require("./utils");
const { apiGET, apiPOST, apiPATCH, apiDELETE } = utils;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function reflectionTests() {

    it("getting reflection's information", async () => {
        let ReflectionA = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection`);
        let reflectionB = resp1.data.data[0];
        checkMatch(ReflectionA, reflectionB);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a reflection", async () => {
        let newreflection = {
            verse_explanation_id: 1,
            title: "Inshallah",
            reflection: "My Second Reflection",
        };

        let resp1 = await apiPOST(`/reflection`, newreflection);
        console.log(resp1);
        let reflection = resp1.data.data[0];
        checkMatch(newreflection, reflection);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a reflection", async () => {
        let newreflection = {
            reflection_id: 1,
            verse_explanation_id: 1,
            title: "Alhamdulillah",
            reflection: "My Last Reflection",
        };

        let resp1 = await apiGET(`/reflection/1`);
        let original_reflection = resp1.data.data[0];
        expect(original_reflection.title).not.toEqual(newreflection.title);
        expect(original_reflection.reflection).not.toEqual(newreflection.reflection);

        await apiPATCH(`/reflection`, newreflection);
        let resp2 = await apiGET(`/reflection/1`);
        checkMatch(newreflection, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("delete a reflection", async () => {
        let resp = await apiGET(`/reflection/1`);
        let resp1 = await apiDELETE(`/reflection/1`);
        // We want to ensure that the deleted lesson is the correct lesson.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/reflection/1`);
        expect(resp2.data.ecode).toEqual(3); // Ecode 3 implies None found (i.e. DNE)
        expect(resp2.data.success).toEqual(false);
    });

}
function checkMatch(reflectionA, reflectionB) {
    expect(reflectionA.title).toEqual(reflectionB.title);
    expect(reflectionA.reflection).toEqual(reflectionB.reflection);
    expect(reflectionA.verse_explanation_id).toEqual(reflectionB.verse_explanation_id);
}

module.exports = {
    reflectionTests: reflectionTests,
};