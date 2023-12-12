import { retrieve, update, remove, create } from ".";
import validate from "../../utils/validation";
import { Messages } from "../../utils/constants";
import { Mufasir } from "../../models/tafsir/mufasir";

export async function getMufasir(data: Mufasir): Promise<any> {
    const invalid = validate(data, {
        mufasirId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql = "SELECT * FROM mufasir WHERE mufasir_id=$1;";
    const params = [data.mufasirId!];

    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched mufasir with ID ${data.mufasirId}.`,
        })
    );
}

export async function getMufasireen(): Promise<any> {
    const sql = "SELECT * FROM mufasir;";
    const params: any[] = [];

    return await retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched all mufasireen.`,
        })
    );
}

export async function addMufasir(data: Mufasir): Promise<any> {
    const invalid = validate(data, {
        mufasirName: "string",
        death: "string",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql =
        "INSERT INTO mufasir (mufasir_name, death) VALUES ($1, $2) RETURNING *;";
    const params = [data.mufasirName!, data.death!];

    return await create(
        sql,
        params,
        new Messages({
            success: `Successfully created mufasir.`,
        })
    );
}

export async function updateMufasir(data: Mufasir): Promise<any> {
    const invalid = validate(data, {
        mufasirId: "integer",
        mufasirName: "string",
        death: "string",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql =
        "UPDATE mufasir SET mufasir_name=$2, death=$3 WHERE mufasir_id=$1 RETURNING *;";
    const params = [data.mufasirId!, data.mufasirName!, data.death!];

    return await update(
        sql,
        params,
        new Messages({
            success: `Successfully updated mufasir with id ${data.mufasirId}.`,
        })
    );
}

export async function deleteMufasir(data: Mufasir): Promise<any> {
    const invalid = validate(data, {
        mufasirId: "integer",
    });

    if (!invalid.success) {
        return invalid;
    }

    const sql = "DELETE FROM mufasir WHERE mufasir_id=$1 RETURNING *;";
    const params = [data.mufasirId!];

    return await remove(
        sql,
        params,
        new Messages({
            success: `Successfully updated mufasir with id ${data.mufasirId}.`,
        })
    );
}
