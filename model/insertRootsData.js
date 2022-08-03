const db = require("./db");
const fs = require("fs");
require("dotenv");
const { setResult, errorEnum } = require("./utils");

/* 
NOTE: Only needs to be executed when db is being initialized.
INSTRUCTIONS: 
1. copy .env file into models directory (if not there)
2. the usual docker stuff (run code inside db directory)
    a. 'docker-compose up'
3. make sure to run insert_data.py (give it some time)
    a. 'python3 insert_data.py'
    b. this insures DB is populated 
4. run this file
    a. 'node insertRootsData.js'
    b. you should see roots_data.json created 
*/

async function retrieve(relation_name, message = "defaultMsg") {
    console.log(
        "-- retrieve function is being executed -- "
    );
    let sql = "";
    const params = [];

    switch (relation_name) {
        case 'RootWords':
            sql = "SELECT * FROM RootWord;"
            break;
        case 'ArabicWord':
            sql = "SELECT * FROM ArabicWord;"
            break;
        case 'TextToWord':
            sql = "SELECT * FROM TextToWord;"
            break;
        default:
            console.log("Error relation name doesnt exist")
    }

    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                return setResult([], false, message.none, errorEnum.DNE);
            }
            return setResult(
                result.rows,
                true,
                "Successfully fetched rows.\n",
                errorEnum.NONE
            );
        })
        .catch((e) => {
            console.log("\nERROR!\n", e);
            return setResult([], false, "An error occured in the PSQL server.", errorEnum.SERVER);
        });
}

async function main() {
    let data = {
        RootWords: [],
        ArabicWord: [],
        TextToWord: []
    };

    await retrieve("RootWords").then(async function (result) {
        data["RootWords"] = result.data;
    });
    await retrieve("ArabicWord").then(async function (result) {
        data["ArabicWord"] = result.data;
    });
    await retrieve("TextToWord").then(async function (result) {
        data["TextToWord"] = result.data;
    });


    const jsonString = JSON.stringify(data, null, 2)
    fs.writeFile('./roots_data.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}



main();