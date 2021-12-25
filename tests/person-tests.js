const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function lessonTests() {
    let lessons;

    beforeAll(async () => {
        lessons = seedData.lesson;
    }, 30000);

    it("getting a lesson's information", async () => {
        let lessonA = seedData.lesson[0];

        const resp1 = await apiGET(`/getlesson/${lessonA.email}`);
        let lessonB = resp1.data.data[0];
        checkMatch(lessonA, lessonB);
        expect(resp1.data.success).toEqual(true);
    });

    it("test creating a lesson", async () => {
        let newlesson = {
            lesson_number: 3,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "youtube"
        };

        let resp1 = await apiPOST(`/addlesson`, newlesson);
        let lesson = resp1.data.data[0];
        checkMatch(newlesson, lesson);
    });
}

function checkMatch(lessonA, lessonB) {
    expect(lessonA.first_name).toEqual(lessonB.first_name);
    expect(lessonA.last_name).toEqual(lessonB.last_name);
    expect(lessonA.email).toEqual(lessonB.email);
    expect(lessonA.phone).toEqual(lessonB.phone);
    expect(lessonA.gender).toEqual(lessonB.gender);
    expect(new moment(lessonA.birthday).format("YYYY-MM-DD")).toEqual(
        new moment(lessonB.birthday).format("YYYY-MM-DD")
    );
}

module.exports = {
    lessonTests: lessonTests,
};
