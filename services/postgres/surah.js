const postgres = require("./postgres");
const validate = require("../../utils/validation");
const { Messages } = require("../../utils/constants")

// Note: this list contains key value pairs of the attribute and types within the schema.
const attributes = {
    surah_id: "integer",
    surah_number: "date",
    name_complex: "string",
    name_arabic: "string",
};

/** Fetches a surah and it's verses by surah id */
async function getSurahById(data) {
    var invalid = validate(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Surah WHERE surah_id=$1";
    var params = [data.surah_id];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched Surah with id ${data.surah_id}.`,
            dbNotFound: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

/** Update a Surah, requires all attributes of the Surah. */
async function updateSurah(data) {
    var invalid = validate(data, {
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
    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully update Surah with id ${data.surah_id}.`,
            dbNotFound: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

async function getSurahs() {
    let sql = "SELECT * FROM surah;";
    return await postgres.retrieve(
        sql,
        [],
        new Messages({
            success: `Successfully fetched all surahs.`,
        })
    );
}

async function getSurahVerses(data) {
    var invalid = validate(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Verse WHERE surah=$1";
    var params = [data.surah_id];
    let verses = await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verses for sura number ${data.surah_id}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a, b) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

async function getSurahLessons(data) {
    var invalid = validate(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE surah_id=$1";
    var params = [data.surah_id];
    let verses = await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verses for sura number ${data.surah_id}.`,
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
