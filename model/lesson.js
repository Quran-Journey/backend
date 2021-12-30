const c = require("./constants");

/**
 *  @schema AllLessons
 *  type: array
 *  items:
 *      $ref: '#/definitions/Lesson'
 *  tags: Falafel
 */
async function getLessons() {
    return await c.retrieve("SELECT * FROM Lesson;");
}

/**
 *  @schema Lesson
 *  type: object
 *  required:
 *      - lesson_id
 *      - lesson_date
 *      - source
 *  properties:
 *      lesson_number: integer
 *      lesson_date: string
 *      source: string
 *  tags: Falafel
 */
async function createLesson(data) {
    // Frontend note: also add a feature where we guess that the
    //  lesson's date is the next saturday after the last lesson's date
    var invalid = c.simpleValidation(data, {
        lesson_id: "integer",
        lesson_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql =
        "INSERT INTO Lesson (lesson_integer, source, lesson_date) VALUES ($1, $2, $3) RETURNING *;";
    var params = [data.lesson_number, data.source, data.lesson_date];
    return await c.create(
        sql,
        params,
        new c.Message({ success: "Successfully created a lesson." })
    );
}

module.exports = {
    getLessons: getLessons,
    createLesson: createLesson,
};
