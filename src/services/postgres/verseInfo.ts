import { Request, Response } from 'express';
import postgres from '.'; // Update the import path as needed
import validate from '../../utils/validation';
import { Result, Messages, Errors } from '../../utils/constants';

/**
 * @schema VerseWordInformation
 * ... (The schema remains the same)
 */

/**
 * @schema VerseInformation
 * ... (The schema remains the same)
 */

interface MeaningParams {
    verse_id: number;
}

async function getVerseInfo(data: MeaningParams) {
    const invalid = validate(data, {
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const verse = await getVerse(data);

    if (!verse.success) {
        return verse;
    }

    const reflections = await getVerseReflections(data);
    const tafsirs = await getVerseTafsir(data);
    const words = await getVerseWordExplanations(data);

    return verseInfoResult(data, verse, reflections, tafsirs, words);
}

async function verseInfoResult(data: MeaningParams, verse: Result, reflections: Result, tafsirs: Result, words: Result) {
    const validEnums = [Errors.NONE, Errors.DB_DNE];
    let success = false;
    let msg, code;

    if (validEnums.includes(reflections.code)) {
        if (validEnums.includes(tafsirs.code)) {
            if (validEnums.includes(words.code)) {
                success = true;
                msg = `Successfully fetched all information pertaining to verse with id ${data.verse_id}`;
                code = Errors.NONE;
            } else {
                msg = words.msg;
                code = words.code;
            }
        } else {
            msg = tafsirs.msg;
            code = tafsirs.code;
        }
    } else {
        msg = reflections.msg;
        code = reflections.code;
    }

    const res = new Result({
        data: {
            ...verse.data[0],
            reflections: reflections.data,
            tafsirs: tafsirs.data,
            words: words.data,
        },
        success: success,
        msg: msg,
        code: code,
    });

    return res;
}

async function getVerse(data: MeaningParams) {
    const invalid = validate(data, {
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql = "SELECT * FROM Verse WHERE verse_index=$1";
    const params = [data.verse_id];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse reflections with verse id ${data.verse_id}.`,
            dbServer: `An error occurred while trying to access reflections for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseReflections(data: MeaningParams) {
    const invalid = validate(data, {
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql = "SELECT * FROM Reflection WHERE verse_id=$1";
    const params = [data.verse_id];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse reflections with verse id ${data.verse_id}.`,
            dbServer: `An error occurred while trying to access reflections for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseTafsir(data: MeaningParams) {
    const invalid = validate(data, {
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql =
        "SELECT tafsir_id, tafsir_text, book, visible FROM Tafsir JOIN Verse ON Verse.verse_index=Tafsir.verse_id WHERE Tafsir.verse_id=$1";
    const params = [data.verse_id];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse tafsirs with verse id ${data.verse_id}.`,
            dbServer: `An error occurred while trying to access tafsirs for verse with id ${data.verse_id}`,
        })
    );
}

async function getVerseWordExplanations(data: MeaningParams) {
    const invalid = validate(data, {
        verse_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql =
        "SELECT word, vwar.root_id, word_explanation, visible, root_word, meaning, word_id \
         FROM (SELECT word, vwa.root_id, word_explanation, visible, root_word, word_id \
            FROM (SELECT word, root_id, word_explanation, visible, aw.word_id as word_id \
                FROM VerseWord as vw JOIN ArabicWord as aw ON aw.word_id = vw.word_id WHERE vw.verse_id = $1) as vwa \
                JOIN RootWord ON RootWord.root_id = vwa.root_id) as vwar JOIN RootMeaning ON RootMeaning.root_id = vwar.root_id";
    const params = [data.verse_id];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse words and roots with verse id ${data.verse_id}.`,
            dbServer: `An error occurred while trying to access word explanations for verse with id ${data.verse_id}`,
        })
    );
}

export default {
    getVerseInfo,
    getVerseReflections,
    getVerseTafsir,
    getVerseWordExplanations,
};
