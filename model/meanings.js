const utils = require("./utils");
const words = require("./words");

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

// To be used when adding the different meanings to the sentences.
async function getRootWordMeanings(data) {
    var invalid = utils.simpleValidation(data, {
        root_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM RootMeaning WHERE root_word=$1;";
    var params = [data.root_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched roots for verse with id ${data.verse_id}.`,
        })
    );
}

async function getVerseRootWordsSentences(data) {
    var all_roots = await words.getVerseRootWords(data);
    let msg = all_roots.error;
    let root, word, rootmeanings, sentence;
    if (all_roots.success) {
        for (let item of all_roots.data) {
            root = item.root_word;
            word = item.word;
            rootmeanings = stringifyMeanings(item);
            sentence = `The word ${word} comes from the root ${root} and is associated with the meanings: ${rootmeanings}`;
            item.sentence = sentence;
        }
        msg = `Successfully retreived sentences for each word in verse with id ${data.verse_id}`;
    }
    return utils.setResult(
        all_roots.data,
        all_roots.success,
        msg,
        all_roots.ecode
    );
}

async function stringifyMeanings(root) {
    let meanings = await getRootWordMeanings(root);
    let meaningsString = "";
    for (let meaning of meanings.data) {
        meaningsString = `${meaning}, `;
    }
    return meaningsString.substring(0, meaningsString.length - 2);
}

module.exports = {
    getVerseRootWordsSentences,
};
