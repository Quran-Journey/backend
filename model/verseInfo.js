const utils = require("./utils");

/**
 *  @schema VerseInformation
 *  type: object
 *  required:
 *      - reflections
 *      - tafsirs
 *      - roots
 *  properties:
 *      reflections:
 *          type: array
 *          items:
 *            schema:
 *              $ref: "#/definitions/Reflection"
 *          description: collection of reflections associated with a verse
 *      tafsirs:
 *          type: array
 *          description: collection of tafsirs for a verse from different mufasirs
 *          example: [{}]
 *      words:
 *          type: array
 *          description: collection of root words for words in a verse
 *          items:
 *            schema:
 *              $ref: "#/definitions/verseWordExplanation"
 *
 */
async function getVerseInfo(data) {
    var invalid = utils.simpleValidation(data, {
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
                ecode = utils.errorEnum.NONE;
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
            verse: verse.data,
            reflections: reflections.data,
            tafsirs: tafsirs.data,
            words: words.data,
        },
        success,
        error,
        ecode
    );
    console.log(res);
    return res;
}

async function getVerse(data) {
    var invalid = utils.simpleValidation(data, {
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
        new utils.Message({
            success: `Successfully fetched verse reflections with verse id ${data.verse_id}.`,
            server: `An error occured while trying to access reflections for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseReflections(data) {
    var invalid = utils.simpleValidation(data, {
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
        new utils.Message({
            success: `Successfully fetched verse reflections with verse id ${data.verse_id}.`,
            server: `An error occured while trying to access reflections for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseTafsir(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "SELECT * FROM Tafsir JOIN Verse ON Verse.verse_index=Tafsir.verse_id WHERE Tafsir.verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse tafsirs with verse id ${data.verse_id}.`,
            server: `An error occured while trying to access tafsirs for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseWordExplanations(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "SELECT word, vwar.root_id, word_explaination, visible, root_word, meaning, word_id \
         FROM (SELECT word, vwa.root_id, word_explaination, visible, root_word, word_id \
            FROM (SELECT word, root_id, word_explaination, visible, aw.word_id as word_id \
                FROM VerseWord as vw JOIN ArabicWord as aw ON aw.word_id = vw.word_id WHERE vw.verse_id = $1) as vwa \
                JOIN RootWord ON RootWord.root_id = vwa.root_id) as vwar JOIN RootMeaning ON RootMeaning.root_id = vwar.root_id";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse words and roots with verse id ${data.verse_id}.`,
            server: `An error occured while trying to access word explanations for verse with id ${data.verse_id}`,
        })
    );
}

module.exports = {
    getVerseInfo,
    getVerseReflections,
    getVerseTafsir,
    getVerseWordExplanations,
};
