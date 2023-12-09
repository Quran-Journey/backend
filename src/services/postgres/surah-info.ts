import { Result } from "../../utils/constants";
import postgres from "."; // Assuming there's an index.ts file in the postgres directory
import validate from "../../utils/validation";
import { Messages } from "../../utils/constants";

interface SurahInfoData {
    surah_info_id?: number;
    surah?: number;
    title?: string;
    info?: string;
}

async function getSurahInfo(data: SurahInfoData): Promise<Result> {
    if (data.surah !== undefined) {
        return await getSurahInfoBySurahID(data);
    }
    if (data.surah_info_id !== undefined) {
        return await getSurahInfoBySurahInfoID(data);
    }
    return new Result({});
}

async function getSurahInfoBySurahInfoID(data: SurahInfoData): Promise<Result> {
    const invalid = validate(data, {
        surah_info_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    const sql = "SELECT * FROM SurahInfo WHERE surah_info_id=$1";
    const params = [data.surah_info_id!];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched surah info with id ${data.surah_info_id}.`,
        })
    );
}

async function getSurahInfoBySurahID(data: SurahInfoData): Promise<Result> {
    const invalid = validate(data, {
        surah: "integer",
    });
    if (invalid) {
        return invalid;
    }
    const sql = "SELECT * FROM SurahInfo WHERE surah=$1";
    const params = [data.surah!];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched surah info with id ${data.surah}.`,
        })
    );
}

async function createSurahIntroInfo(data: SurahInfoData): Promise<Result> {
    const invalid = validate(data, {
        surah: "integer",
        title: "string",
        info: "string",
    });
    if (invalid) {
        return invalid;
    }
    const sql_surah_info =
        "INSERT INTO SurahInfo (surah, title, info) VALUES ($1, $2, $3) RETURNING *;";
    const params = [data.surah!, data.title!, data.info!];
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

async function updateSurahIntroInfo(data: SurahInfoData): Promise<Result> {
    const invalid = validate(data, {
        surah_info_id: "integer",
        surah: "integer",
        title: "string",
        info: "string",
    });
    if (invalid) {
        return invalid;
    }
    const sql =
        "UPDATE SurahInfo SET surah=$2, title=$3, info=$4 WHERE surah_info_id=$1 RETURNING *;";
    const params = [data.surah_info_id!, data.surah!, data.title!, data.info!];
    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully updated surah info with id ${data.surah_info_id}.`,
            dbNotFound: `Could not find a surah info with id ${data.surah_info_id}.`,
        })
    );
}

async function deleteSurahIntroInfo(data: SurahInfoData): Promise<Result> {
    const invalid = validate(data, {
        surah_info_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    const sql = "DELETE FROM SurahInfo WHERE surah_info_id=$1 RETURNING *;";
    const params = [data.surah_info_id!];
    return await postgres.remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted surah info with id ${data.surah_info_id}.`,
            dbNotFound: `Could not find a surah info with id ${data.surah_info_id}.`,
        })
    );
}

export default {
    getSurahInfo,
    getSurahInfoBySurahInfoID,
    getSurahInfoBySurahID,
    createSurahIntroInfo,
    updateSurahIntroInfo,
    deleteSurahIntroInfo,
};
