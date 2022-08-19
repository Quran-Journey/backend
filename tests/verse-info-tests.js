const faker = require("faker");
const utils = require("./utils");
const { apiGET } = utils;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function verseInfoTests() {
    it.todo("get complete verse info (positive test)")
    it.todo("get complete verse info (negative test)")
}
//{ data: { reflections: r, tafsir: t, wordexpl: we }, success: pass, error: msg, ecode: code }
function checkMatch(verseInfoA, verseInfoB) {
    expect(verseInfoA.reflection_id).toEqual(verseInfoB.reflection_id);
    expect(verseInfoA.title).toEqual(verseInfoB.title);
    expect(verseInfoA.reflection).toEqual(verseInfoB.reflection);
}
/*
async () => {
        let verseInfoA = seedData.Reflection[0];

        const resp1 = await apiGET(`/verse/1`);
        console.dir(resp1.data.reflections)
        let verseInfoB = resp1.data.reflections;
        checkMatch(verseInfoA, verseInfoB);
        expect(resp1.data.success).toEqual(true);
    }
*/
module.exports = {
    verseInfoTests: verseInfoTests,
};