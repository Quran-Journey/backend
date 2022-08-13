const utils = require("./utils");

/**
 *  @schema Reflection
 *  type: object
 *  required:
 *      - reflection_id
 *      - verse_id
 *      - title
 *      - reflection
 *  properties:
 *      reflection_id:
 *          type: integer
 *          description: to identify the reflection from others
 *          example: 1
 *      verse_id:
 *          type: integer
 *          description: to identify the verse that the reflection is refering to
 *          example: 23
 *      title:
 *          type: string
 *          description: a title to the refelction
 *          example: "My Reflection"
 *      reflection:
 *          type: string
 *          description: refelction on verse 
 *          example: "I have..."
 */
async function createReflection(data) {

    var invalid = utils.simpleValidation(data, {
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

    return await utils.create(
        sql_reflec,
        params,
        new utils.Message({ success: "Successfully created a reflection." })
    );
}

async function getAllReflections() {
    let sql = "SELECT * FROM Reflection";
    return await utils.retrieve(
        sql,
        [],
        new utils.Message({
            success: `Successfully fetched reflections.`,
        })
    );
}

/** Fetches Reflections based on a specific filter */
async function getReflectionById(data) {
    var invalid = utils.simpleValidation(data, {
        reflection_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Reflection WHERE reflection_id=$1";
    var params = [data.reflection_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched reflection with id ${data.reflection_id}.`,
        })
    );
}

async function getReflectionBySurahVerseId(data) {
    var invalid = utils.simpleValidation(data, {
        surah_id: "integer",
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM(SELECT reflection_id, verse_id, title, reflection FROM Reflection as r JOIN Verse as v on r.verse_index = v.verse_id) as rve JOIN Verse as v on rve.verse_id = v.verse_index WHERE surah = $1 and verse_id = $2;";
    var params = [data.surah_id, data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched reflection by verse id ${data.verse_id} and surah id ${data.surah_id}.`
        })
    );
}

/** Update a reflection, requires all attributes of the reflection. */
async function updateReflection(data) {
    var invalid = utils.simpleValidation(data, {
        reflection_id: "integer",
        verse_id: "integer",
        title: "string",
        reflection: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE Reflection SET title=$2, reflection=$3 WHERE reflection_id=$1 RETURNING *;";
    var params = [data.reflection_id, data.title, data.reflection];
    return await utils.update(
        sql,
        params,
        new utils.Message({
            success: `Successfully update reflection with id ${data.reflection_id}.`,
            none: `Could not find a reflection with id ${data.reflection_id}.`,
        })
    );
}

/** Delete a reflection, requires all attributes of the reflection. */
async function deleteReflection(data) {
    var invalid = utils.simpleValidation(data, {
        reflection_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM Reflection WHERE reflection_id=$1 RETURNING *;";
    var params = [data.reflection_id];
    return await utils.remove(
        sql,
        params,
        new utils.Message({
            success: `Successfully deleted reflection with id ${data.reflection_id}.`,
            none: `Could not find a reflection with id ${data.reflection_id}.`,
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