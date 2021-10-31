const faker = require("faker");
const utils = require("./utils");
const apiGET = utils.apiGET;
const apiPOST = utils.apiPOST;
const dbConfig = utils.dbConfig;
const Client = require("pg").Client;
const setup = require("./setup");
const moment = require("moment");
const seedData = setup.seedData;

function personTests() {
    let people;

    beforeAll(async () => {
        people = seedData.person;
    }, 30000);

    it("getting a person's information", async () => {
        let personA = seedData.person[0];

        const resp1 = await apiGET(`/getPerson/${personA.email}`);
        let personB = resp1.data.data[0];
        checkMatch(personA, personB);
        expect(resp1.data.success).toEqual(true);
    });

    it("test creating a person", async () => {
        let newPerson = {
            first_name: faker.name.findName(),
            last_name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            gender: "false",
            birthday: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
        };

        let resp1 = await apiPOST(`/addPerson`, newPerson);
        let person = resp1.data.data[0];
        checkMatch(newPerson, person);
    });
}

function checkMatch(personA, personB) {
    expect(personA.first_name).toEqual(personB.first_name);
    expect(personA.last_name).toEqual(personB.last_name);
    expect(personA.email).toEqual(personB.email);
    expect(personA.phone).toEqual(personB.phone);
    expect(personA.gender).toEqual(personB.gender);
    expect(new moment(personA.birthday).format("YYYY-MM-DD")).toEqual(
        new moment(personB.birthday).format("YYYY-MM-DD")
    );
}

module.exports = {
    personTests: personTests,
};
