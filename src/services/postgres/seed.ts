import moment from 'moment';
import lodash from "lodash";

/**
 * In this seeded database there is:
 * - 2 lessons
 * new Date() is just for fake 
 */
export const seedData:ISeedData = {
    Surah: [
        {
            "surahId": 1,
            "surahNumber": 1,
            "nameComplex": "Al-Fātiĥah",
            "nameArabic": "الفاتحة",
        },
        {
            "surahId": 2,
            "surahNumber": 2,
            "nameComplex": "The cow",
            "nameArabic": "",
        },
    ],
    Lesson: [
        {
            "lessonId": 1,
            "surahId": 1,
            "lessonDate": moment(new Date()).format("YYYY-MM-DD"),
            "startVerse": 1,
            "endVerse": 3,
            "source": "youtube.com/url_to_video",
        },
        {
            "lessonId": 2,
            "surahId": 1,
            "lessonDate": moment(new Date()).format("YYYY-MM-DD"),
            "startVerse": 1,
            "endVerse": 2,
            "source": "facebook.com/url_to_video",
        },
    ],
    SurahInfo: [
        {
            "surahInfoId": 1,
            "surah": 1,
            "title": "The Opener",
            "info": "Al-Fātiĥah consists of 7 ayah which are a prayer for guidance and mercy",
        },
    ],
    Verse: [
        {
            "verseIndex": 1,
            "surah": 1,
            "verseNumber": 1,
            "verseText": "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
        },
        {
            "verseIndex": 2,
            "surah": 1,
            "verseNumber": 2,
            "verseText": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        },
        {
            "verseIndex": 3,
            "surah": 1,
            "verseNumber": 3,
            "verseText": "الرَّحْمَـٰنِ الرَّحِيمِ",
        },
    ],
    Reflection: [
        {
            "reflectionId": 1,
            "verseId": 1,
            "title": "Bismillah",
            "reflection": "My First Reflection",
        },
        {
            "reflectionId": 2,
            "verseId": 1,
            "title": "Inshallah",
            "reflection": "My Second Reflection",
        },
        {
            "reflectionId": 3,
            "verseId": 2,
            "title": "Allahu Akbar",
            "reflection": "Inshallah my last reflection!",
        },
        {
            "reflectionId": 4,
            "verseId": 3,
            "title": "Subhanallah",
            "reflection": "Allah SWT is the most most merciful",
        },
    ],
    RootWord: [
        {
            "rootId": 1,
            "rootWord": "س م و",
        },
        {
            "rootId": 2,
            "rootWord": "ر ح م",
        },
        {
            "rootId": 3,
            "rootWord": "ح م د",
        },
    ],
    RootMeaning: [
        {
            "meaningId": 1,
            "rootId": 1,
            "meaning": "to be high",
        },
        {
            "meaningId": 2,
            "rootId": 1,
            "meaning": "raised",
        },
        {
            "meaningId": 3,
            "rootId": 3,
            "meaning": "To praise",
        },
    ],
    ArabicWord: [
        {
            "wordId": 1,
            "word": "بِسْمِ",
            "rootId": 1,
        },
        {
            "wordId": 2,
            "word": "الرَّحِيمِ",
            "rootId": 2,
        },
        {
            "wordId": 3,
            "word": "الْحَمْدُ",
            "rootId": 3,
        },
    ],
    VerseWord: [
        {
            "verseWordId": 1,
            "verseId": 1,
            "wordId": 1,
            "visible": false,
            "wordExplanation": "An explanation of the basmalla goes here.",
        },
        {
            "verseWordId": 2,
            "verseId": 2,
            "wordId": 3,
            "visible": true,
            "wordExplanation": "All Praise is for Allah",
        },
        {
            "verseWordId": 3,
            "verseId": 3,
            "wordId": 3,
            "visible": true,
            "wordExplanation": "Name of Allah",
        },
    ],
    Mufasir: [
        {
            "mufasirId": 1,
            "mufasirName": "Ibn Kathir",
            "death": "774 H",
        },
    ],
    Book: [
        {
            "bookId": 1,
            "author": 1,
            "title": "Tafsir Ibn Kathir",
        },
    ],
    Tafsir: [
        {
            "tafsirId": 1,
            "tafsirText":
                "In the name of Allah, The Most Gracious, The Most Merciful",
            "book": 1,
            "verseId": 1,
            "visible": false,
        },
    ],
};

/**
 * Before we start testing, we should wipe the database clean.
 */
interface ISeedData {
    [key: string]: any[];
}

/**
 * Before we start testing, we should wipe the database clean.
 */
async function clearDatabase(db: any) {
    const tables = Object.keys(seedData);

    for (const table of tables) {
        const sql = `DELETE FROM ${table}`;
        try {
            await db.query(sql, []);
        } catch (e) {
            console.log("\n!Deletion error!\n", e);
        }
    }
}

function prepareTableSQL(table: string): [string, any[]] {
    const rows = seedData[table];
    const columns = Object.keys(rows[0]);
    let columns_string = "(";

    for (let i = 0; i < columns.length; i++) {
        columns_string = columns_string + `${lodash.snakeCase(columns[i])}, `;
    }

    columns_string =
        columns_string.substring(0, columns_string.length - 2) + ") VALUES (";

    for (let i = 0; i < columns.length; i++) {
        columns_string = columns_string + `$${i + 1}, `;
    }

    columns_string =
        columns_string.substring(0, columns_string.length - 2) + ")";
    
    const sql = `INSERT INTO ${table} ${columns_string}`;
    const rowValues = rows.map((row:any) => Object.values(row));

    return [sql, rowValues];
}

/**
 * This is where we actually put all of the mock data above into the database
 */
export async function seedDatabase(db: any, isDev?: boolean) {
    await clearDatabase(db);

    const tables = Object.keys(seedData);

    for (const table of tables) {
        const [sql, rows] = prepareTableSQL(table);

        for (const row of rows) {
            try {
                await db.query(sql, row);
            } catch (e) {
                console.log("\nInsertion error!\n", e);
                console.log(sql, row);
            }
        }

        // Resetting the sequence for each table because manual inserts caused them to get out of sync
        const primary_key = lodash.snakeCase(Object.keys(seedData[table][0])[0]);
        const resetSql = `SELECT setval(pg_get_serial_sequence('${table}', '${primary_key}'), (SELECT MAX(${primary_key}) FROM ${table})+1);`;

        try {
            await db.query(resetSql);
        } catch (e) {
            console.log("\nInsertion error!\n", e);
            console.log(resetSql);
        }
    }

    if (!isDev) await db.end();
    console.log("Database setup complete.");
}
