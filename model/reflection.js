const utils = require("./utils");

async function test() {
    let sql = "SELECT * FROM Reflection";
    return await utils.retrieve(
        sql,
        [],
        new utils.Message({
            success: `Successfully fetched reflection.`,
        })
    );
}

/** Fetches Reflections based on a specific filter */
async function getReflectionById(data) {
    var invalid = utils.simpleValidation(data, {
        reflection_id: "integer",
    });
    if (invalid) {
        console.log("exiting getReflectionById()...");
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

async function createReflection(data) {

    var invalid = utils.simpleValidation(data, {
        reflection_id: "integer",
        verse_explanation_id: "integer",
        title: "string",
        reflection: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql_reflec =
        "INSERT INTO Reflection (verse_explanation_id, title, reflection) VALUES ($1, $2, $3) RETURNING *;";
    var params = [data.verse_explanation_id, data.title, data.reflection];
    try {
        /* some data to avoid forign key constraints 
        var sql_verse = "INSERT INTO Verse (verse_index, surah) VALUES ($1, $2)";
        var sql_surah =
            "INSERT INTO Surah (surah_id,surah_number,revelation_place,verse_count) VALUES ($1, $2, $3, $4) RETURNING *;";
        var sql_verse_expl = "INSERT INTO VerseExplanation (verse_explanation_id,verse_id) VALUES ($1,$2)RETURNING *;";
        await utils.create(sql_surah, [1, 1, "Makkah", 7])
        await utils.create(sql_verse, [1, 1])
        await utils.create(sql_verse_expl, [1, 1])
        */
        return await utils.create(
            sql_reflec,
            params,
            new utils.Message({ success: "Successfully created a reflection." })
        );
    } catch (error) {
        console.log("ERROR: Something went wrong!")
    }
}

/** Update a reflection, requires all attributes of the reflection. */
async function updateReflection(data) {
    var invalid = utils.simpleValidation(data, {
        reflection_id: "integer",
        title: "string",
        reflection: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE Reflection SET title=$2, reflection=$3 WHERE reflection_id=$1";
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

/** Update a lesson, requires all attributes of the lesson. */
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
    createReflection: createReflection,
    updateReflection: updateReflection,
    deleteReflection: deleteReflection,
    test: test,
};