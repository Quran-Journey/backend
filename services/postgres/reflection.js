const validate = require("../../utils/validation");
const { Messages } = require("../../utils/constants");

async function createReflection(data) {
    var invalid = validate(data, {
        verse_id: "integer",
        title: "string",
        reflection: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql_reflec =
        "INSERT INTO Reflection (verse_id, title, reflection) VALUES ($1, $2, $3) RETURNING *;";
    var params = [data.verse_id, data.title, data.reflection];

    return await postgres.create(
        sql_reflec,
        params,
        new Messages({ success: "Successfully created a reflection." })
    );
}

async function getAllReflections() {
    let sql = "SELECT * FROM Reflection";
    return await postgres.retrieve(
        sql,
        [],
        new Messages({
            success: `Successfully fetched reflections.`,
        })
    );
}

/** Fetches Reflections based on a specific filter */
async function getReflectionById(data) {
    var invalid = validate(data, {
        reflection_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Reflection WHERE reflection_id=$1";
    var params = [data.reflection_id];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched reflection with id ${data.reflection_id}.`,
        })
    );
}

async function getReflectionBySurahVerseId(data) {
    var invalid = validate(data, {
        surah_id: "integer",
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }
    let sql =
        "SELECT * FROM(SELECT reflection_id, verse_id, title, reflection FROM Reflection as r JOIN Verse as v on r.verse_id = v.verse_index) as rve JOIN Verse as v on rve.verse_id = v.verse_index WHERE surah = $1 and verse_id = $2;";
    var params = [data.surah_id, data.verse_id];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched reflection by verse id ${data.verse_id} and surah id ${data.surah_id}.`,
        })
    );
}

/** Update a reflection, requires all attributes of the reflection. */
async function updateReflection(data) {
    var invalid = validate(data, {
        reflection_id: "integer",
        verse_id: "integer",
        title: "string",
        reflection: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE Reflection SET title=$2, reflection=$3 WHERE reflection_id=$1 RETURNING *;";
    var params = [data.reflection_id, data.title, data.reflection];
    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully update reflection with id ${data.reflection_id}.`,
            dbNotFound: `Could not find a reflection with id ${data.reflection_id}.`,
        })
    );
}

/** Delete a reflection, requires all attributes of the reflection. */
async function deleteReflection(data) {
    var invalid = validate(data, {
        reflection_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM Reflection WHERE reflection_id=$1 RETURNING *;";
    var params = [data.reflection_id];
    return await postgres.remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted reflection with id ${data.reflection_id}.`,
            dbNotFound: `Could not find a reflection with id ${data.reflection_id}.`,
        })
    );
}

module.exports = {
    getReflectionById: getReflectionById,
    getReflectionBySurahVerseId: getReflectionBySurahVerseId,
    createReflection: createReflection,
    updateReflection: updateReflection,
    deleteReflection: deleteReflection,
    getAllReflections: getAllReflections,
};
