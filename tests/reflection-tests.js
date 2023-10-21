const faker = require("faker");
const requests = require("./request");
const { apiGET, apiPOST, apiPATCH, apiDELETE } = requests;
const { seedData } = require("../services/postgres/seed");
const seedData = seed.seedData;

function reflectionTests() {

    it("getting reflection's information", async () => {
        let ReflectionA = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection/1`);
        let ReflectionB = resp1.data.data[0];
        checkMatch(ReflectionA, ReflectionB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting reflection's information by surah id and verse id", async () => {
        let ReflectionA = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection/1/1`);
        let reflectionB = resp1.data.data[0];
        expect(ReflectionA.title).toEqual(reflectionB.title);
        expect(ReflectionA.reflection).toEqual(reflectionB.reflection);
        expect(ReflectionA.reflection_id).toEqual(reflectionB.reflection_id);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a reflection", async () => {
        let newreflection = {
            verse_id: 1,
            title: "Inshallah",
            reflection: "My Second Reflection",
        };

        let resp1 = await apiPOST(`/reflection`, newreflection);
        let reflection = resp1.data.data[0];
        checkMatch(newreflection, reflection);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a reflection", async () => {
        let newreflection = {
            reflection_id: 1,
            verse_id: 1,
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
        expect(resp2.data.code).toEqual(3); // code 3 implies None found (i.e. DNE)
        expect(resp2.data.success).toEqual(false);
    });

}
function checkMatch(reflectionA, reflectionB) {
    expect(reflectionA.title).toEqual(reflectionB.title);
    expect(reflectionA.reflection).toEqual(reflectionB.reflection);
    expect(reflectionA.verse_id).toEqual(reflectionB.verse_id);
}

module.exports = {
    reflectionTests: reflectionTests,
};