import { create, remove, retrieve, update } from "..";
import validate from "../../../utils/validation";
import { Result, Messages } from "../../../utils/constants";
import {getVerseRootWords} from "./root";

/**
 * @schema RootMeaning
 * type: object
 * required:
 *   - meaningId
 *   - rootId
 *   - meaning
 * properties:
 *   meaningId:
 *     type: integer
 *     description: the id of the meaning
 *     example: 1
 *   rootId:
 *     type: integer
 *     description: the id of the root word
 *     example: 936
 *   meaning:
 *     type: string
 *     description: The meaning.
 *     example: A name
 */

// To be used when adding the different meanings to the sentences.
export async function getRootWordMeanings(data: { rootId: number,verseId:number }) {
  const invalid = validate(data, {
    rootId: "integer",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql = "SELECT * FROM RootMeaning WHERE root_id=$1;";
  const params = [data.rootId];

  return await retrieve(
    sql,
    params,
    new Messages({
      success: `Successfully fetched roots for verse with id ${data.verseId}.`,
    })
  );
}

export async function getVerseRootWordsSentences(data: { verseId: number }) {
  const all_roots = await getVerseRootWords(data);
  let msg = all_roots.msg;
  let root, word, rootmeanings, sentence;

  if (all_roots.success) {
    for (const item of all_roots.data) {
      root = item.rootWord;
      word = item.word;
      rootmeanings = await stringifyMeanings(item);

      if (rootmeanings.length === 0) {
        sentence = `The word ${word} comes from the root ${root}.`;
      } else {
        sentence = `The word ${word} comes from the root ${root} and is associated with the meanings: ${rootmeanings}.`;
      }

      item.sentence = sentence;
    }

    msg = `Successfully retrieved sentences for each word in verse with id ${data.verseId}`;
  }

  return new Result({
    data: all_roots.data,
    success: all_roots.success,
    msg: msg,
    code: all_roots.code,
  });
}

export async function stringifyMeanings(root: any) {
  const meanings = await getRootWordMeanings(root);
  let meaningsString = "";

  for (const meaning of meanings.data) {
    meaningsString
      ? (meaningsString = `${meaningsString}, ${meaning.meaning}`)
      : (meaningsString = `${meaning.meaning}`);
  }

  return meaningsString;
}

export async function getMeaning(data: { meaningId: number }) {
  const invalid = validate(data, {
    meaningId: "integer",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql = "SELECT * FROM RootMeaning WHERE meaning_id=$1;";
  const params = [data.meaningId];

  return await retrieve(
    sql,
    params,
    new Messages({
      success: `Successfully fetched a meaning with id ${data.meaningId}.`,
      dbNotFound: `Could not find root meaning with id ${data.meaningId}.`,
    })
  );
}

export async function addMeaning(data: { rootId: number; meaning: string }) {
  const invalid = validate(data, {
    rootId: "integer",
    meaning: "string",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql =
    "INSERT INTO RootMeaning (root_id, meaning) VALUES ($1, $2) RETURNING *;";
  const params = [data.rootId, data.meaning];

  return await create(
    sql,
    params,
    new Messages({
      success: `Successfully added a meaning to root word with id ${data.rootId}.`,
    })
  );
}

export async function editMeaning(data: { meaningId: number; rootId: number; meaning: string }) {
  const invalid = validate(data, {
    meaningId: "integer",
    rootId: "integer",
    meaning: "string",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql =
    "UPDATE RootMeaning SET meaning=$2, root_id=$3 WHERE meaning_id=$1 RETURNING *;";
  const params = [data.meaningId, data.meaning, data.rootId];

  return await update(
    sql,
    params,
    new Messages({
      success: `Successfully edited meaning with id ${data.meaningId}.`,
      dbNotFound: `Could not find a meaning with id ${data.meaningId}.`,
    })
  );
}

export async function deleteMeaning(data: { meaningId: number }) {
  const invalid = validate(data, {
    meaningId: "integer",
  });

  if (!invalid.success) {
    return invalid;
  }

  const sql = "DELETE FROM RootMeaning WHERE meaning_id=$1 RETURNING *;";
  const params = [data.meaningId];

  return await remove(
    sql,
    params,
    new Messages({
      success: `Successfully deleted meaning with id ${data.meaningId}.`,
      dbNotFound: `Could not find meaning with id ${data.meaningId}.`,
    })
  );
}
