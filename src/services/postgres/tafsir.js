const postgres = require(".");
const validate = require("../../utils/validation");
const { Messages } = require("../../utils/constants")

async function getTafsirById(data) {
    var invalid = validate(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = "SELECT * FROM Tafsir WHERE tafsir_id=$1;";
    let params = [data.tafsir_id]
    return await postgres.retrieve(
        sql,
        params,
        new Messages({ success: "Successfully fetched a tafsir." })
    );
}

async function createTafsir(data) {
    var invalid = validate(data, {
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
    return await postgres.create(
        sql,
        params,
        new Messages({ success: "Successfully created a tafsir." })
    );
}
async function updateTafsir(data) {
    var invalid = validate(data, {
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
    return await postgres.update(
        sql,
        params,
        new Messages({ success: "Successfully updated a tafsir." })
    );
}
async function deleteTafsir(data) {
    var invalid = validate(data, {
        tafsir_id: "integer",
    });
    if (invalid) {
        return invalid;
    }

    let sql = "DELETE FROM Tafsir WHERE tafsir_id=$1 RETURNING *;"
    let params = [data.tafsir_id]
    return await postgres.remove(
        sql,
        params,
        new Messages({ success: "Successfully deleted a tafsir." })
    );
}

module.exports = {
    getTafsirById,
    createTafsir,
    updateTafsir,
    deleteTafsir
}

