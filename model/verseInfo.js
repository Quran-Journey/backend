const { parseHttpResponse } = require("selenium-webdriver/http");
const utils = require("./utils");

//main request handler 
async function getAllVerseInfo(data) {
    /*NOTE 
    each method returns this => { data: d, success: pass, error: msg, ecode: code }
    this method returns this =>
    {data: {reflections: r, tafsir: t, wordexpl: we }, success: pass, error: msg, ecode:code}
    */
    let verseInfo = {}
    await getVerseReflections(data).then(async function (result) {
        verseInfo = { data: { reflections: result.data }, success: result.success, error: result.msg, ecode: result.code };
    })

    await getVerseTafsir(data).then(async function (result) {
        verseInfo = { data: { tafsir: result.data }, success: result.success, error: result.msg, ecode: result.code }
    })

    await getVerseRootWords(data).then(async function (result) {
        verseInfo = { data: { roots: result.data }, success: result.success, error: result.msg, ecode: result.code }
    })

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
    let sql = "SELECT * FROM Tafsir as t JOIN Verse as v WHERE v.verse_id=t.verse_id AND t.verse_id=$1";
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
    let sql = "SELECT * FROM (SELECT * FROM verseWord as vw JOIN ArabicWord as aw WHERE aw.word_id=vw.word_id AND vw.word_id=$1) as TEMP1 INNER JOIN (SELECT * FROM RootWord NATURAL JOIN RootMeaning) as TEMP2 WHERE TEMP1.root_id = TEMP2.root_id;";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse words and roots with verse id ${data.verse_id}.`,
        })
    );
}
//TEMP1
//SELECT * FROM verseWord as vw JOIN ArabicWord as aw WHERE aw.word_id=vw.word_id AND vw.word_id=$1

//TEMP2
//SELECT * FROM RootWord NATURAL JOIN RootMeaning 

//SELECT * FROM TEMP1 JOIN TEMP2 WHERE TEMP1.root_id = TEMP2.root_id  

module.exports = {
    getAllVerseInfo: getAllVerseInfo,
    getVerseReflections: getVerseReflections,
    getVerseTafsir: getVerseTafsir,
    getVerseWordExpls: getVerseWordExpls,
    getVerseRootWords: getVerseRootWords,
}