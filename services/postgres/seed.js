const faker = require("faker");
const moment = require("moment");

/**
 * In this seeded database there is:
 * - 2 lessons
 */
const seedData = {
    Surah: [
        {
            surah_id: 1,
            surah_number: 1,
            name_complex: "Al-Fātiĥah",
            name_arabic: "الفاتحة",
        },
        {
            surah_id: 2,
            surah_number: 2,
            name_complex: "The cow",
            name_arabic: "",
        },
    ],
    Lesson: [
        {
            lesson_id: 1,
            surah_id: 1,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            start_verse: 1,
            end_verse: 3,
            source: "youtube.com/url_to_video",
        },
        {
            lesson_id: 2,
            surah_id: 1,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            start_verse: 1,
            end_verse: 2,
            source: "facebook.com/url_to_video",
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
            verse_number: 1,
            verse_text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
        },
        {
            verse_index: 2,
            surah: 1,
            verse_number: 2,
            verse_text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        },
        {
            verse_index: 3,
            surah: 1,
            verse_number: 3,
            verse_text: "الرَّحْمَـٰنِ الرَّحِيمِ",
        },
    ],
    Reflection: [
        {
            reflection_id: 1,
            verse_id: 1,
            title: "Bismillah",
            reflection: "My First Reflection",
        },
        {
            reflection_id: 2,
            verse_id: 1,
            title: "Inshallah",
            reflection: "My Second Reflection",
        },
        {
            reflection_id: 3,
            verse_id: 2,
            title: "Allahu Akbar",
            reflection: "Inshallah my last reflection!",
        },
        {
            reflection_id: 4,
            verse_id: 3,
            title: "Subhanallah",
            reflection: "Allah SWT is the most most merciful",
        },
    ],
    RootWord: [
        {
            root_id: 1,
            root_word: "س م و",
        },
        {
            root_id: 2,
            root_word: "ر ح م",
        },
        {
            root_id: 3,
            root_word: "ح م د",
        },
    ],
    RootMeaning: [
        {
            meaning_id: 1,
            root_id: 1,
            meaning: "to be high",
        },
        {
            meaning_id: 2,
            root_id: 1,
            meaning: "raised",
        },
        {
            meaning_id: 3,
            root_id: 3,
            meaning: "To praise",
        },
    ],
    ArabicWord: [
        {
            word_id: 1,
            word: "بِسْمِ",
            root_id: 1,
        },
        {
            word_id: 2,
            word: "الرَّحِيمِ",
            root_id: 2,
        },
        {
            word_id: 3,
            word: "الْحَمْدُ",
            root_id: 3,
        },
    ],
    VerseWord: [
        {
            verse_word_id: 1,
            verse_id: 1,
            word_id: 1,
            visible: false,
            word_explanation: "An explanation of the basmalla goes here.",
        },
        {
            verse_word_id: 2,
            verse_id: 2,
            word_id: 3,
            visible: true,
            word_explanation: "All Praise is for Allah",
        },
        {
            verse_word_id: 3,
            verse_id: 3,
            word_id: 3,
            visible: true,
            word_explanation: "Name of Allah",
        },
    ],
    Mufasir: [
        {
            mufasir_id: 1,
            mufasir_name: "Ibn Kathir",
            death: "774 H",
        },
    ],
    Book: [
        {
            book_id: 1,
            author: 1,
            title: "Tafsir Ibn Kathir",
        },
    ],
    Tafsir: [
        {
            tafsir_id: 1,
            tafsir_text:
                "In the name of Allah, The Most Gracious, The Most Merciful",
            book: 1,
            verse_id: 1,
            visible: false,
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
async function seedDatabase(db, isDev) {
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
    if (!isDev) await db.end();
    console.log("Database setup complete.");
}

module.exports = {
    seedDatabase: seedDatabase,
    seedData: seedData,
};
