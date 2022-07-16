const faker = require("faker");
const utils = require("./utils");
const { apiGET, apiPOST, apiPATCH, apiDELETE } = utils;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function reflectionTests() {

    it("getting a reflection's information", async () => {
        let ReflectionA = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection`);
        let reflectionB = resp1.data.data[0];
        checkMatch(ReflectionA, reflectionB);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a reflection", async () => {
        let newreflection = {
            reflection_id: 2,
            verse_explanation_id: 1,
            title: "Inshallah",
            reflection: "My Second Reflection",
        };

        let resp1 = await apiPOST(`/reflection`, newreflection);
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
function checkMatch(lessonA, lessonB) {
    expect(lessonA.source).toEqual(lessonB.source);
    expect(new moment(lessonA.lesson_date).format("YYYY-MM-DD")).toEqual(
        new moment(lessonB.lesson_date).format("YYYY-MM-DD")
    );
}

module.exports = {
    reflectionTests: reflectionTests,
};