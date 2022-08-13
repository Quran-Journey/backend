const utils = require("./utils");

/**
 *  @schema Chapter
 *  type: object
 *  required:
 *      - sura_number
 *      - sura_name
 *  properties:
 *      sura_number:
 *          type: integer
 *          description: the number of the surah (acting as the surah id)
 *          example: 1
 *      sura_name:
 *          type: string
 *          description: the name of the surah
 *          example: al-Fātihah
 */
async function getChapters(data) {
    let sql = "SELECT * FROM suras";
    return await utils.retrieve(
        sql,
        [],
        new utils.Message({
            success: `Successfully fetched all suras.`,
        })
    );
}

/**
 *  @schema Verse
 *  type: object
 *  required:
 *      - index
 *      - sura
 *      - aya
 *      - text
 *  properties:
 *      index:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      sura:
 *          type: integer
 *          description: the sura id/number that the verse belongs to
 *          example: 1
 *      aya:
 *          type: integer
 *          description: the aya number within the surah
 *          example: 1
 *      text:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 */
async function getChapterVerses(data) {
    var invalid = utils.simpleValidation(data, {
        sura_number: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM quran_text WHERE sura=$1";
    var params = [data.sura_number];
    let verses = await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verses for sura number ${data.sura_number}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a, b) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

module.exports = {
    getChapterVerses,
    getChapters,
};
