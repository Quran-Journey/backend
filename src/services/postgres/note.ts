import { create, update, remove, retrieve, paginate, getOperator } from ".";
import validate from "../../utils/validation";
import { Result, Messages, Errors } from "../../utils/constants";
import { Note } from "../../models/note/note";

// Note: this list contains key value pairs of the attribute and types within the schema.
// FIXME: replace with model attribute references
const attributes: { [key: string]: string } = {
    fileName: "string",
    fileSize: "integer",
    url: "string",
    dateModified: "date",
};

/** Fetches note based on fileName */
export async function getNoteByName(data: {
    fileName: string;
}): Promise<Result<Note>> {
    return { data: [new Note("", 12, "", "")], success: false, msg: "", code: Errors.NONE };
}

export async function createNote(data: Note): Promise<Result<Note>> {
    return { data: [new Note("", 12, "", "")], success: false, msg: "", code: Errors.NONE };
}

/** Update a Note, requires all attributes of the note. */
export async function updateNote(data: {
    fileName: string;
    fileSize: number;
    url: string;
    dateModified: string;
}): Promise<Result<Note>> {
    return { data: [new Note("", 12, "", "")], success: false, msg: "", code: Errors.NONE };
}

/** Delete a note, requires only fileName. */
export async function deleteNote(data: {
    fileName: string;
}): Promise<Result<Note>> {
    return { data: [new Note("", 12, "", "")], success: false, msg: "", code: Errors.NONE };
}
