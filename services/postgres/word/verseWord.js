const utils = require("../utils");

/**
 *  @schema VerseWord
 *  type: object
 *  required:
 *      - verse_word_id
 *      - word_id
 *      - verse_id
 *      - visible
 *      - word_explanation
 *  properties:
 *      verse_word_id:
 *          type: integer
 *          description: the id of the arabic word being associated with the verse
 *          example: 1
 *      word_id:
 *          type: integer
 *          description: the id of the arabic word being associated with the verse
 *          example: 1
 *      verse_id:
 *          type: integer
 *          description: the id of the verse that is being associated with the word
 *          example: 1
 *      visible:
 *          type: boolean
 *          description: whether the value is visible or not
 *          example: true
 *      word_explanation:
 *          type: string
 *          description: The word_explanation that is made for the word in the verse.
 *          example: The وَ in the word وَالْعَادِيَاتِ is for taking an oath. Thus we can look for the response to the oath in ayah 6.
 */

async function linkVerseToWord(data) {
    var invalid = validate.simpleValidation(data, {
        verse_id: "integer",
        word_id: "integer",
        word_explanation: "string",
        visible: "boolean",
    });
    if (invalid) {
        return invalid;
    }
    var sql =
        "INSERT INTO verseWord (verse_id, word_id, word_explanation, visible) VALUES ($1, $2, $3, $4) RETURNING *;";
    var params = [data.verse_id, data.word_id, data.word_explanation, data.visible];
    return await utils.create(
        sql,
        params,
        new constants.Messages({
            success: `Successfully linked a verse with id ${data.verse_id} to word with id ${data.word_id}.`,
        })
    );
}

async function getVerseWordById(data) {
    var invalid = validate.simpleValidation(data, {
        verse_word_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM verseWord WHERE verse_word_id=$1;";
    var params = [data.verse_word_id];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            success: `Successfully fetched verse word with id ${data.verse_word_id}.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
async function updateVerseWord(data) {
    var invalid = validate.simpleValidation(data, {
        verse_word_id: "integer",
        verse_id: "integer",
        word_id: "integer",
        word_explanation: "string",
        visible: "boolean",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE VerseWord SET verse_id=$2, word_id=$3, word_explanation=$4, visible=$5 WHERE verse_word_id=$1 RETURNING *;";
    var params = [
        data.verse_word_id,
        data.verse_id,
        data.word_id,
        data.word_explanation,
        data.visible,
    ];
    return await utils.update(
        sql,
        params,
        new constants.Messages({
            success: `Successfully update VerseWord with id ${data.verse_word_id}.`,
            dbNotFound: `Could not find a VerseWord with id ${data.verse_word_id}.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
async function deleteVerseWord(data) {
    var invalid = validate.simpleValidation(data, {
        verse_word_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM verseWord WHERE verse_word_id=$1 RETURNING *;";
    var params = [data.verse_word_id];
    return await utils.remove(
        sql,
        params,
        new constants.Messages({
            success: `Successfully deleted VerseWord with id ${data.verse_word_id}.`,
            dbNotFound: `Could not find a VerseWord with id ${data.verse_word_id}.`,
        })
    );
}

module.exports = {
    linkVerseToWord,
    getVerseWordById,
    updateVerseWord,
    deleteVerseWord,
};
