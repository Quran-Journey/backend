import faker from 'faker';
import utils from './utils';
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
import setup from './setup';
import moment from 'moment';
const seedData = setup.seedData;

function lessonTests() {
    it("getting a lesson's information", async () => {
        let lessonA = seedData.lesson[0];

        const resp1 = await apiGET(`/lessons`);
        let lessonB = resp1.data.data[0];
        checkMatch(lessonA, lessonB);
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
}

function checkMatch(lessonA, lessonB) {
    expect(lessonA.source).toEqual(lessonB.source);
    expect(new moment(lessonA.lesson_date).format("YYYY-MM-DD")).toEqual(
        new moment(lessonB.lesson_date).format("YYYY-MM-DD")
    );
}

export default {
    lessonTests: lessonTests,
};
