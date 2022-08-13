const utils = require("./utils");

// Note: this list contains key value pairs of the attribute and types within the schema.
const attributes = {
    surah_id: "integer",
    surah_number: "date",
    revelation_place: "string",
    name_complex: "string",
    name_arabic: "string",
    verse_count: "integer",
};

/**
 *  @schema Surah`
 *  type: object
 *  required:
 *      - lesson_id
 *      - lesson_date
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
 *      source:
 *          type: string
 *          description: a URL to the lesson recording
 *          example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 */


/** Create a Surah, requires all attributes of the Surah except surah_id which is generated as PK (need to verify this) */
async function createSurah(data) {
    var invalid = utils.simpleValidation(data, {
        surah_number: "date",
        revelation_place: "string",
        name_complex: "string",
        name_arabic: "string",
        verse_count: "integer",
    });
    if (invalid) {
        return invalid;
    }
    var sql =
        "INSERT INTO Surah (surah_number, revelation_place, name_complex, name_arabic, verse_count) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    var params = [data.surah_number, data.revelation_place, data.name_complex, data.name_arabic, data.verse_count];
    return await utils.create(
        sql,
        params,
        new utils.Message({ success: "Successfully created a Surah." })
    );
}


/** Fetches Surahs based on a specific filter (i.e. surah_id, surah_number) */
async function getSurahById(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Surah WHERE surah_id=$1";
    var params = [data.surah_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched Surah with id ${data.surah_id}.`,
            none: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}


/** Update a Surah, requires all attributes of the Surah. */
async function updateSurah(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
        surah_number: "date",
        revelation_place: "string",
        name_complex: "string",
        name_arabic: "string",
        verse_count: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE Surah SET surah_number=$2, revelation_place=$3, name_complex=$4, name_arabic=$5, verse_count=$6 WHERE surah_id=$1";
    var params = [data.surah_id, data.surah_number, data.revelation_place, data.name_complex, data.name_arabic, data.verse_count];
    return await utils.update(
        sql,
        params,
        new utils.Message({
            success: `Successfully update Surah with id ${data.surah_id}.`,
            none: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

/** Delete a Surah, requires only the Surah ID of a Surah */
async function deleteSurah(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM Surah WHERE surah_id=$1 RETURNING *;";
    var params = [data.surah_id];
    return await utils.remove(
        sql,
        params,
        new utils.Message({
            success: `Successfully deleted Surah with id ${data.surah_id}.`,
            none: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

module.exports = {
    getSurahById: getSurahById,
    createSurah: createSurah,
    updateSurah: updateSurah,
    deleteSurah: deleteSurah,
};
