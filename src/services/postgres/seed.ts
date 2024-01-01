import moment from "moment";
import lodash from "lodash";
import { Surah } from "../../models/surah/surah";
import { Lesson } from "../../models/lesson/lesson";
import { SurahInfo } from "../../models/surah/surahInfo";
import { Verse } from "../../models/verse/verse";
import { Reflection } from "../../models/reflection/reflection";
import { RootWord } from "../../models/word/rootWord";
import { RootMeaning } from "../../models/word/rootMeaning";
import { ArabicWord } from "../../models/word/arabicWord";
import { VerseWord } from "../../models/verse/verseWord";
import { Mufasir } from "../../models/tafsir/mufasir";
import { Book } from "../../models/tafsir/book";
import { Tafsir } from "../../models/tafsir/tafsir";

type SeedData = {
    Surah: Surah[];
    Lesson: Lesson[];
    SurahInfo: SurahInfo[];
    Verse: Verse[];
    Reflection: Reflection[];
    RootWord: RootWord[];
    RootMeaning: RootMeaning[];
    ArabicWord: ArabicWord[];
    VerseWord: VerseWord[];
    Mufasir: Mufasir[];
    Book: Book[];
    Tafsir: Tafsir[];
};

type SeedRows =
    | Surah
    | Lesson
    | SurahInfo
    | Verse
    | Reflection
    | RootWord
    | RootMeaning
    | ArabicWord
    | VerseWord
    | Mufasir
    | Book
    | Tafsir;

export const seedData: SeedData = {
    Surah: [
        new Surah(1, 1, "Al-Fātiĥah", "الفاتحة"),
        new Surah(2, 2, "The Cow", ""),
    ],
    Lesson: [
        new Lesson(
            1,
            moment(new Date()).format("YYYY-MM-DD"),
            1,
            3,
            "youtube.com/url_to_video"
        ),
        new Lesson(
            2,
            moment(new Date()).format("YYYY-MM-DD"),
            1,
            2,
            "facebook.com/url_to_video"
        ),
    ],
    SurahInfo: [
        new SurahInfo(
            1,
            1,
            "The Opener",
            "Al-Fātiĥah consists of 7 ayah which are a prayer for guidance and mercy"
        ),
    ],
    Verse: [
        new Verse(1, 1, 1, "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ"),
        new Verse(2, 1, 2, "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"),
        new Verse(3, 1, 3, "الرَّحْمَـٰنِ الرَّحِيمِ"),
    ],
    Reflection: [
        new Reflection(1, 1, "Bismillah", "My First Reflection"),
        new Reflection(2, 1, "Inshallah", "My Second Reflection"),
        new Reflection(3, 2, "Allahu Akbar", "Inshallah my last reflection!"),
        new Reflection(4, 3, "Subhanallah", "Allah SWT is the most merciful"),
    ],
    RootWord: [
        new RootWord(1, "س م و"),
        new RootWord(2, "ر ح م"),
        new RootWord(3, "ح م د"),
    ],
    RootMeaning: [
        new RootMeaning(1, 1, "to be high"),
        new RootMeaning(2, 1, "raised"),
        new RootMeaning(3, 3, "To praise"),
    ],
    ArabicWord: [
        new ArabicWord(1, "بِسْمِ", 1),
        new ArabicWord(2, "الرَّحِيمِ", 2),
        new ArabicWord(3, "الْحَمْدُ", 3),
    ],
    VerseWord: [
        new VerseWord(
            1,
            1,
            1,
            true,
            "An explanation of the basmalla goes here."
        ),
        new VerseWord(2, 2, 3, true, "All Praise is for Allah"),
        new VerseWord(3, 3, 3, true, "Name of Allah"),
    ],
    Mufasir: [new Mufasir(1, "Ibn Kathir", "774 H")],
    Book: [new Book(1, 1, "Tafsir Ibn Kathir")],
    Tafsir: [
        new Tafsir(
            1,
            "In the name of Allah, The Most Gracious, The Most Merciful",
            1,
            1,
            true
        ),
    ],
};

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

function prepareTableSQL(table: keyof SeedData): [string, any[]] {
    const rows = seedData[table];
    const columns = Object.keys(rows[0]);
    const publicKeys = columns.filter((column) => !column.startsWith("_"));

    const columns_string = publicKeys
        .map((column) => lodash.snakeCase(column)) // Convert column names to snake case
        .join(", ");
    const values_string = publicKeys.map((_, i) => `$${i + 1}`).join(", "); // Create placeholders for values in the SQL query
    const sql = `INSERT INTO ${table} (${columns_string}) VALUES (${values_string})`; // Generate the SQL query string
    const rowValues = rows.map((row) => {
        // Only use the values for the public columns
        return publicKeys.map((column) => (row as keyof SeedRows)[column]);
        // Object.values(row)
    }); // Extract the values from each row

    return [sql, rowValues]; // Return the SQL query and row values
}

/**
 * This function seeds the database with mock data
 * @param db - The database connection object
 * @param isDev - Optional flag indicating if the function is being run in a development environment
 */
export async function seedDatabase(db: any, isDev?: boolean) {
    // Clear the database before seeding
    await clearDatabase(db);

    // Iterate over each table in the seedData object
    for (const table of Object.keys(seedData)) {
        // Prepare the SQL statement and rows to be inserted
        const [sql, rows] = prepareTableSQL(table as keyof SeedData);

        // Insert each row into the table
        for (const row of rows) {
            try {
                await db.query(sql, row);
            } catch (e) {
                console.log("\nInsertion error!\n", e);
                console.log(sql, row);
            }
        }

        // Reset the primary key sequence for the table
        const primaryKey = lodash.snakeCase(
            Object.keys(seedData[table as keyof SeedData][0])[0]
        );
        const resetSql = `SELECT setval(pg_get_serial_sequence('${table}', '${primaryKey}'), (SELECT MAX(${primaryKey}) FROM ${table})+1);`;

        try {
            await db.query(resetSql);
        } catch (e) {
            console.log("\nInsertion error!\n", e);
            console.log(resetSql);
        }
    }

    // End the database connection if not in a development environment
    if (!isDev) {
        await db.end();
    }

    console.log("Database setup complete.");
}
