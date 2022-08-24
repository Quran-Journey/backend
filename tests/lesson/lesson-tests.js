const faker = require("faker");
const utils = require("../utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const apiPATCH = utils.apiPATCH;
const apiDELETE = utils.apiDELETE;
const setup = require("../setup");
const moment = require("moment");
const seedData = setup.seedData;

function lessonTests() {
    it("getting a lesson's information", async () => {
        let lessonA = seedData.Lesson[0];

        const resp1 = await apiGET(`/lesson/1`);
        let lessonB = resp1.data.data[0];
        checkMatch(lessonA, lessonB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting a lesson by it's date", async () => {
        let lessonA = seedData.Lesson[0];

        const resp1 = await apiGET(`/lessons?property=lesson_date&operator=eq&value=${lessonA.lesson_date}`);
        let lessonB = resp1.data.data[0];
        checkMatch(lessonA, lessonB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting all lessons", async () => {
        let lesson1 = seedData.Lesson[0];
        let lesson2 = seedData.Lesson[1];

        const resp1 = await apiGET(`/lessons`);
        let lessonA = resp1.data.data[0];
        let lessonB = resp1.data.data[1];
        checkMatch(lesson1, lessonA);
        checkMatch(lesson2, lessonB);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a lesson", async () => {
        let newlesson = {
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "randomWebsite.com/url_to_video",
        };

        let resp1 = await apiPOST(`/lesson`, newlesson);
        let lesson = resp1.data.data[0];
        checkMatch(newlesson, lesson);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a lesson", async () => {
        let newlesson = {
            lesson_id: 1,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "randomWebsite.com/url_to_video",
        };

        let resp1 = await apiGET(`/lesson/1`);
        let original_lesson = resp1.data.data[0];
        expect(original_lesson.source).not.toEqual(newlesson.source);
        expect(
            new moment(original_lesson.lesson_date).format("YYYY-MM-DD")
        ).not.toEqual(new moment(newlesson.lesson_date).format("YYYY-MM-DD"));

        await apiPATCH(`/lesson`, newlesson);
        let resp2 = await apiGET(`/lesson/1`);
        checkMatch(newlesson, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("delete a lesson", async () => {
        let resp = await apiGET(`/lesson/4`);
        let resp1 = await apiDELETE(`/lesson/4`);
        // We want to ensure that the deleted lesson is the correct lesson.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);

        let resp2 = await apiGET(`/lesson/4`);
        expect(resp2.data.ecode).toEqual(3); // Ecode 3 implies None found (i.e. DNE)
        expect(resp2.data.success).toEqual(false);
    });
}

function checkMatch(lessonA, lessonB) {
    expect(lessonA.source).toEqual(lessonB.source);
    expect(new moment(lessonA.lesson_date).format("YYYY-MM-DD")).toEqual(
        new moment(lessonB.lesson_date).format("YYYY-MM-DD")
    );
}

module.exports = {
    lessonTests: lessonTests,
};
