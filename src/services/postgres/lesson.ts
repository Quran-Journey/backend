import { create, update, remove, retrieve, paginate, getOperator } from ".";
import validate from "../../utils/validation";
import { Result, Messages, Errors } from "../../utils/constants";
import { Lesson } from "../../models/lesson/lesson";
import { getVerseInfo } from "./verseInfo";
import lodash from "lodash";
import { LessonContent } from "../../models/lesson/lessonContent";
import { VerseInformation } from "../../models/verse/verseInformation";

// Note: this list contains key value pairs of the attribute and types within the schema.
// TODO: replace with model attribute references
const attributes: { [key: string]: string } = {
    lessonId: "integer",
    lessonDate: "date",
    source: "string",
};

export async function createLesson(data: Lesson): Promise<Result<Lesson>> {
    // Frontend note: also add a feature where we guess that the
    //  lesson's date is the next saturday after the last lesson's date
    var invalid: Result<any> = validate(data, {
        lessonDate: "date",
        source: "string",
        document: "string",
        startVerse: "integer",
        endVerse: "integer",
        surahId: "string",
    });
    if (!invalid.success) {
        return invalid;
    }
    var sql =
        "INSERT INTO Lesson (source, document, lesson_date, start_verse, end_verse, surah_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";
    var params = [
        data.source!,
        data.document!,
        data.lessonDate!,
        data.startVerse!,
        data.endVerse!,
        data.surahId!,
    ];
    var lessons: Result<Lesson> = await create(
        sql,
        params,
        new Messages({ success: "Successfully created a lesson." })
    );
    return lessons;
}

/**
 *  This is where we actually filter our values.
 *  Properties must be a string representing one of the table columns.
 *  Operator must be one of: eq, gt, lt, gte, or lte.
 *  Value is the value we are filtering by.
 */
export async function filterLessons(data: any): Promise<Result<Lesson>> {
    let invalid = validate(data, {
        property: "string",
        operator: "string",
    });
    let pagination = paginate(data);
    console.log("invalid", invalid);
    if (!invalid.success) {
        return await retrieve(
            `SELECT * FROM Lesson ${pagination};`,
            [],
            new Messages({
                success: `Fetched all lessons since no query was properly defined.`,
            })
        );
    } else {
        console.log("theesssssssadasd");
        if (!Object.keys(attributes).includes(data.property)) {
            // This check is done to avoid SQL injection.
            return new Result({
                data: [],
                success: false,
                msg: `${data.property} is not an attribute of the Lesson type.`,
                code: Errors.DB_INVALID,
            });
        }
        invalid = validate(data, {
            value: attributes[data.property],
        });
        if (!invalid.success) {
            return invalid;
        }
        let sql = `SELECT * FROM Lesson WHERE ${lodash.snakeCase(
            data.property
        )}`;
        let op = getOperator(data.operator);
        if (op) {
            // Add the operator and any pagination
            sql = sql + `${op}$1 ${pagination};`;
        } else {
            // If the operator is invalid, then we must notify the client.
            return new Result({
                data: [],
                success: false,
                msg: `Operator was not set correctly. Operator must be one of: eq, gt, lt, gte, or lte.`,
                code: Errors.DB_INVALID,
            });
        }
        var params = [data.value];
        var lessons: Result<Lesson> = await retrieve(
            sql,
            params,
            new Messages({
                success: `Successfully fetched lessons based on filter ${data.property} ${op} ${data.value}.`,
            })
        );
        return lessons;
    }
}

/** Fetches lessons based on a specific filter (i.e. id, date) */
export async function getLessonById(data: {
    lessonId: string;
}): Promise<Result<Lesson>> {
    var invalid: Result<any> = validate(data, {
        lessonId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE lesson_id=$1";
    var params = [data.lessonId!];
    var lessons: Result<Lesson> = await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched lesson with id ${data.lessonId}.`,
        })
    );
    return lessons;
}

/*Fetches verses in a lesson based*/
//ASSUMPTIONS: Verses in a Lesson are contigous
export async function getLessonVerses(data: {
    lessonId: string;
}): Promise<Result<LessonContent>> {
    let lesson = await getLessonById(data);
    if (!lesson.success || lesson.data.length == 0) {
        return new Result({
            data: [],
            success: lesson.success,
            msg: `Lesson with id ${data.lessonId} not found.`,
            code: lesson.code,
        });
    }

    let lessonContent: VerseInformation[] = [];
    let errors: string[] = [];
    let currentVerse = lesson.data[0].startVerse ?? 1;
    let numVerses: number =
        (lesson.data[0].endVerse ?? 0) - (lesson.data[0].startVerse ?? 0);
    for (let i = 0; i <= numVerses; i++) {
        let temp: Result<VerseInformation> = await getVerseInfo({
            verseId: currentVerse,
        });
        lessonContent.push(temp.data[0]);
        console.log("temp.data[0].words", temp.data[0].words);
        for (var word = 0;  word < temp.data[0].words!.length; word ++) {
            console.log("meanings", temp.data[0].words![word].rootWord?.meanings);
        }
        if (temp.code != Errors.NONE) {
            errors.push(
                `Error on verse with id ${temp.data[0].verse}: ${temp.msg}`
            );
        }
        console.log("currentVerse", currentVerse);
        currentVerse++;
    }
    if (errors.length == 0) {
        errors = ["Successfully fetched complete lesson info"];
    }
    console.log("lessonContent", lessonContent);
    console.log(lessonContent[0].words);
    console.log(lessonContent[1].words);
    const lessonVerses = new LessonContent(
        lesson.data[0],
        numVerses,
        lessonContent
    );
    let res = new Result({
        data: [lessonVerses],
        success: lesson.success,
        msg: errors,
        code: lesson.code,
    });
    return res;
}

/** Update a lesson, requires all attributes of the lesson. */
export async function updateLesson(data: {
    lessonId: number;
    lessonDate: string;
    source: string;
    startVerse: number;
    endVerse: number;
    surahId: number;
    document: string;
}): Promise<Result<Lesson>> {
    var invalid: Result<any> = validate(data, {
        lessonId: "integer",
        lessonDate: "date",
        source: "string",
        startVerse: "integer",
        endVerse: "integer",
        surahId: "integer",
        document: "string",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql =
        "UPDATE Lesson SET source=$2, lesson_date=$3, start_verse=$4, end_verse=$5, surah_id=$6, document=$7 WHERE lesson_id=$1";
    var params = [
        data.lessonId,
        data.source,
        data.lessonDate,
        data.startVerse,
        data.endVerse,
        data.surahId,
        data.document,
    ];
    var lessons: Result<Lesson> = await update(
        sql,
        params,
        new Messages({
            success: `Successfully updated lesson with id ${data.lessonId}.`,
            dbNotFound: `Could not find a lesson with id ${data.lessonId}.`,
        })
    );
    return lessons;
}

/** Update a lesson, requires all attributes of the lesson. */
export async function deleteLesson(data: {
    lessonId: string;
}): Promise<Result<Lesson>> {
    var invalid: Result<any> = validate(data, {
        lessonId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "DELETE FROM Lesson WHERE lesson_id=$1 RETURNING *;";
    var params = [data.lessonId];
    var lessons: Result<Lesson> = await remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted lesson with id ${data.lessonId}.`,
            dbNotFound: `Could not find a lesson with id ${data.lessonId}.`,
        })
    );
    return lessons;
}
