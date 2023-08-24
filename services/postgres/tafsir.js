const postgres = require("./postgres");
const validate = require("../../utils/validation");
const constants = require("../../utils/constants");

/**
 *  @schema Tafsir
 *  type: object
 *  required:
 *      -tafsir_id,
 *      -tafsir_text,
 *      -book,
 *      -verse_id,
 *      -visible
 *  properties:
 *      tafsir_id:
 *          type: integer
 *          description: to identify the tafsir from others
 *          example: 1
 *      tafsir_text:
 *          type: string
 *          description: content of verse tafsir 
 *          example: "In the Name of Allah—the Most Compassionate, Most Merciful."
 *      book:
 *          type: integer
 *          description: unique identifier for book in which tafsir is
 *          example: 3
 *      verse_id: 
 *          type: integer
 *          description: the verse id
 *          example: 23
 *      visible:
 *          type: integer
 *          description: flag to display information 
 *       
 *   
 */

async function getTafsirById(data) {
    var invalid = validate.simpleValidation(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = "SELECT * FROM Tafsir WHERE tafsir_id=$1;";
    let params = [data.tafsir_id]
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({ success: "Successfully fetched a tafsir." })
    );
}

async function createTafsir(data) {
    var invalid = validate.simpleValidation(data, {
        tafsir_id: "integer",
        tafsir_text: "string",
        book: "integer",
        verse_id: "integer",
        visible: "boolean"
    });
    if (invalid) {
        return invalid;
    }

    let sql = "INSERT INTO Tafsir (tafsir_id,tafsir_text,book,verse_id,visible) VALUES ($1,$2,$3,$4,$5) RETURNING *;"
    let params = [data.tafsir_id, data.tafsir_text, data.book, data.verse_id, data.visible]
    return await utils.create(
        sql,
        params,
        new constants.Messages({ success: "Successfully created a tafsir." })
    );
}
async function updateTafsir(data) {
    var invalid = validate.simpleValidation(data, {
        tafsir_id: "integer",
        tafsir_text: "string",
        book: "integer",
        verse_id: "integer",
        visible: "boolean"
    });
    if (invalid) {
        return invalid;
    }

    let sql = "UPDATE Tafsir SET tafsir_text=$2, book=$3, verse_id=$4, visible=$5 WHERE tafsir_id=$1 RETURNING*;"
    let params = [data.tafsir_id, data.tafsir_text, data.book, data.verse_id, data.visible]
    return await utils.update(
        sql,
        params,
        new constants.Messages({ success: "Successfully updated a tafsir." })
    );
}
async function deleteTafsir(data) {
    var invalid = validate.simpleValidation(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = "DELETE FROM Tafsir WHERE tafsir_id=$1 RETURNING *;"
    let params = [data.tafsir_id]
    return await utils.remove(
        sql,
        params,
        new constants.Messages({ success: "Successfully deleted a tafsir." })
    );
}

module.exports = {
    getTafsirById,
    createTafsir,
    updateTafsir,
    deleteTafsir
}

