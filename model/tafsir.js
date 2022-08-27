const utils = require("./utils");

/**
 *  @schema Tafsir
 *  type: object
 *  required:
 *      - tafsir_id
 *  properties:
 *      tafsir_id:
 *          type: integer
 *          description: to identify the tafsir from others
 *          example: 1
 *   
 */

async function getTafsirById(data) {
    var invalid = utils.simpleValidation(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = ""
    let params = []
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({ success: "Successfully fetched a tafsir." })
    );
}

async function createTafsir(data) {
    var invalid = utils.simpleValidation(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = ""
    let params = []
    return await utils.create(
        sql,
        params,
        new utils.Message({ success: "Successfully created a tafsir." })
    );
}
async function updateTafsir(data) {
    var invalid = utils.simpleValidation(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = ""
    let params = []
    return await utils.update(
        sql,
        params,
        new utils.Message({ success: "Successfully updated a tafsir." })
    );
}
async function deleteTafsir(data) {
    var invalid = utils.simpleValidation(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = ""
    let params = []
    return await utils.remove(
        sql,
        params,
        new utils.Message({ success: "Successfully deleted a tafsir." })
    );
}

module.exports = {
    getTafsirById,
    createTafsir,
    updateTafsir,
    deleteTafsir
}