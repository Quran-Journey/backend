import { apiGET, apiPOST, apiPATCH, apiDELETE } from '../request';
import moment from 'moment';
import data  from '../../services/postgres/seed';
import { Errors } from '../../utils/constants';

const seedData = data.seedData;

function lessonTests() {
  it('getting a lesson\'s information', async () => {
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

  it('getting all lessons', async () => {
    let lesson1 = seedData.Lesson[0];
    let lesson2 = seedData.Lesson[1];

    const resp1 = await apiGET(`/lessons`);
    let lessonA = resp1.data.data[0];
    let lessonB = resp1.data.data[1];
    checkMatch(lesson1, lessonA);
    checkMatch(lesson2, lessonB);
    expect(resp1.data.success).toEqual(true);
  });

  it('creating a lesson', async () => {
    let newlesson = {
      lesson_date: moment(new Date()).format('YYYY-MM-DD'),
      source: 'randomWebsite.com/url_to_video',
      surah_id: 1,
      start_verse: 1,
      end_verse: 2,
    };

    let resp1 = await apiPOST(`/lesson`, newlesson);
    let lesson = resp1.data.data[0];
    checkMatch(newlesson, lesson);
    expect(resp1.data.success).toEqual(true);
  });

  it('updating a lesson', async () => {

    // Calculate tomorrow's date by adding 1 to the current date for update method
    let currentDate = new Date();
    let tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    let newlesson = {
      lesson_id: 1,
      lesson_date: moment(tomorrowDate).format('YYYY-MM-DD'),
      surah_id: 1,
      source: 'randomWebsite.com/url_to_video',
      start_verse: 1,
      end_verse: 5,
    };

    let resp1 = await apiGET(`/lesson/1`);
    let original_lesson = resp1.data.data[0];
    expect(original_lesson.source).not.toEqual(newlesson.source);
    expect(
      moment(original_lesson.lesson_date).format('YYYY-MM-DD')
    ).not.toEqual(moment(newlesson.lesson_date).format('YYYY-MM-DD'));

    await apiPATCH(`/lesson`, newlesson);
    let resp2 = await apiGET(`/lesson/1`);
    checkMatch(newlesson, resp2.data.data[0]);
    expect(resp2.data.success).toEqual(true);
  });

  it('delete a lesson', async () => {
    let resp = await apiGET(`/lesson/1`);
    let resp1 = await apiDELETE(`/lesson/1`);
    // We want to ensure that the deleted lesson is the correct lesson.
    expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
    expect(resp1.data.success).toEqual(true);

    let resp2 = await apiGET(`/lesson/1`);
    expect(resp2.data.code).toEqual(Errors.DB_DNE);
    expect(resp2.data.success).toEqual(false);
  });
}

export function checkMatch(lessonA: any, lessonB: any) {
  expect(lessonA.source).toEqual(lessonB.source);
  expect(moment(lessonA.lesson_date).format('YYYY-MM-DD')).toEqual(
    moment(lessonB.lesson_date).format('YYYY-MM-DD')
  );
}

export { lessonTests };
