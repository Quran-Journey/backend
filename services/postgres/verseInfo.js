const postgres = require("./postgres");
const validate = require("../../utils/validation");
const constants = require("../../utils/constants");

/**
 * @schema VerseWordInformation
 *     type: object
 *     required:
 *         - word
 *         - root_id
 *         - word_explanation
 *         - visible
 *         - root_word
 *         - meaning
 *         - word_id
 *     properties:
 *         word:
 *             type: string
 *             description: the arabic word in the verse
 *             example: الْعَالَمِينَ
 *         root_word:
 *             type: string
 *             description: the root word
 *             example: س م و
 *         word_explanation:
 *             type: string
 *             description: the explanation of the word in the verse.
 *             example: this is the explanation for the word in the verse using the root word
 *         visible:
 *             type: boolean
 *             description: whether this explanation is visible
 *             example: true
 *         root_id:
 *             type: integer
 *             description: the id of the root word
 *             example: 1
 *         meaning:
 *             type: string
 *             description: the meaning of the root word
 *             example: A name.
 *         word_id:
 *             type: integer
 *             description: the id of the word
 *             example: 1
 * 
 */

/**
 *  @schema VerseInformation
 *  type: object
 *  required:
 *      - verse_index
 *      - surah
 *      - verse_number
 *      - verse_text
 *      - reflections
 *      - tafsirs
 *      - roots
 *  properties:
 *      verse_index:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      surah:
 *          type: integer
 *          description: the sura id/number that the verse belongs to
 *          example: 1
 *      verse_number:
 *          type: integer
 *          description: the aya number within the surah
 *          example: 1
 *      verse_text:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 *      reflections:
 *          type: array
 *          items:
 *              $ref: "#/definitions/Reflection"
 *          description: collection of reflections associated with a verse
 *      tafsirs:
 *          type: array
 *          description: collection of tafsirs for a verse from different mufasirs
 *          items:
 *              $ref: "#/definitions/Tafsir"
 *      words:
 *          type: array
 *          items:
 *              $ref: "#/definitions/VerseWordInformation"
 *
 */
async function getVerseInfo(data) {
    var invalid = validate.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let verse = await getVerse(data);
    if (!verse.success) {
        return verse;
    }
    let reflections = await getVerseReflections(data);
    let tafsirs = await getVerseTafsir(data);
    let words = await getVerseWordExplanations(data);
    return verseInfoResult(data, verse, reflections, tafsirs, words);
}

async function verseInfoResult(data, verse, reflections, tafsirs, words) {
    let validEnums = [0, 3];
    let success = false;
    let error, ecode;
    if (validEnums.includes(reflections.ecode)) {
        if (validEnums.includes(tafsirs.ecode)) {
            if (validEnums.includes(words.ecode)) {
                success = true;
                error = `Successfully fetched all information pertaining to verse with id ${data.verse_id}`;
                ecode = utils.Errors.NONE;
            } else {
                error = words.error;
                ecode = words.ecode;
            }
        } else {
            error = tafsirs.error;
            ecode = tafsirs.ecode;
        }
    } else {
        error = reflections.error;
        ecode = reflections.ecode;
    }
    let res = utils.setResult(
        {
            ...verse.data[0],
            reflections: reflections.data,
            tafsirs: tafsirs.data,
            words: words.data,
        },
        success,
        error,
        ecode
    );
    return res;
}

async function getVerse(data) {
    var invalid = validate.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Verse WHERE verse_index=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched verse reflections with verse id ${data.verse_id}.`,
            dbServer: `An error occured while trying to access reflections for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseReflections(data) {
    var invalid = validate.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Reflection WHERE verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched verse reflections with verse id ${data.verse_id}.`,
            dbServer: `An error occured while trying to access reflections for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseTafsir(data) {
    var invalid = validate.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "SELECT tafsir_id, tafsir_text, book, visible FROM Tafsir JOIN Verse ON Verse.verse_index=Tafsir.verse_id WHERE Tafsir.verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched verse tafsirs with verse id ${data.verse_id}.`,
            dbServer: `An error occured while trying to access tafsirs for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseWordExplanations(data) {
    var invalid = validate.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "SELECT word, vwar.root_id, word_explanation, visible, root_word, meaning, word_id \
         FROM (SELECT word, vwa.root_id, word_explanation, visible, root_word, word_id \
            FROM (SELECT word, root_id, word_explanation, visible, aw.word_id as word_id \
                FROM VerseWord as vw JOIN ArabicWord as aw ON aw.word_id = vw.word_id WHERE vw.verse_id = $1) as vwa \
                JOIN RootWord ON RootWord.root_id = vwa.root_id) as vwar JOIN RootMeaning ON RootMeaning.root_id = vwar.root_id";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched verse words and roots with verse id ${data.verse_id}.`,
            dbServer: `An error occured while trying to access word explanations for verse with id ${data.verse_id}`,
        })
    );
}

module.exports = {
    getVerseInfo,
    getVerseReflections,
    getVerseTafsir,
    getVerseWordExplanations,
};
