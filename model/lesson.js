const utils = require("./utils");
const verseInfo = require("./verseInfo");

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
 *      - lesson_content
 *      - lesson_id
 *      - lesson_date
 *      - start_verse
 *      - end_verse
 *      - source
 *  properties:
 *      lesson_content:
 *          type: array
 *          items:
 *            type: object
 *            schema:
 *              $ref: "#/definitions/VerseInformation"
 *          description: collection of complete verse Information for verses assocaited with a lesson
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
async function createLesson(data) {
    // Frontend note: also add a feature where we guess that the
    //  lesson's date is the next saturday after the last lesson's date
    var invalid = utils.simpleValidation(data, {
        lesson_date: "date",
        source: "string",
        surah_id: "string",
        start_verse: "integer",
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    var sql =
        "INSERT INTO Lesson (source, lesson_date, start_verse, end_verse) VALUES ($1, $2, $3, $4) RETURNING *;";
    var params = [
        data.source,
        data.lesson_date,
        data.start_verse,
        data.end_verse,
    ];
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
    let lesson = await getLessonById(data);
    if (!lesson.success) {
        return lesson;
    }

    let lesson_content = [];
    let errors = [];
    let currentVerse = lesson.data[0].start_verse;
    let num_verses = lesson.data[0].end_verse - lesson.data[0].start_verse;
    for (let i = 0; i <= num_verses; i++) {
        let temp = await verseInfo.getVerseInfo({ verse_id: currentVerse });
        lesson_content[i] = temp.data;
        if (temp.ecode != utils.errorEnum.NONE) {
            errors.push(
                `Error on verse with id ${temp.data.verse_index}: ${temp.error}`
            );
        }
        currentVerse++;
    }
    if (errors.length == 0) {
        errors = "Successfully fetched complete lesson info";
    }

    let res = utils.setResult(
        { ...lesson.data[0], num_verses, lesson_content },
        lesson.success,
        errors,
        lesson.ecode
    );
    return res;
}

/** Update a lesson, requires all attributes of the lesson. */
async function updateLesson(data) {
    var invalid = utils.simpleValidation(data, {
        lesson_id: "integer",
        lesson_date: "date",
        source: "string",
        start_verse: "integer",
        end_verse: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE Lesson SET source=$2, lesson_date=$3, start_verse=$4, end_verse=$5 WHERE lesson_id=$1";
    var params = [
        data.lesson_id,
        data.source,
        data.lesson_date,
        data.start_verse,
        data.end_verse,
    ];
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
    getLessonVerses,
};
