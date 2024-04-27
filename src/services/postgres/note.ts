import { create, update, remove, retrieve, paginate, getOperator } from ".";
import validate from "../../utils/validation";
import { Result, Messages, Errors } from "../../utils/constants";
import { Note } from "../../models/note/note";

// Note: this list contains key value pairs of the attribute and types within the schema.
// FIXME: replace with model attribute references
const attributes: { [key: string]: string } = {
    fileId: "integer",
    fileName: "string",
    fileSize: "integer",
    url: "string",
    dateModified: "date",
};

export async function getNotes(): Promise<Result<Note>> {
    let sql = "SELECT * FROM Note";
    var note: Result<Note> = await retrieve(
        sql,
        [],
        new Messages({
            success: `Successfully fetched Note all notes.`,
        })
    );
    return note;
}

export async function getNoteById(data: {
    fileId: string;
}): Promise<Result<Note>> {
    const invalid: Result<any> = validate(data, {
        fileName: "integer"
    })
    if (!invalid.success) {
        return invalid;
    }
    let sql = "SELECT * FROM Note WHERE file_id=$1";
    var params = [data.fileId!];
    var note: Result<Note> = await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched Note with id ${data.fileId}.`,
        })
    );
    return note;
}

export async function createNote(data: Note): Promise<Result<Note>> {
    const invalid: Result<any> = validate(data, {
        fileName: "string",
        fileSize: "integer",
        url: "string",
        dateModified: "string",
    });
    if (!invalid.success) {
        return invalid;
    }
    var sql =
        "INSERT INTO Note (file_name, file_size, url, date_modified) VALUES ($1, $2, $3, $4) RETURNING *;";
    var params = [
        data.fileName!,
        data.fileSize!,
        data.url!,
        data.dateModified!,
    ];
    var note: Result<Note> = await create(
        sql,
        params,
        new Messages({ success: "Successfully created a Note." })
    );
    return note;
}

/** Update a Note, requires all attributes of the note. */
export async function updateNote(data: {
    fileId: number;
    fileName: string;
    fileSize: number;
    url: string;
    dateModified: string;
}): Promise<Result<Note>> {
    const invalid: Result<any> = validate(data, {
        fileId: "integer",
        fileName: "string",
        fileSize: "integer",
        url: "string",
        dateModified: "date",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql =
        "UPDATE Note SET file_name=$2 file_source=$3, url=$4, date_modified=$5 WHERE file_id=$1";
    var params = [
        data.fileId,
        data.fileName,
        data.fileSize,
        data.url,
        data.dateModified,
    ];
    var note: Result<Note> = await update(
        sql,
        params,
        new Messages({
            success: `Successfully updated note with id ${data.fileName}.`,
            dbNotFound: `Could not find a note with id ${data.fileName}.`,
        })
    );
    return note;
}

/** Delete a note, requires only fileName. */
export async function deleteNote(data: {
    fileId: string;
}): Promise<Result<Note>> {
    const invalid: Result<any> = validate(data, {
        fileId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }
    let sql = "DELETE FROM Note WHERE file_id=$1 RETURNING *;";
    var params = [data.fileId];
    var note: Result<Note> = await remove(
        sql,
        params,
        new Messages({
            success: `Successfully deleted note with file id ${data.fileId}.`,
            dbNotFound: `Could not find a note with file id ${data.fileId}.`,
        })
    );
    return note;
}
