import { retrieve, update, remove, create } from ".";
import validate from "../../utils/validation";
import { Messages } from "../../utils/constants";
import { Reflection } from "../../models/reflection/reflection";
import { Surah } from "../../models/surah/surah";

export async function createReflection(data: Reflection): Promise<any> {
    const invalid = validate(data, {
        verseId: "integer",
        title: "string",
        reflection: "string",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql_reflec =
        "INSERT INTO Reflection (verse_id, title, reflection) VALUES ($1, $2, $3) RETURNING *;";
    const params = [data.verseId!, data.title!, data.reflection!];

    return await create(
        sql_reflec,
        params,
        new Messages({ success: "Successfully created a reflection." })
    );
}

export async function getAllReflections(): Promise<any> {
    const sql = "SELECT * FROM Reflection";
    return await retrieve(
        sql,
        [],
        new Messages({
            success: `Successfully fetched reflections.`,
        })
    );
}

/** Fetches Reflections based on a specific filter */
export async function getReflectionById(data: Reflection): Promise<any> {
    const invalid = validate(data, {
        reflectionId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql = "SELECT * FROM Reflection WHERE reflection_id=$1";
    const params = [data.reflectionId!];

    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched reflection with id ${data.reflectionId}.`,
        })
    );
}

export async function getReflectionBySurahVerseId(
    data: Reflection & Surah
): Promise<any> {
    const invalid = validate(data, {
        surahId: "integer",
        verseId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql =
        "SELECT * FROM(SELECT reflection_id, verse_id, title, reflection FROM Reflection as r JOIN Verse as v on r.verse_id = v.verse_index) as rve JOIN Verse as v on rve.verse_id = v.verse_index WHERE surah = $1 and verse_id = $2;";
    const params = [data.surahId!, data.verseId!];

    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched reflection by verse id ${data.verseId} and surah id ${data.surahId}.`,
        })
    );
}

/** Update a reflection, requires all attributes of the reflection. */
export async function updateReflection(data: Reflection): Promise<any> {
    const invalid = validate(data, {
        reflectionId: "integer",
        verseId: "integer",
        title: "string",
        reflection: "string",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql =
        "UPDATE Reflection SET title=$2, reflection=$3 WHERE reflection_id=$1 RETURNING *;";
    const params = [data.reflectionId!, data.title!, data.reflection!];

    return await update(
        sql,
        params,
        new Messages({
            success: `Successfully update reflection with id ${data.reflectionId}.`,
            dbNotFound: `Could not find a reflection with id ${data.reflectionId}.`,
        })
    );
}

/** Delete a reflection, requires all attributes of the reflection. */
export async function deleteReflection(data: Reflection): Promise<any> {
    const invalid = validate(data, {
        reflectionId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql = "DELETE FROM Reflection WHERE reflection_id=$1 RETURNING *;";
    const params = [data.reflectionId!];

    return await remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted reflection with id ${data.reflectionId}.`,
            dbNotFound: `Could not find a reflection with id ${data.reflectionId}.`,
        })
    );
}
