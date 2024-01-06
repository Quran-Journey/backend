import { retrieve, update } from ".";
import validate from "../../utils/validation";
import { Messages, Result } from "../../utils/constants";

// Note: this list contains key value pairs of the attribute and types within the schema.
interface SurahAttributes {
    surahId: number;
    surahNumber: number;
    nameComplex: string;
    nameArabic: string;
}

/** Fetches a surah and its verses by surah id */
export async function getSurahById(data: { surahId: number }): Promise<any> {
    var invalid: Result<any> = validate(data, {
        surahId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "SELECT * FROM Surah WHERE surah_id=$1";
    var params = [data.surahId];
    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched Surah with id ${data.surahId}.`,
            dbNotFound: `Could not find a Surah with id ${data.surahId}.`,
        })
    );
}

/** Update a Surah, requires all attributes of the Surah. */
export async function updateSurah(data: SurahAttributes): Promise<any> {
    var invalid: Result<any> = validate(data, {
        surahId: "integer",
        surahNumber: "integer",
        nameComplex: "string",
        nameArabic: "string",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql =
        "UPDATE Surah SET surah_number=$2, name_complex=$3, name_arabic=$4 WHERE surah_id=$1";
    var params = [
        data.surahId,
        data.surahNumber,
        data.nameComplex,
        data.nameArabic,
    ];
    return await update(
        sql,
        params,
        new Messages({
            success: `Successfully update Surah with id ${data.surahId}.`,
            dbNotFound: `Could not find a Surah with id ${data.surahId}.`,
        })
    );
}

export async function getSurahs(): Promise<any> {
    let sql = "SELECT * FROM surah;";
    return await retrieve(
        sql,
        [],
        new Messages({
            success: `Successfully fetched all surahs.`,
        })
    );
}

export async function getSurahVerses(data: { surahId: number }): Promise<any> {
    var invalid: Result<any> = validate(data, {
        surahId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "SELECT * FROM Verse WHERE surah=$1";
    var params = [data.surahId];
    let verses = await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verses for sura number ${data.surahId}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a:any, b:any) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

export async function getSurahLessons(data: { surahId: number }): Promise<any> {
    var invalid: Result<any> = validate(data, {
        surahId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE surah_id=$1";
    var params = [data.surahId];
    let verses = await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verses for sura number ${data.surahId}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a:any, b:any) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}
