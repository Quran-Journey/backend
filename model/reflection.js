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
    var sql =
        "INSERT INTO Reflection (verse_explanation_id, title, reflection) VALUES ($1, $2, $3) RETURNING *;";
    var params = [data.verse_explanation_id, data.title, data.reflection];
    return await utils.create(
        sql,
        params,
        new utils.Message({ success: "Successfully created a reflection." })
    );
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