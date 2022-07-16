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

    /* 
     it("updating a reflection", async () => {

    });

    it("delete a reflection", async () => {
        
    });

    */
}
function checkMatch(reflectionA, reflectionB) {
    expect(reflectionA.title).toEqual(reflectionB.title);
    expect(reflectionA.reflection).toEqual(reflectionB.reflection);
    expect(reflectionA.verse_explanation_id).toEqual(reflectionB.verse_explanation_id);
}

module.exports = {
    reflectionTests: reflectionTests,
};