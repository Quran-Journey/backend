const faker = require("faker");
const moment = require("moment");

/**
 * In this seeded database there is:
 * - 2 lessons
 */
const seedData = {
    Lesson: [
        {
            lesson_id: 1,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "youtube.com/url_to_video",
        },
        {
            lesson_id: 2,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "facebook.com/url_to_video",
        },
    ],
    Surah: [
        {
            surah_id: 1,
            surah_number: 1,
            revelation_place: "Makkah",
            name_complex: "Al-Fātiĥah",
            name_arabic: "الفاتحة",
            verse_count: 7,
        },
    ],
    SurahInfo: [
        {
            surah_info_id: 1,
            surah: 1,
            title: "The Opener",
            info: "Al-Fātiĥah consists of 7 ayah which are a prayer for guidance and mercy",
        },
    ],
    Verse: [
        {
            verse_index: 1,
            surah: 1,
        },
    ],
    VerseExplanation: [
        {
            verse_explanation_id: 1,
            verse_id: 1,
        },
    ],
    Reflection: [
        {
            reflection_id: 1,
            verse_explanation_id: 1,
            title: "Bismillah",
            reflection: "My First Reflection",
        },
    ],
    Mufasir: [
        {
            mufasir_id: 1,
            mufasir_name: "Ibn Kathir",
            death: "774 H",
        },
    ],
    RootWord: [
        {
            root_id: 1,
            root_word: "س م و",
        },
    ],
};

/**
 * Before we start testing, we should wipe the database clean.
 */
async function clearDatabase(db) {
    tables = Object.keys(seedData);
    tables.forEach(async (table) => {
        sql = `Delete from ${table} *`;
        await db
            .query(sql, [])
            .then((result) => {
                return result.rows;
            })
            .catch((e) => {
                console.log("\n!Deletion error!\n", e);
            });
    });
}

function prepareTableSQL(table) {
    let rows = seedData[table];
    let columns = Object.keys(rows[0]);
    let columns_string = "(";
    for (var i = 0; i < columns.length; i++) {
        columns_string = columns_string + `${columns[i]}, `;
    }
    columns_string =
        columns_string.substring(0, columns_string.length - 2) + ") values (";
    for (var i = 0; i < columns.length; i++) {
        columns_string = columns_string + `\$${i + 1}, `;
    }
    columns_string =
        columns_string.substring(0, columns_string.length - 2) + ")";
    let sql = `insert into ${table} ${columns_string}`;
    rowValues = [];
    for (var row = 0; row < rows.length; row++) {
        rowValues.push(Object.values(rows[row]));
    }
    return [sql, rowValues];
}

/**
 * This is where we actually put all of the mock data above into the database
 */
async function seedDatabase(db) {
    await clearDatabase(db);
    let tables = Object.keys(seedData);
    let table;
    for (let t = 0; t < tables.length; t++) {
        table = tables[t];
        let ret = prepareTableSQL(table);
        let sql = ret[0];
        let rows = ret[1];
        for (var row = 0; row < rows.length; row++) {
            await db
                .query(sql, rows[row])
                .then((result) => {
                    return result.rows;
                })
                .catch((e) => {
                    console.log("\nInsertion error!\n", e);
                    console.log(sql, rows[row]);
                });
        }
        // Here we're just reseting the sequence for each table because
        // our manual inserts caused them to get out of sync
        let primary_key = Object.keys(seedData[table][0])[0];
        sql = `SELECT setval(pg_get_serial_sequence('${table}', '${primary_key}'), (SELECT MAX(${primary_key}) FROM ${table})+1);`;
        await db
            .query(sql, rows[row])
            .then((result) => {
                return result.rows;
            })
            .catch((e) => {
                console.log("\nInsertion error!\n", e);
                console.log(sql, rows[row]);
            });
    }
    await db.end();
}

module.exports = {
    seedDatabase: seedDatabase,
    seedData: seedData,
};
