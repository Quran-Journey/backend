import validate from "../../../utils/validation";
import { Messages } from "../../../utils/constants";
import { create, remove, retrieve, update } from "..";

/**
 * @schema ArabicWord
 * type: object
 * required:
 *   - wordId
 *   - rootId
 *   - word
 * properties:
 *   wordId:
 *     type: integer
 *     description: the id of the arabic word
 *     example: 1
 *   rootId:
 *     type: integer
 *     description: the id of the root word associated with the arabic word
 *     example: 936
 *   word:
 *     type: string
 *     description: string representation of the word.
 *     example: بِسْمِ
 */

export async function createRootWord(data: { rootWord: string }) {
  // Frontend note: also add a feature where we guess that the
  //  rootWord's date is the next Saturday after the last rootWord's date
  const invalid = validate(data, {
    rootWord: "string",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql = "INSERT INTO rootWord (root_word) VALUES ($1) RETURNING *;";
  const params = [data.rootWord];

  return await create(
    sql,
    params,
    new Messages({ success: "Successfully created a rootWord." })
  );
}

export async function getRootWordById(data: { rootId: number }) {
  const invalid = validate(data, {
    rootId: "integer",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql = "SELECT * FROM rootWord WHERE root_id=$1";
  const params = [data.rootId];

  return await retrieve(
    sql,
    params,
    new Messages({
      success: `Successfully fetched rootWord with id ${data.rootId}.`,
    })
  );
}

/** Fetches rootWords based on a specific filter (i.e. id, date) */
export async function getAllRootWords() {
  const sql = "SELECT * FROM rootWord;";
  const params: any[] = [];

  return await retrieve(
    sql,
    params,
    new Messages({
      success: `Successfully fetched all root words.`,
    })
  );
}

/** Update a rootWord, requires all attributes of the rootWord. */
export async function updateRootWord(data: { rootId: number; rootWord: string }) {
  const invalid = validate(data, {
    rootId: "integer",
    rootWord: "string",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql = "UPDATE rootWord SET root_word=$2 WHERE root_id=$1";
  const params = [data.rootId, data.rootWord];

  return await update(
    sql,
    params,
    new Messages({
      success: `Successfully update rootWord with id ${data.rootId}.`,
      dbNotFound: `Could not find a rootWord with id ${data.rootId}.`,
    })
  );
}

/** Update a rootWord, requires all attributes of the rootWord. */
export async function deleteRootWord(data: { rootId: number }) {
  const invalid = validate(data, {
    rootId: "integer",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql = "DELETE FROM rootWord WHERE root_id=$1 RETURNING *;";
  const params = [data.rootId];

  return await remove(
    sql,
    params,
    new Messages({
      success: `Successfully deleted rootWord with id ${data.rootId}.`,
      dbNotFound: `Could not find a rootWord with id ${data.rootId}.`,
    })
  );
}

export async function getVerseRootWords(data: { verseId: number }) {
  const invalid = validate(data, {
    verseId: "integer",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql =
    "SELECT * FROM (SELECT verse_id, aw.word_id, word, root_id FROM VerseWord as vw JOIN ArabicWord as aw on aw.word_id=vw.wordId WHERE verse_id=$1) as vtaw JOIN RootWord as rt ON rt.root_id=vtaw.root_id;";
  const params = [data.verseId];

  return await retrieve(
    sql,
    params,
    new Messages({
      success: `Successfully fetched roots for verse with id ${data.verseId}.`,
    })
  );
}

