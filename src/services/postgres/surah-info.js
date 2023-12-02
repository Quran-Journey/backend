const postgres = require(".");
const validate = require("../../utils/validation");
const { Messages, Result } = require("../../utils/constants");


async function getSurahInfo(data) {
    if (data.surah != undefined) {
        return await getSurahInfoBySurahID(data);
    }
    if (data.surah_info_id != undefined) {
        return await getSurahInfoBySurahInfoID(data);
    }
    return new Result({});
}

async function getSurahInfoBySurahInfoID(data) {
    var invalid = validate(data, {
        surah_info_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM SurahInfo WHERE surah_info_id=$1";
    var params = [data.surah_info_id];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched surah info with id ${data.surah_info_id}.`,
        })
    );
}
async function getSurahInfoBySurahID(data) {
    var invalid = validate(data, {
        surah: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM SurahInfo WHERE surah=$1";
    var params = [data.surah];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched surah info with id ${data.surah}.`,
        })
    );
}

async function createSurahIntroInfo(data) {
    var invalid = validate(data, {
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
    return await postgres.create(
        sql_surah_info,
        params,
        new Messages({
            success: "Successfully created a Surah Info.",
            foreign:
                "Invalid Surah. The surah must be valid and enabled first.",
        })
    );
}

async function updateSurahIntroInfo(data) {
    var invalid = validate(data, {
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
    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully updated surah info with id ${data.surah_info_id}.`,
            dbNotFound: `Could not find a surah info with id ${data.surah_info_id}.`,
        })
    );
}

async function deleteSurahIntroInfo(data) {
    var invalid = validate(data, {
        surah_info_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM SurahInfo WHERE surah_info_id=$1 RETURNING *;";
    var params = [data.surah_info_id];
    return await postgres.remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted surah info with id ${data.surah_info_id}.`,
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
