const utils = require("./utils");
const constants = require("../../utils/constants");

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
async function getSurahInfo(data) {
    let result;
    if (data.surah != undefined) {
        result = await getSurahInfoBySurahID(data);
    }
    if (data.surah_info_id != undefined) {
        result = await getSurahInfoBySurahInfoID(data);
    }
    return result;
}

async function getSurahInfoBySurahInfoID(data) {
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
        new constants.Messages({
            dbSuccess: `Successfully fetched surah info with id ${data.surah_info_id}.`,
        })
    );
}
async function getSurahInfoBySurahID(data) {
    var invalid = utils.simpleValidation(data, {
        surah: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM SurahInfo WHERE surah=$1";
    var params = [data.surah];
    return await utils.retrieve(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully fetched surah info with id ${data.surah}.`,
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
    return await utils.create(
        sql_surah_info,
        params,
        new constants.Messages({
            success: "Successfully created a Surah Info.",
            foreign:
                "Invalid Surah. The surah must be valid and enabled first.",
        })
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
    let sql =
        "UPDATE SurahInfo SET surah=$2, title=$3, info=$4 WHERE surah_info_id=$1 RETURNING *;";
    var params = [data.surah_info_id, data.surah, data.title, data.info];
    return await utils.update(
        sql,
        params,
        new constants.Messages({
            dbSuccess: `Successfully updated surah info with id ${data.surah_info_id}.`,
            dbNotFound: `Could not find a surah info with id ${data.surah_info_id}.`,
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
        new constants.Messages({
            dbSuccess: `Successfully deleted surah info with id ${data.surah_info_id}.`,
            dbNotFound: `Could not find a surah info with id ${data.surah_info_id}.`,
        })
    );
}

module.exports = {
    getSurahInfo: getSurahInfo,
    getSurahInfoBySurahInfoID: getSurahInfoBySurahInfoID,
    getSurahInfoBySurahID: getSurahInfoBySurahID,
    createSurahIntroInfo: createSurahIntroInfo,
    updateSurahIntroInfo: updateSurahIntroInfo,
    deleteSurahIntroInfo: deleteSurahIntroInfo,
};
