const faker = require("faker");
const moment = require("moment");
const utils = require("./utils");
const Client = require("pg").Client;
let db = new Client(utils.dbConfig);
db.connect();

/**
 * In this seeded database there is:
 * - 3 programs
 * - 4 persons
 *   The first person will test service (subscription) based programs.
 *   The second person will test team based programs as a captain.
 *   The third person will test team based programs as a second captain.
 *   The fourth person will test team based programs as regular player.
 * - 2 teams (to test fixtures),
 * - 1 service (subscription)
 * - 4 registered individuals
 */
const seedData = {
    program: [
        {
            program_id: 1,
            name: "soccer",
        },
        {
            program_id: 2,
            name: "yoga",
        },
    ],
    person: [
        {
            person_id: 1,
            first_name: faker.name.findName(),
            last_name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            gender: "female",
            birthday: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
        },
        {
            person_id: 2,
            first_name: faker.name.findName(),
            last_name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            gender: "male",
            birthday: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
        },
        {
            person_id: 3,
            first_name: faker.name.findName(),
            last_name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            gender: "male",
            birthday: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
        },
        {
            person_id: 4,
            first_name: faker.name.findName(),
            last_name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            gender: "male",
            birthday: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
        },
    ],
    subscription: [
        {
            subscription_id: 1,
            program: 2,
            name: "monthly yoga class",
            start_date: "2020-1-20",
            end_date: "2020-2-20",
            price: 30.0,
        },
        {
            subscription_id: 2,
            program: 1,
            name: "Men's League Summer 2021",
            start_date: "2020-1-20",
            end_date: "2020-2-20",
            price: 1200.0,
        },
    ],
    registration: [
        {
            registration_id: 1,
            person: 1,
            subscription: 1,
            datetime: "2020-1-10",
            payment: 30.0,
        },
        {
            registration_id: 2,
            person: 2,
            subscription: 2,
            datetime: "2020-1-10",
            payment: 1200.0,
        },
        {
            registration_id: 3,
            person: 3,
            subscription: 2,
            datetime: "2020-1-10",
            payment: 1200.0,
        },
        {
            registration_id: 4,
            person: 4,
            subscription: 2,
            datetime: "2020-1-10",
            payment: 0.0,
        },
    ],
    consent: [
        {
            consent_id: 1,
            person: 1,
            purpose: "yoga waiver",
            is_given: true,
            datetime: "2020-1-10 12:12:12",
        },
        {
            consent_id: 2,
            person: 2,
            purpose: "soccer waiver",
            is_given: true,
            datetime: "2020-1-10 12:12:12",
        },
        {
            consent_id: 3,
            person: 3,
            purpose: "soccer waiver",
            is_given: true,
            datetime: "2020-1-10 12:12:12",
        },
        {
            consent_id: 4,
            person: 4,
            purpose: "soccer waiver",
            is_given: true,
            datetime: "2020-1-10 12:12:12",
        },
    ],
    guardian: [
        {
            guardian_id: 1,
            person: 1,
            full_name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
        },
    ],
    team: [
        {
            team_id: 1,
            captain: 2,
            team_name: "TEST A FC",
            team_capacity: 12,
        },
        {
            team_id: 2,
            captain: 3,
            team_name: "TEST B FC",
            team_capacity: 12,
        },
    ],
    competition: [
        {
            competition_id: 1,
            program: 1,
            title: "Test League",
        },
    ],
    competitionGroup: [
        {
            cgroup_id: 1,
            competition: 1,
            cg_capacity: 8,
            level: 1,
        },
    ],
    player: [
        {
            player_id: 1,
            team: "TEST A FC",
            person: 2,
        },
        {
            player_id: 2,
            team: "TEST B FC",
            person: 3,
        },
        {
            player_id: 3,
            team: "TEST A FC",
            person: 4,
        },
    ],
    fixture: [
        {
            fixture_id: 1,
            team1: "TEST A FC",
            team2: "TEST B FC",
            cgroup: 1,
            fixture_date: "2020-1-20",
            fixture_time: "12:15:00",
        },
    ],
    session: [
        {
            session_id: 1,
            program: 2,
            title: "TEST SESSION",
            instructor: faker.name.findName(),
            session_capacity: 10,
            session_time: "12:12:00",
            session_day: "WEDNESDAY",
            start_date: "2020-1-20",
            count: 4,
            location: "3579 Copernicus Dr.",
        },
    ],
    soccerPlayerFixture: [
        {
            soccer_id: 1,
            player: 1,
            fixture: 1,
        },
        {
            soccer_id: 2,
            player: 2,
            fixture: 1,
        },
        {
            soccer_id: 3,
            player: 3,
            fixture: 1,
        },
    ],
    teamRecord: [
        {
            team_record_id: 1,
            group_id: 1,
            team: 1,
        },
        {
            team_record_id: 2,
            group_id: 1,
            team: 2,
        },
    ],
};

/**
 * Before we start testing, we should wipe the database clean.
 */
async function clearDatabase() {
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
async function seedDatabase() {
    await clearDatabase();
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
