import { retrieve, update, remove, create } from ".";
import validate from "../../utils/validation";
import { Messages, Result } from "../../utils/constants";
import { Tafsir } from "../../models/tafsir/tafsir";

export async function getTafsirById(data: Tafsir): Promise<any> {
    var invalid: Result<any> = validate(data, {
        tafsirId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }

    let sql = "SELECT * FROM Tafsir WHERE tafsir_id=$1;";
    let params = [data.tafsirId!];
    return await retrieve(
        sql,
        params,
        new Messages({ success: "Successfully fetched a tafsir." })
    );
}

export async function createTafsir(data: Tafsir): Promise<any> {
    var invalid: Result<any> = validate(data, {
        tafsirId: "integer",
        tafsirText: "string",
        book: "integer",
        verseId: "integer",
        visible: "boolean",
    });
    if (!invalid.success) {
        return invalid;
    }

    let sql =
        "INSERT INTO Tafsir (tafsir_id,tafsir_text,book,verse_id,visible) VALUES ($1,$2,$3,$4,$5) RETURNING *;";
    let params = [
        data.tafsirId!,
        data.tafsirText!,
        data.book!,
        data.verseId!,
        data.visible!,
    ];
    return await create(
        sql,
        params,
        new Messages({ success: "Successfully created a tafsir." })
    );
}

export async function updateTafsir(data: Tafsir): Promise<any> {
    var invalid: Result<any> = validate(data, {
        tafsirId: "integer",
        tafsirText: "string",
        book: "integer",
        verseId: "integer",
        visible: "boolean",
    });
    if (!invalid.success) {
        return invalid;
    }

    let sql =
        "UPDATE Tafsir SET tafsir_text=$2, book=$3, verse_id=$4, visible=$5 WHERE tafsir_id=$1 RETURNING*;";
    let params = [
        data.tafsirId!,
        data.tafsirText!,
        data.book!,
        data.verseId!,
        data.visible!,
    ];
    return await update(
        sql,
        params,
        new Messages({ success: "Successfully updated a tafsir." })
    );
}

export async function deleteTafsir(data: Tafsir): Promise<any> {
    var invalid: Result<any> = validate(data, {
        tafsirId: "integer",
    });
    if (!invalid.success) {
        return invalid;
    }

    let sql = "DELETE FROM Tafsir WHERE tafsir_id=$1 RETURNING *;";
    let params = [data.tafsirId!];
    return await remove(
        sql,
        params,
        new Messages({ success: "Successfully deleted a tafsir." })
    );
}
