const utils = require("./utils");

/**
 *  @schema Mufasir
 *  type: object
 *  required:
 *      - mufasir_id
 *      - mufasir_name
 *      - death
 *  properties:
 *      mufasir_id:
 *          type: Integer
 *          description: the id of the mufasir
 *          example: 1
 *      mufasir_name:
 *          type: string
 *          description: The name of the mufasir
 *          example: "Ibn Kathir"
 *      death:
 *          type: string
 *          description: The date that the mufasir passed away
 *          example: 1203 H
 */
async function getMufasir(data) {
    var invalid = utils.simpleValidation(data, {
        mufasir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM mufasir WHERE mufasir_id=$1;";
    var params = [data.mufasir_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched mufasir with ID ${mufasir_id}.`,
        })
    );
}

async function getMufasireen() {
    let sql = "SELECT * FROM mufasir;";
    var params = [];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched all mufasireen.`,
        })
    );
}

async function addMufasir(data) {
    var invalid = utils.simpleValidation(data, {
        mufasir_name: "string",
        death: "date",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "INSERT INTO mufasir (mufasir_name, death) VALUES ($1, $2) RETURNING *;";
    var params = [data.mufasir_name, data.death];
    return await utils.create(
        sql,
        params,
        new utils.Message({
            success: `Successfully created mufasir.`,
        })
    );
}

async function updateMufasir(data) {
    var invalid = utils.simpleValidation(data, {
        mufasir_id: "integer",
        mufasir_name: "string",
        death: "date",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE mufasir SET mufasir_name=$2, death=$3 WHERE mufasir_id=$1;";
    var params = [data.mufasir_id, data.mufasir_name, data.death];
    return await utils.update(
        sql,
        params,
        new utils.Message({
            success: `Successfully updated mufasir with id ${data.mufasir_id}.`,
        })
    );
}

async function deleteMufasir(data) {
    var invalid = utils.simpleValidation(data, {
        mufasir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM mufasir WHERE mufasir_id=$1;";
    var params = [data.mufasir_id];
    return await utils.delete(
        sql,
        params,
        new utils.Message({
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
