import postgres from ".";
import validate from "../../utils/validation";
import { Messages } from "../../utils/constants";

// Note: this list contains key value pairs of the attribute and types within the schema.
interface SurahAttributes {
    surah_id: number;
    surah_number: number;
    name_complex: string;
    name_arabic: string;
}

/** Fetches a surah and its verses by surah id */
async function getSurahById(data: { surah_id: number }): Promise<any> {
    var invalid = validate(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Surah WHERE surah_id=$1";
    var params = [data.surah_id];
    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched Surah with id ${data.surah_id}.`,
            dbNotFound: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

/** Update a Surah, requires all attributes of the Surah. */
async function updateSurah(data: SurahAttributes): Promise<any> {
    var invalid = validate(data, {
        surah_id: "integer",
        surah_number: "integer",
        name_complex: "string",
        name_arabic: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "UPDATE Surah SET surah_number=$2, name_complex=$3, name_arabic=$4 WHERE surah_id=$1";
    var params = [
        data.surah_id,
        data.surah_number,
        data.name_complex,
        data.name_arabic,
    ];
    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully update Surah with id ${data.surah_id}.`,
            dbNotFound: `Could not find a Surah with id ${data.surah_id}.`,
        })
    );
}

async function getSurahs(): Promise<any> {
    let sql = "SELECT * FROM surah;";
    return await postgres.retrieve(
        sql,
        [],
        new Messages({
            success: `Successfully fetched all surahs.`,
        })
    );
}

async function getSurahVerses(data: { surah_id: number }): Promise<any> {
    var invalid = validate(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Verse WHERE surah=$1";
    var params = [data.surah_id];
    let verses = await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verses for sura number ${data.surah_id}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a:any, b:any) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

async function getSurahLessons(data: { surah_id: number }): Promise<any> {
    var invalid = validate(data, {
        surah_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE surah_id=$1";
    var params = [data.surah_id];
    let verses = await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verses for sura number ${data.surah_id}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a:any, b:any) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

export default {
    getSurahById,
    updateSurah,
    getSurahVerses,
    getSurahLessons,
    getSurahs,
};
