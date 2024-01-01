import { retrieve } from ".";
import validate from "../../utils/validation";
import { Result, Messages, Errors } from "../../utils/constants";
import { Verse } from "../../models/verse/verse";
import { Reflection } from "../../models/reflection/reflection";
import { Tafsir } from "../../models/tafsir/tafsir";
import { VerseWord } from "../../models/verse/verseWord";
import { RootWord } from "../../models/word/rootWord";
import { ArabicWord } from "../../models/word/arabicWord";
import { RootMeaning } from "../../models/word/rootMeaning";
import { VerseWordExplanations } from "../../models/word";
import { VerseInformation } from "../../models/verse/verseInformation";

export async function getVerseInfo(data: {
    verseId: number;
}): Promise<Result<VerseInformation>> {
    var verse: Result<Verse> = await getVerse(data);
    var reflections: Result<Reflection> = Result.createDefault();
    var tafsirs: Result<Tafsir> = Result.createDefault();
    var words: Result<VerseWordExplanations> = Result.createDefault();

    if (!verse.success) {
        console.log("Verse fetch unsuccessful.");
        console.log("Verse:");
        console.log(verse);
        return verseInfoResult(data, verse, reflections, tafsirs, words);
    }

    reflections = await getVerseReflections(data);
    tafsirs = await getVerseTafsir(data);
    words = await getVerseWordExplanations(data);

    return verseInfoResult(data, verse, reflections, tafsirs, words);
}

export async function verseInfoResult(
    data: { verseId: number },
    verse: Result<Verse>,
    reflections: Result<Reflection>,
    tafsirs: Result<Tafsir>,
    words: Result<VerseWordExplanations>
) {
    const validEnums = [Errors.NONE, Errors.DB_DNE];
    let success = false;
    let msg, code;

    if (validEnums.includes(reflections.code)) {
        if (validEnums.includes(tafsirs.code)) {
            if (validEnums.includes(words.code)) {
                success = true;
                msg = `Successfully fetched all information pertaining to verse with id ${data.verseId}`;
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
        data: [
            new VerseInformation(
                verse.data[0],
                reflections.data,
                tafsirs.data,
                words.data
            ),
        ],
        success: success,
        msg: msg,
        code: code,
    });

    return res;
}

export async function getVerse(data: Reflection): Promise<Result<Verse>> {
    const sql = "SELECT * FROM Verse WHERE verse_index=$1";
    const params = [data.verseId!];

    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse with verse id ${data.verseId}.`,
            dbServer: `An error occurred while trying to access reflections for verse with id ${data.verseId}`,
        })
    );
}

export async function getVerseReflections(
    data: Reflection
): Promise<Result<Reflection>> {
    const invalid = validate(data, {
        verseId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql = "SELECT * FROM Reflection WHERE verse_id=$1";
    const params = [data.verseId!];

    var reflections: Result<Reflection> = await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse reflections with verse id ${data.verseId}.`,
            dbServer: `An error occurred while trying to access reflections for verse with id ${data.verseId}`,
        })
    );
    return reflections;
}

export async function getVerseTafsir(
    data: Reflection
): Promise<Result<Tafsir & Verse>> {
    const invalid = validate(data, {
        verseId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql =
        "SELECT tafsir_id, tafsir_text, book, visible FROM Tafsir JOIN Verse ON Verse.verse_index=Tafsir.verse_id WHERE Tafsir.verse_id=$1";
    const params = [data.verseId!];

    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse tafsirs with verse id ${data.verseId}.`,
            dbServer: `An error occurred while trying to access tafsirs for verse with id ${data.verseId}`,
        })
    );
}

export async function getVerseWordExplanations(
    data: Reflection
): Promise<Result<VerseWordExplanations>> {
    const invalid = validate(data, {
        verseId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql =
        "SELECT word, vwar.root_id, word_explanation, visible, root_word, meaning, word_id \
         FROM (SELECT word, vwa.root_id, word_explanation, visible, root_word, word_id \
            FROM (SELECT word, root_id, word_explanation, visible, aw.word_id as word_id \
                FROM VerseWord as vw JOIN ArabicWord as aw ON aw.word_id = vw.word_id WHERE vw.verse_id = $1) as vwa \
                JOIN RootWord ON RootWord.root_id = vwa.root_id) as vwar JOIN RootMeaning ON RootMeaning.root_id = vwar.root_id";
    const params = [data.verseId!];

    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse words and roots with verse id ${data.verseId}.`,
            dbServer: `An error occurred while trying to access word explanations for verse with id ${data.verseId}`,
        })
    );
}
