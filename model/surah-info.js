const utils = require("./utils");
/**
 *  @schema SurahInfo
 *  type: object
 *  required:
 *      - surah_info_id
 *      - surah
 *      - title
 *      - info
 *  properties:
 *      surah_info_id:
 *          type: integer
 *          description: to uniquely identify the surah info from others
 *          example: 1
 *      surah:
 *          type: integer
 *          description: to identify the surah that the surah info is refering to
 *          example: 23
 *      title:
 *          type: string
 *          description: a title to the surah info section
 *          example: "Opening of The Quran"
 *      info:
 *          type: string
 *          description: information regarding the surah  
 *          example: "This surah was..."
 */
async function getSurahIntroInfo(data) {
    var invalid = utils.simpleValidation(data, {
        surah_info_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM SurahInfo WHERE surah_info_id=$1";
    var params = [data.surah_info_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched surah info with id ${data.surah_info_id}.`,
        })
    );
}

async function createSurahIntroInfo(data) {
    var invalid = utils.simpleValidation(data, {
        surah: "integer",
        title: "string",
        info: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql_surah_info =
        "INSERT INTO SurahInfo (surah, title, info) VALUES ($1, $2, $3) RETURNING *;";
    var params = [data.surah, data.title, data.info];
    var sql_surah =
        "INSERT INTO Surah (surah_id,surah_number,revelation_place,verse_count) VALUES ($1, $2, $3, $4) RETURNING *;";
    await utils.create(sql_surah, [1, 1, "Makkah", 7])
    return await utils.create(
        sql_surah_info,
        params,
        new utils.Message({ success: "Successfully created a Surah Info." })
    );
}

async function updateSurahIntroInfo(data) {
    var invalid = utils.simpleValidation(data, {
        surah_info_id: "integer",
        surah: "integer",
        title: "string",
        info: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE SurahInfo SET surah=$2, title=$3, info=$4 WHERE surah_info_id=$1 RETURNING *;";
    var params = [data.surah_info_id, data.surah, data.title, data.info];
    return await utils.update(
        sql,
        params,
        new utils.Message({
            success: `Successfully updated surah info with id ${data.surah_info_id}.`,
            none: `Could not find a surah info with id ${data.surah_info_id}.`,
        })
    );
}

async function deleteSurahIntroInfo(data) {
    var invalid = utils.simpleValidation(data, {
        surah_info_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM SurahInfo WHERE surah_info_id=$1 RETURNING *;";
    var params = [data.surah_info_id];
    return await utils.remove(
        sql,
        params,
        new utils.Message({
            success: `Successfully deleted surah info with id ${data.surah_info_id}.`,
            none: `Could not find a surah info with id ${data.surah_info_id}.`,
        })
    );
}


module.exports = {
    getSurahIntroInfo: getSurahIntroInfo,
    createSurahIntroInfo: createSurahIntroInfo,
    updateSurahIntroInfo: updateSurahIntroInfo,
    deleteSurahIntroInfo: deleteSurahIntroInfo,
};
