const utils = require("../utils");

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

async function createrootWord(data) {
    // Frontend note: also add a feature where we guess that the
    //  rootWord's date is the next saturday after the last rootWord's date
    var invalid = validate.simpleValidation(data, {
        root_word: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql = "INSERT INTO rootWord (root_word) VALUES ($1) RETURNING *;";
    var params = [data.root_word];
    return await utils.create(
        sql,
        params,
        new constants.Messages({ dbSuccess: "Successfully created a rootWord." })
    );
}

async function getrootWordById(data) {
    var invalid = validate.simpleValidation(data, {
        root_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM rootWord WHERE root_id=$1";
    var params = [data.root_id];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched rootWord with id ${data.root_id}.`,
        })
    );
}

/** Fetches rootWords based on a specific filter (i.e. id, date) */
async function getAllrootWords(data) {
    let sql = "SELECT * FROM rootWord;";
    var params = [];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched all root words.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
async function updaterootWord(data) {
    var invalid = validate.simpleValidation(data, {
        root_id: "integer",
        root_word: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE rootWord SET root_word=$2 WHERE root_id=$1";
    var params = [data.root_id, data.root_word];
    return await utils.update(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully update rootWord with id ${data.root_id}.`,
            dbNotFound: `Could not find a rootWord with id ${data.root_id}.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
async function deleterootWord(data) {
    var invalid = validate.simpleValidation(data, {
        root_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM rootWord WHERE root_id=$1 RETURNING *;";
    var params = [data.root_id];
    return await utils.remove(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully deleted rootWord with id ${data.root_id}.`,
            dbNotFound: `Could not find a rootWord with id ${data.root_id}.`,
        })
    );
}

async function getVerseRootWords(data) {
    var invalid = validate.simpleValidation(data, {
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
        new constants.Messages({
            dbSuccess: `Successfully fetched roots for verse with id ${data.verse_id}.`,
        })
    );
}

module.exports = {
    getrootWordById,
    createrootWord,
    updaterootWord,
    deleterootWord,
    getVerseRootWords,
    getAllrootWords,
};
