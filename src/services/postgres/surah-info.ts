import { Result } from "../../utils/constants";
import { retrieve, update, remove, create } from "."; // Assuming there's an index.ts file in the postgres directory
import validate from "../../utils/validation";
import { Messages } from "../../utils/constants";
import { SurahInfo } from "../../models/surah/surahInfo";

export async function getSurahInfo(
    data: SurahInfo
): Promise<Result<SurahInfo> | Result<any>> {
    if (data.surah !== undefined) {
        return await getSurahInfoBySurahID(data);
    }
    if (data.surahInfoId !== undefined) {
        return await getSurahInfoBySurahInfoID(data);
    }
    return Result.createDefault();
}

export async function getSurahInfoBySurahInfoID(
    data: SurahInfo
): Promise<Result<SurahInfo> | Result<any>> {
    const invalid = validate(data, {
        surahInfoId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    const sql = "SELECT * FROM SurahInfo WHERE surah_info_id=$1";
    const params = [data.surahInfoId!];
    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched surah info with id ${data.surahInfoId}.`,
        })
    );
}

export async function getSurahInfoBySurahID(data: SurahInfo): Promise<Result<SurahInfo> | Result<any>> {
    const invalid = validate(data, {
        surah: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    const sql = "SELECT * FROM SurahInfo WHERE surah=$1";
    const params = [data.surah!];
    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched surah info with id ${data.surah}.`,
        })
    );
}

export async function createSurahIntroInfo(data: SurahInfo): Promise<Result<SurahInfo> | Result<any>> {
    const invalid = validate(data, {
        surah: "integer",
        title: "string",
        info: "string",
    });
    if (!invalid.success) {
        return invalid;
    }
    const sql_surah_info =
        "INSERT INTO SurahInfo (surah, title, info) VALUES ($1, $2, $3) RETURNING *;";
    const params = [data.surah!, data.title!, data.info!];
    return await create(
        sql_surah_info,
        params,
        new Messages({
            success: "Successfully created a Surah Info.",
            foreign:
                "Invalid Surah. The surah must be valid and enabled first.",
        })
    );
}

export async function updateSurahIntroInfo(data: SurahInfo): Promise<Result<SurahInfo> | Result<any>> {
    const invalid = validate(data, {
        surahInfoId: "integer",
        surah: "integer",
        title: "string",
        info: "string",
    });
    if (!invalid.success) {
        return invalid;
    }
    const sql =
        "UPDATE SurahInfo SET surah=$2, title=$3, info=$4 WHERE surah_info_id=$1 RETURNING *;";
    const params = [data.surahInfoId!, data.surah!, data.title!, data.info!];
    return await update(
        sql,
        params,
        new Messages({
            success: `Successfully updated surah info with id ${data.surahInfoId}.`,
            dbNotFound: `Could not find a surah info with id ${data.surahInfoId}.`,
        })
    );
}

export async function deleteSurahIntroInfo(data: SurahInfo): Promise<Result<SurahInfo> | Result<any>> {
    const invalid = validate(data, {
        surahInfoId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    const sql = "DELETE FROM SurahInfo WHERE surah_info_id=$1 RETURNING *;";
    const params = [data.surahInfoId!];
    return await remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted surah info with id ${data.surahInfoId}.`,
            dbNotFound: `Could not find a surah info with id ${data.surahInfoId}.`,
        })
    );
}
