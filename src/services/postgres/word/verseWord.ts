import { create, remove, retrieve, update } from "..";
import validate from "../../../utils/validation";
import { Messages, Result } from "../../../utils/constants";

/**
 *  @schema VerseWord
 *  type: object
 *  required:
 *      - verseWordId
 *      - wordId
 *      - verseId
 *      - visible
 *      - wordExplanation
 *  properties:
 *      verseWordId:
 *          type: integer
 *          description: the id of the arabic word being associated with the verse
 *          example: 1
 *      wordId:
 *          type: integer
 *          description: the id of the arabic word being associated with the verse
 *          example: 1
 *      verseId:
 *          type: integer
 *          description: the id of the verse that is being associated with the word
 *          example: 1
 *      visible:
 *          type: boolean
 *          description: whether the value is visible or not
 *          example: true
 *      wordExplanation:
 *          type: string
 *          description: The wordExplanation that is made for the word in the verse.
 *          example: The وَ in the word وَالْعَادِيَاتِ is for taking an oath. Thus we can look for the response to the oath in ayah 6.
 */

export async function linkVerseToWord(data: {
    verseId: number;
    wordId: number;
    wordExplanation: string;
    visible: boolean;
}) {
    var invalid: Result<any> = validate(data, {
        verseId: "integer",
        wordId: "integer",
        wordExplanation: "string",
        visible: "boolean",
    });
    if (!invalid.success) {
        return invalid;
    }
    var sql =
        "INSERT INTO verseWord (verse_id, word_id, word_explanation, visible) VALUES ($1, $2, $3, $4) RETURNING *;";
    var params = [
        data.verseId,
        data.wordId,
        data.wordExplanation,
        data.visible,
    ];
    return await create(
        sql,
        params,
        new Messages({
            success: `Successfully linked a verse with id ${data.verseId} to word with id ${data.wordId}.`,
        })
    );
}

export async function getVerseWordById(data: { verseWordId: number }) {
    var invalid: Result<any> = validate(data, {
        verseWordId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "SELECT * FROM verseWord WHERE verse_word_id=$1;";
    var params = [data.verseWordId];
    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched verse word with id ${data.verseWordId}.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
export async function updateVerseWord(data: {
    verseWordId: number;
    verseId: number;
    wordId: number;
    wordExplanation: string;
    visible: boolean;
}) {
    var invalid: Result<any> = validate(data, {
        verseWordId: "integer",
        verseId: "integer",
        wordId: "integer",
        wordExplanation: "string",
        visible: "boolean",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql =
        "UPDATE VerseWord SET verse_id=$2, word_id=$3, word_explanation=$4, visible=$5 WHERE verse_word_id=$1 RETURNING *;";
    var params = [
        data.verseWordId,
        data.verseId,
        data.wordId,
        data.wordExplanation,
        data.visible,
    ];
    return await update(
        sql,
        params,
        new Messages({
            success: `Successfully update VerseWord with id ${data.verseWordId}.`,
            dbNotFound: `Could not find a VerseWord with id ${data.verseWordId}.`,
        })
    );
}

/** Update a rootWord, requires all attributes of the rootWord. */
export async function deleteVerseWord(data: { verseWordId: number }) {
    var invalid: Result<any> = validate(data, {
        verseWordId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "DELETE FROM verseWord WHERE verse_word_id=$1 RETURNING *;";
    var params = [data.verseWordId];
    return await remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted VerseWord with id ${data.verseWordId}.`,
            dbNotFound: `Could not find a VerseWord with id ${data.verseWordId}.`,
        })
    );
}

export default {
    linkVerseToWord,
    getVerseWordById,
    updateVerseWord,
    deleteVerseWord,
};
