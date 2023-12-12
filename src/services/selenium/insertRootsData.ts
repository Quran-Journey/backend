import connect from "../postgres/connect";
import fs from "fs";
import { Errors, Result } from "../../utils/constants";
const db = connect.db;
/* 
NOTE: Only needs to be executed when db is being initialized.
INSTRUCTIONS: 
1. copy .env file into services/selenium directory (if not there)
2. the usual docker stuff (run code inside db directory)
    a. 'docker-compose up'
3. make sure to run insert_data.py (give it some time)
    a. 'python3 insert_data.py'
    b. this insures DB is populated 
4. run this file
    a. 'node insertRootsData.js'
    b. you should see roots_data.json created 
*/

export async function retrieve(relationName: string, message:any = "defaultMsg"): Promise<Result<any>> {
    console.log("-- retrieve function is being executed -- ");
    let sql = "";
    const params: never[] = [];

    switch (relationName) {
        case 'RootWords':
            sql = "SELECT * FROM RootWord;";
            break;
        case 'ArabicWord':
            sql = "SELECT * FROM ArabicWord;";
            break;
        case 'VerseWord':
            sql = "SELECT * FROM VerseWord;";
            break;
        default:
            console.log("Error relation name doesn't exist");
    }

    try {
        const result = await db.query(sql, params);

        if (result.rows[0] == null) {
            return new Result({ data: [], success: false, msg: message.none, code: Errors.DB_DNE });
        }

        return new Result({
            data: result.rows,
            success: true,
            msg: "Successfully fetched rows.\n",
            code: Errors.NONE,
        });
    } catch (e) {
        console.log("\nERROR!\n", e);
        return new Result({
            data: [],
            success: false,
            msg: "An error occurred in the PSQL server.",
            code: Errors.DB_SERVER,
        });
    }
}

export async function main(): Promise<void> {
    let data = {
        RootWords: [] as any[],
        ArabicWord: [] as any[],
        VerseWord: [] as any[],
    };

    await retrieve("RootWords").then(async function (result) {
        data["RootWords"] = result.data;
    });

    await retrieve("ArabicWord").then(async function (result) {
        data["ArabicWord"] = result.data;
    });

    await retrieve("VerseWord").then(async function (result) {
        data["VerseWord"] = result.data;
    });

    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFile('./roots_data.json', jsonString, (err) => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
}

main();
