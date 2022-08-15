const utils = require("../utils");

/**
 *  @schema VerseWordMeaning
 *  type: object
 *  required:
 *      - index_id
 *      - word_id
 *      - word
 *      - root_id
 *      - rootword
 *      - meanings
 *  properties:
 *      index_id:
 *          type: Integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      word_id:
 *          type: integer
 *          description: the id pertaining to a specific word in the verse
 *          example: 2000
 *      word:
 *          type: string
 *          description: a specific word in the verse
 *          example: بِسْمِ
 *      root_id:
 *          type: integer
 *          description: the id of the root word associated with the specific word in the verse
 *          example: 936
 *      rootword:
 *          type: integer
 *          description: string representaiton of the root word with spaces in between each letter.
 *          example: س م و
 *      meanings:
 *          type: array
 *          items:
 *              $ref: '#/definitions/RootMeaning'
 *          description: the meanings associated with the word in the verse
 */

/**
 *  @schema RootWord
 *  type: object
 *  required:
 *      - root_id
 *      - rootword
 *      - meanings
 *  properties:
 *      root_id:
 *          type: integer
 *          description: the id of the root word
 *          example: 936
 *      rootword:
 *          type: string
 *          description: string representaiton of the root word with spaces in between each letter.
 *          example: س م و
 */

/**
 *  @schema ArabicWord
 *  type: object
 *  required:
 *      - word_id
 *      - root_id
 *      - word
 *  properties:
 *      word_id:
 *          type: integer
 *          description: the id of the arabic word
 *          example: 1
 *      root_id:
 *          type: integer
 *          description: the id of the root word associated with the arabic word
 *          example: 936
 *      word:
 *          type: string
 *          description: string representaiton of the word.
 *          example: بِسْمِ
 */

/**
 *  @schema RootMeaning
 *  type: object
 *  required:
 *      - word_id
 *      - root_id
 *      - meaning
 *  properties:
 *      meaning_id:
 *          type: integer
 *          description: the id of the meaning
 *          example: 1
 *      root_word:
 *          type: integer
 *          description: the id of the root word
 *          example: 936
 *      word:
 *          type: string
 *          description: The meaning.
 *          example: A name
 */

async function createrootWord(data) {
    // Frontend note: also add a feature where we guess that the
    //  rootWord's date is the next saturday after the last rootWord's date
    var invalid = utils.simpleValidation(data, {
        rootWord: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql =
        "INSERT INTO rootWord (source, rootWord_date) VALUES ($1, $2) RETURNING *;";
    var params = [data.source, data.root_word_date];
    return await utils.create(
        sql,
        params,
        new utils.Message({ success: "Successfully created a rootWord." })
    );
}

/** Fetches rootWords based on a specific filter (i.e. id, date) */
async function getrootWordById(data) {
    var invalid = utils.simpleValidation(data, {
        rootWord_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM rootWord WHERE rootWord_id=$1";
    var params = [data.root_word_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched rootWord with id ${data.root_word_id}.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
async function updaterootWord(data) {
    var invalid = utils.simpleValidation(data, {
        rootWord_id: "integer",
        rootWord_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE rootWord SET source=$2, rootWord_date=$3 WHERE rootWord_id=$1";
    var params = [data.root_word_id, data.source, data.root_word_date];
    return await utils.update(
        sql,
        params,
        new utils.Message({
            success: `Successfully update rootWord with id ${data.root_word_id}.`,
            none: `Could not find a rootWord with id ${data.root_word_id}.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
async function deleterootWord(data) {
    var invalid = utils.simpleValidation(data, {
        rootWord_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM rootWord WHERE rootWord_id=$1 RETURNING *;";
    var params = [data.root_word_id];
    return await utils.remove(
        sql,
        params,
        new utils.Message({
            success: `Successfully deleted rootWord with id ${data.root_word_id}.`,
            none: `Could not find a rootWord with id ${data.root_word_id}.`,
        })
    );
}

// TODOs:
async function getrootWordById() {}
async function updateRootWord() {}
async function addRootWord() {}
async function deleteRootWord() {}

async function getVerseRootWords(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "SELECT * FROM (SELECT verse_id, aw.word_id, word, root_id FROM VerseWord as vw JOIN ArabicWord as aw on aw.word_id=vw.word_id WHERE verse_id=$1) as vtaw JOIN RootWord as rt ON rt.root_id=vtaw.root_id;";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched roots for verse with id ${data.verse_id}.`,
        })
    );
}

module.exports = {
    getrootWordById: getrootWordById,
    createrootWord: createrootWord,
    updaterootWord: updaterootWord,
    deleterootWord: deleterootWord,
    getVerseRootWords,
};
