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
 *      roots:
 *          type: array
 *          description: collection of root words for words in a verse
 *          items:
 *            schema:
 *              $ref: "#/definitions/Reflection"
 *  
 */
async function getAllVerseInfo(data) {
    let verseInfo = {}
    let failed = false
    await getVerseReflections(data).then(async function (result) {
        if (!result.success) {
            verseInfo.success = result.success
            verseInfo.error = result.error
            verseInfo.ecode = result.ecode
            failed = true
        }
        verseInfo = { data: { reflections: result.data } };
    })

    await getVerseTafsir(data).then(async function (result) {
        if (!result.success) {
            verseInfo.success = result.success
            verseInfo.error = result.error
            verseInfo.ecode = result.ecode
            failed = true
        }
        verseInfo.data.tafsirs = result.data
    })

    await getVerseRootWords(data).then(async function (result) {
        if (!result.success) {
            verseInfo.success = result.success
            verseInfo.error = result.error
            verseInfo.ecode = result.ecode
            failed = true
        }
        verseInfo.data.roots = result.data
    })

    if (!failed) {
        verseInfo.success = true
        verseInfo.error = "Successfully fetched complete verse info"
        verseInfo.ecode = 0
    }
    return verseInfo;
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
    let sql = "SELECT * FROM Tafsir JOIN Verse ON Verse.verse_index=Tafsir.verse_id WHERE Tafsir.verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse tafsirs with verse id ${data.verse_id}.`,
        })
    );
}

async function getVerseWordExpls(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM VerseWord WHERE verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse words with verse id ${data.verse_id}.`,
        })
    );
}

async function getVerseRootWords(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT word,vwar.root_id,verse_id,word_explaination,visible,root_word,meaning,word_id FROM (SELECT word,vwa.root_id,verse_id,word_explaination,visible,root_word,word_id FROM (SELECT word,root_id,verse_id,word_explaination,visible,aw.word_id as word_id FROM VerseWord as vw JOIN ArabicWord as aw ON aw.word_id = vw.word_id WHERE vw.verse_id = $1) as vwa JOIN RootWord ON RootWord.root_id = vwa.root_id) as vwar JOIN RootMeaning ON RootMeaning.root_id = vwar.root_id";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse words and roots with verse id ${data.verse_id}.`,
        })
    );
}

module.exports = {
    getAllVerseInfo: getAllVerseInfo,
    getVerseReflections: getVerseReflections,
    getVerseTafsir: getVerseTafsir,
    getVerseWordExpls: getVerseWordExpls,
    getVerseRootWords: getVerseRootWords,
}

