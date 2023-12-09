import postgres from "../index";
import validate from "../../../utils/validation";
import { Result, Messages } from "../../../utils/constants";
import {getVerseRootWords} from "./root";

/**
 * @schema RootMeaning
 * type: object
 * required:
 *   - meaning_id
 *   - root_id
 *   - meaning
 * properties:
 *   meaning_id:
 *     type: integer
 *     description: the id of the meaning
 *     example: 1
 *   root_id:
 *     type: integer
 *     description: the id of the root word
 *     example: 936
 *   meaning:
 *     type: string
 *     description: The meaning.
 *     example: A name
 */

// To be used when adding the different meanings to the sentences.
async function getRootWordMeanings(data: { root_id: number,verse_id:number }) {
  const invalid = validate(data, {
    root_id: "integer",
  });

  if (invalid) {
    return invalid;
  }

  const sql = "SELECT * FROM RootMeaning WHERE root_id=$1;";
  const params = [data.root_id];

  return await postgres.retrieve(
    sql,
    params,
    new Messages({
      success: `Successfully fetched roots for verse with id ${data.verse_id}.`,
    })
  );
}

async function getVerseRootWordsSentences(data: { verse_id: number }) {
  const all_roots = await getVerseRootWords(data);
  let msg = all_roots.msg;
  let root, word, rootmeanings, sentence;

  if (all_roots.success) {
    for (const item of all_roots.data) {
      root = item.root_word;
      word = item.word;
      rootmeanings = await stringifyMeanings(item);

      if (rootmeanings.length === 0) {
        sentence = `The word ${word} comes from the root ${root}.`;
      } else {
        sentence = `The word ${word} comes from the root ${root} and is associated with the meanings: ${rootmeanings}.`;
      }

      item.sentence = sentence;
    }

    msg = `Successfully retrieved sentences for each word in verse with id ${data.verse_id}`;
  }

  return new Result({
    data: all_roots.data,
    success: all_roots.success,
    msg: msg,
    code: all_roots.code,
  });
}

async function stringifyMeanings(root: any) {
  const meanings = await getRootWordMeanings(root);
  let meaningsString = "";

  for (const meaning of meanings.data) {
    meaningsString
      ? (meaningsString = `${meaningsString}, ${meaning.meaning}`)
      : (meaningsString = `${meaning.meaning}`);
  }

  return meaningsString;
}

async function getMeaning(data: { meaning_id: number }) {
  const invalid = validate(data, {
    meaning_id: "integer",
  });

  if (invalid) {
    return invalid;
  }

  const sql = "SELECT * FROM RootMeaning WHERE meaning_id=$1;";
  const params = [data.meaning_id];

  return await postgres.retrieve(
    sql,
    params,
    new Messages({
      success: `Successfully fetched a meaning with id ${data.meaning_id}.`,
      dbNotFound: `Could not find root meaning with id ${data.meaning_id}.`,
    })
  );
}

async function addMeaning(data: { root_id: number; meaning: string }) {
  const invalid = validate(data, {
    root_id: "integer",
    meaning: "string",
  });

  if (invalid) {
    return invalid;
  }

  const sql =
    "INSERT INTO RootMeaning (root_id, meaning) VALUES ($1, $2) RETURNING *;";
  const params = [data.root_id, data.meaning];

  return await postgres.create(
    sql,
    params,
    new Messages({
      success: `Successfully added a meaning to root word with id ${data.root_id}.`,
    })
  );
}

async function editMeaning(data: { meaning_id: number; root_id: number; meaning: string }) {
  const invalid = validate(data, {
    meaning_id: "integer",
    root_id: "integer",
    meaning: "string",
  });

  if (invalid) {
    return invalid;
  }

  const sql =
    "UPDATE RootMeaning SET meaning=$2, root_id=$3 WHERE meaning_id=$1 RETURNING *;";
  const params = [data.meaning_id, data.meaning, data.root_id];

  return await postgres.update(
    sql,
    params,
    new Messages({
      success: `Successfully edited meaning with id ${data.meaning_id}.`,
      dbNotFound: `Could not find a meaning with id ${data.meaning_id}.`,
    })
  );
}

async function deleteMeaning(data: { meaning_id: number }) {
  const invalid = validate(data, {
    meaning_id: "integer",
  });

  if (invalid) {
    return invalid;
  }

  const sql = "DELETE FROM RootMeaning WHERE meaning_id=$1 RETURNING *;";
  const params = [data.meaning_id];

  return await postgres.remove(
    sql,
    params,
    new Messages({
      success: `Successfully deleted meaning with id ${data.meaning_id}.`,
      dbNotFound: `Could not find meaning with id ${data.meaning_id}.`,
    })
  );
}

export {
  getVerseRootWordsSentences,
  getMeaning,
  addMeaning,
  editMeaning,
  deleteMeaning,
};
