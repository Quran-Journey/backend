const utils = require("./utils");
const constants = require("../../utils/constants");

// Note: this list contains key value pairs of the attribute and types within the schema.
const attributes = {
    surah_id: "integer",
    surah_number: "date",
    name_complex: "string",
    name_arabic: "string",
};

/** Fetches a surah and it's verses by surah id */
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
        new constants.Messages({
            dbSuccess: `Successfully fetched Surah with id ${data.surah_id}.`,
            dbNotFound: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

/** Update a Surah, requires all attributes of the Surah. */
async function updateSurah(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
        surah_number: "integer",
        name_complex: "string",
        name_arabic: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE Surah SET surah_number=$2, name_complex=$3, name_arabic=$4 WHERE surah_id=$1";
    var params = [
        data.surah_id,
        data.surah_number,
        data.name_complex,
        data.name_arabic,
    ];
    return await utils.update(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully update Surah with id ${data.surah_id}.`,
            dbNotFound: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

/**
 *  @schema Surah
 *  type: object
 *  required:
 *      - surah_id
 *      - surah_number
 *      - name_complex
 *      - name_arabic
 *  properties:
 *      surah_number:
 *          type: integer
 *          description: the number of the surah (acting as the surah id)
 *          example: 1
 *      surah_id:
 *          type: integer
 *          description: the id of the surah
 *          example: 1
 *      name_complex:
 *          type: string
 *          description: the name of the surah in english (with complex characters)
 *          example: al-Fātihah
 *      name_arabic:
 *          type: string
 *          description: the name of the surah in arabic
 *          example: al-Fātihah
 */
async function getSurahs() {
    let sql = "SELECT * FROM surah;";
    return await utils.retrieve(
        sql,
        [],
        new constants.Messages({
            dbSuccess: `Successfully fetched all surahs.`,
        })
    );
}

/**
 *  @schema Verse
 *  type: object
 *  required:
 *      - index
 *      - surah
 *      - aya
 *      - text
 *  properties:
 *      verse_index:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      surah:
 *          type: integer
 *          description: the surah id/number that the verse belongs to
 *          example: 1
 *      verse_number:
 *          type: integer
 *          description: the ayah number within the surah
 *          example: 1
 *      verse_text:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 */
async function getSurahVerses(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Verse WHERE surah=$1";
    var params = [data.surah_id];
    let verses = await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched verses for sura number ${data.surah_id}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a, b) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

async function getSurahLessons(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE surah_id=$1";
    var params = [data.surah_id];
    let verses = await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched verses for sura number ${data.surah_id}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a, b) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

module.exports = {
    getSurahById,
    updateSurah,
    getSurahVerses,
    getSurahLessons,
    getSurahs,
};
