const utils = require("./utils");
const verseInfo = require("./verseInfo")

// Note: this list contains key value pairs of the attribute and types within the schema.
const attributes = {
    lesson_id: "integer",
    lesson_date: "date",
    source: "string",
};

/**
 *  @schema Lesson
 *  type: object
 *  required:
 *      - lesson_id
 *      - lesson_date
 *      - start_verse
 *      - end_verse
 *      - source
 *  properties:
 *      lesson_id:
 *          type: integer
 *          description: to identify the lesson from others
 *          example: 1
 *      lesson_date:
 *          type: date
 *          description: to identify the day that the lesson was taught
 *          example: 2021-10-30
 *      start_verse:
 *          type: integer
 *          description: first verse in a lesson
 *          example: 1
 *      end_verse:
 *          type: integer
 *          description: last verse in a lesson
 *          example: 3
 *      source:
 *          type: string
 *          description: a URL to the lesson recording
 *          example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 */

/**
 *  @schema LessonContent
 *  type: object
 *  required:
 *      - lessonInfo
 *      - lesson
 *  properties:
 *      lessonInfo:
 *          type: array
 *          items:
 *            schema:
 *              $ref: "#/definitions/VerseInformation"
 *          description: collection of complete verse Information for verses assocaited with a lesson
 *          example: [{
 *                      verse: {
 *                          "verse_index": 1,
                            "surah": 1,
                            "verse_number": 1,
                            "verse_text": "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ"},
                        reflectons:{
                            "reflection_id": 1,
                            "verse_id": 1,
                            "title": "Bismillah",
                            "reflection": "My First Reflection"},
                        tafsirs:{"tafsir_id": 1,
                            "content": "In the name of Allah, The Most Gracious, The Most Merciful",
                            "book": 1,
                            "verse_id": 1,
                            "visible": false,
                            "verse_index": 1,
                            "surah": 1,
                            "verse_number": 1,
                            "verse_text": "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ"},
                        words:{"word": "بِسْمِ",
                            "root_id": 1,
                            "word_explaination": "An explanation of the basmalla goes here.",
                            "visible": false,
                            "root_word": "س م و",
                            "meaning": "to be high",
                            "word_id": 1}
                    }]
 *      lesson:
 *          type: object
 *          items: 
 *             schema: 
 *               $ref: "#/definitions/Lesson"
 *          description: lesson details and information
 *          example: {"lesson_id":1,"lesson_date":"2021-10-30T00:00:00.000Z","start_verse":1,"end_verse":2,"source":"https://google.com"} 
 */
async function createLesson(data) {
    // Frontend note: also add a feature where we guess that the
    //  lesson's date is the next saturday after the last lesson's date
    var invalid = utils.simpleValidation(data, {
        lesson_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }

    let start = data.start_verse ? data.start_verse : null;
    let end = data.end_verse ? data.end_verse : null;

    var sql =
        "INSERT INTO Lesson (source, lesson_date, start_verse, end_verse) VALUES ($1, $2, $3, $4) RETURNING *;";
    var params = [data.source, data.lesson_date, start, end];
    return await utils.create(
        sql,
        params,
        new utils.Message({ success: "Successfully created a lesson." })
    );
}

/**
 *  This is where we actually filter our values.
 *  Properties must be a string representing one of the table columns.
 *  Operator must be one of: eq, gt, lt, gte, or lte.
 *  Value is the value we are filtering by.
 */
async function filterLessons(data) {
    var invalid = utils.simpleValidation(data, {
        property: "string",
        operator: "string",
    });
    let pagination = utils.paginate(data);
    if (invalid) {
        return await utils.retrieve(
            `SELECT * FROM Lesson ${pagination};`,
            [],
            new utils.Message({
                success: `Fetched all lessons since no query was properly defined.`,
            })
        );
    } else {
        if (!Object.keys(attributes).includes(data.property)) {
            // This check is done to avoid SQL injection.
            return utils.returnInvalid(
                `${property} is not an attribute of the Lesson type.`
            );
        }
        invalid = utils.simpleValidation(data, {
            value: attributes[data.property],
        });
        if (invalid) {
            return invalid;
        }
        let sql = `SELECT * FROM Lesson WHERE ${data.property}`;
        let op = utils.getOperator(data.operator);
        if (op) {
            // Add the operator and any pagination
            sql = sql + `${op}$1 ${pagination};`;
        } else {
            // If the operator is invalid, then we must notify the client.
            utils.returnInvalid(
                `Operator was not set correctly. Operator must be one of: eq, gt, lt, gte, or lte.`
            );
        }
        var params = [data.value];
        return await utils.retrieve(
            sql,
            params,
            new utils.Message({
                success: `Successfully fetched lessons based on filter ${data.property} ${op} ${data.value}.`,
            })
        );
    }
}

/** Fetches lessons based on a specific filter (i.e. id, date) */
async function getLessonById(data) {
    var invalid = utils.simpleValidation(data, {
        lesson_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE lesson_id=$1";
    var params = [data.lesson_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched lesson with id ${data.lesson_id}.`,
        })
    );
}

/*Fetches verses in a lesson based*/
//ASSUMPTIONS: Verses in a Lesson are contigous
async function getLessonVerses(data) {
    let msg = "";
    let lesson = await getLessonById(data);
    if (!lesson.success) {
        return lesson;
    }

    let lessonInfo = [];
    if (lesson.data[0].start_verse == null || lesson.data[0].end_verse == null) {
        msg = "Invalid start or end verse value"
    } else {
        let currentVerse = lesson.data[0].start_verse;
        let numVerses = lesson.data[0].end_verse - lesson.data[0].start_verse;
        for (let i = 0; i <= numVerses; i++) {
            let temp = await verseInfo.getVerseInfo({ verse_id: currentVerse })
            lessonInfo[i] = temp.data;
            currentVerse++;
        }
        msg = "Successfully fetched complete lesson info"
    }

    let res = utils.setResult(
        { lesson: lesson.data, lessonInfo },
        lesson.success,
        msg,
        lesson.ecode
    );
    return res
}

/** Update a lesson, requires all attributes of the lesson. */
async function updateLesson(data) {
    var invalid = utils.simpleValidation(data, {
        lesson_id: "integer",
        lesson_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE Lesson SET source=$2, lesson_date=$3 WHERE lesson_id=$1";
    var params = [data.lesson_id, data.source, data.lesson_date];
    return await utils.update(
        sql,
        params,
        new utils.Message({
            success: `Successfully update lesson with id ${data.lesson_id}.`,
            none: `Could not find a lesson with id ${data.lesson_id}.`,
        })
    );
}

/** Update a lesson, requires all attributes of the lesson. */
async function deleteLesson(data) {
    var invalid = utils.simpleValidation(data, {
        lesson_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM Lesson WHERE lesson_id=$1 RETURNING *;";
    var params = [data.lesson_id];
    return await utils.remove(
        sql,
        params,
        new utils.Message({
            success: `Successfully deleted lesson with id ${data.lesson_id}.`,
            none: `Could not find a lesson with id ${data.lesson_id}.`,
        })
    );
}

module.exports = {
    filterLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonVerses
};
