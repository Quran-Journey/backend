const postgres = require(".");
const validate = require("../../utils/validation");
const { Messages } = require("../../utils/constants");

async function getMufasir(data) {
    var invalid = validate(data, {
        mufasir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM mufasir WHERE mufasir_id=$1;";
    var params = [data.mufasir_id];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched mufasir with ID ${data.mufasir_id}.`,
        })
    );
}

async function getMufasireen() {
    let sql = "SELECT * FROM mufasir;";
    var params = [];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched all mufasireen.`,
        })
    );
}

async function addMufasir(data) {
    var invalid = validate(data, {
        mufasir_name: "string",
        death: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "INSERT INTO mufasir (mufasir_name, death) VALUES ($1, $2) RETURNING *;";
    var params = [data.mufasir_name, data.death];
    return await postgres.create(
        sql,
        params,
        new Messages({
            success: `Successfully created mufasir.`,
        })
    );
}

async function updateMufasir(data) {
    var invalid = validate(data, {
        mufasir_id: "integer",
        mufasir_name: "string",
        death: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE mufasir SET mufasir_name=$2, death=$3 WHERE mufasir_id=$1 RETURNING *;";
    var params = [data.mufasir_id, data.mufasir_name, data.death];
    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully updated mufasir with id ${data.mufasir_id}.`,
        })
    );
}

async function deleteMufasir(data) {
    var invalid = validate(data, {
        mufasir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM mufasir WHERE mufasir_id=$1 RETURNING *;";
    var params = [data.mufasir_id];
    return await postgres.remove(
        sql,
        params,
        new Messages({
            success: `Successfully updated mufasir with id ${data.mufasir_id}.`,
        })
    );
}

module.exports = {
    getMufasireen,
    getMufasir,
    addMufasir,
    updateMufasir,
    deleteMufasir,
};
