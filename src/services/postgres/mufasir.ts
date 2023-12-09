import postgres from ".";
import validate from "../../utils/validation";
import { Messages } from "../../utils/constants";

interface MufasirData {
    mufasir_id?: number;
    mufasir_name?: string;
    death?: string;
}

async function getMufasir(data: MufasirData): Promise<any> {
    const invalid = validate(data, {
        mufasir_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql = "SELECT * FROM mufasir WHERE mufasir_id=$1;";
    const params = [data.mufasir_id!];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched mufasir with ID ${data.mufasir_id}.`,
        })
    );
}

async function getMufasireen(): Promise<any> {
    const sql = "SELECT * FROM mufasir;";
    const params: any[] = [];

    return await postgres.retrieve(
        sql,
        params,
        new Messages({
            success: `Successfully fetched all mufasireen.`,
        })
    );
}

async function addMufasir(data: MufasirData): Promise<any> {
    const invalid = validate(data, {
        mufasir_name: "string",
        death: "string",
    });

    if (invalid) {
        return invalid;
    }

    const sql =
        "INSERT INTO mufasir (mufasir_name, death) VALUES ($1, $2) RETURNING *;";
    const params = [data.mufasir_name!, data.death!];

    return await postgres.create(
        sql,
        params,
        new Messages({
            success: `Successfully created mufasir.`,
        })
    );
}

async function updateMufasir(data: MufasirData): Promise<any> {
    const invalid = validate(data, {
        mufasir_id: "integer",
        mufasir_name: "string",
        death: "string",
    });

    if (invalid) {
        return invalid;
    }

    const sql =
        "UPDATE mufasir SET mufasir_name=$2, death=$3 WHERE mufasir_id=$1 RETURNING *;";
    const params = [data.mufasir_id!, data.mufasir_name!, data.death!];

    return await postgres.update(
        sql,
        params,
        new Messages({
            success: `Successfully updated mufasir with id ${data.mufasir_id}.`,
        })
    );
}

async function deleteMufasir(data: MufasirData): Promise<any> {
    const invalid = validate(data, {
        mufasir_id: "integer",
    });

    if (invalid) {
        return invalid;
    }

    const sql = "DELETE FROM mufasir WHERE mufasir_id=$1 RETURNING *;";
    const params = [data.mufasir_id!];

    return await postgres.remove(
        sql,
        params,
        new Messages({
            success: `Successfully updated mufasir with id ${data.mufasir_id}.`,
        })
    );
}

export default {
    getMufasireen,
    getMufasir,
    addMufasir,
    updateMufasir,
    deleteMufasir,
};
