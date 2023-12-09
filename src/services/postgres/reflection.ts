import postgres from ".";
import validate from "../../utils/validation";
import { Messages } from "../../utils/constants";

interface ReflectionData {
    reflection_id?: number;
    verse_id: number;
    title: string;
    reflection: string;
    surah_id?: number;
}

async function createReflection(data: ReflectionData): Promise<any> {
    const invalid = validate(data, {
        verse_id: "integer",
        title: "string",
        reflection: "string",
    });

    if (invalid) {
        return invalid;
    }

    const sql_reflec =
        "INSERT INTO Reflection (verse_id, title, reflection) VALUES ($1, $2, $3) RETURNING *;";
    const params = [data.verse_id, data.title, data.reflection];

    return await postgres.create(
        sql_reflec,
        params,
        new Messages({ success: "Successfully created a reflection." })
    );
}

async function getAllReflections(): Promise<any> {
    const sql = "SELECT * FROM Reflection";
    return await postgres.retrieve(
        sql,
        [],
        new Messages({
            success: `Successfully fetched reflections.`,
        })
    );
}

/** Fetches Reflections based on a specific filter */
async function getReflectionById(data: ReflectionData): Promise<any> {
    const invalid = validate(data, {
        reflection_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql = "SELECT * FROM Reflection WHERE reflection_id=$1";
    const params = [data.reflection_id!];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched reflection with id ${data.reflection_id}.`,
        })
    );
}

async function getReflectionBySurahVerseId(data: ReflectionData): Promise<any> {
    const invalid = validate(data, {
        surah_id: "integer",
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql =
        "SELECT * FROM(SELECT reflection_id, verse_id, title, reflection FROM Reflection as r JOIN Verse as v on r.verse_id = v.verse_index) as rve JOIN Verse as v on rve.verse_id = v.verse_index WHERE surah = $1 and verse_id = $2;";
    const params = [data.surah_id!, data.verse_id!];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched reflection by verse id ${data.verse_id} and surah id ${data.surah_id}.`,
        })
    );
}

/** Update a reflection, requires all attributes of the reflection. */
async function updateReflection(data: ReflectionData): Promise<any> {
    const invalid = validate(data, {
        reflection_id: "integer",
        verse_id: "integer",
        title: "string",
        reflection: "string",
    });

    if (invalid) {
        return invalid;
    }

    const sql =
        "UPDATE Reflection SET title=$2, reflection=$3 WHERE reflection_id=$1 RETURNING *;";
    const params = [data.reflection_id!, data.title, data.reflection];

    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully update reflection with id ${data.reflection_id}.`,
            dbNotFound: `Could not find a reflection with id ${data.reflection_id}.`,
        })
    );
}

/** Delete a reflection, requires all attributes of the reflection. */
async function deleteReflection(data: ReflectionData): Promise<any> {
    const invalid = validate(data, {
        reflection_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql = "DELETE FROM Reflection WHERE reflection_id=$1 RETURNING *;";
    const params = [data.reflection_id!];

    return await postgres.remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted reflection with id ${data.reflection_id}.`,
            dbNotFound: `Could not find a reflection with id ${data.reflection_id}.`,
        })
    );
}

export default {
    getReflectionById,
    getReflectionBySurahVerseId,
    createReflection,
    updateReflection,
    deleteReflection,
    getAllReflections,
};
