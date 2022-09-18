const utils = require("./utils");

/**
 *  @schema Lesson
 *  type: object
 *  required:
 *      - lesson_id
 *      - surah_id
 *      - lesson_date
 *      - source
 *  properties:
 *      lesson_id:
 *          type: integer
 *          description: A unique identifier for a lesson
 *          example: 1
 *      surah_id:
 *          type: integer
 *          description: the sura id/number that the lesson belongs to
 *          example: 1
 *      lesson_date:
 *          type: datetime
 *          description: the date the lesson was published / released
 *          example: 2022-01-13
 *      source:
 *          type: string
 *          description: the source link to the video of the lesson
 *          example: www.youtube.com/quranJourney/lessons/
 *
 */

 async function getLessonsBySurahID(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = "SELECT * FROM Lesson WHERE surah_id=$1;";
    let params = [data.surah_id]
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({ success: "Successfully fetched all lessons for the surah" })
    );
}


module.exports = {
    getLessonsBySurahID,
};
