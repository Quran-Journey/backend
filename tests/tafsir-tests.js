const utils = require("./utils");
const { apiGET, apiPOST, apiPATCH, apiDELETE } = utils;
const setup = require("./setup");
const seedData = setup.seedData;

function tafsirTests() {
    it("getting a tafsir", async () => {
        let tafsir = seedData.Tafsir[0]

        let res = await apiGET(`/tafsir/1`)
        expect(res.data.data[0]).toEqual(tafsir)
        expect(res.data.success).toEqual(true)

    });
    it("adding a tafsir", async () => {
        let newTafsir = {
            tafsir_id: 2,
            tafsir_text: "All praise is for Allah—Lord of all worlds,",
            book: 1,
            verse_id: 2,
            visible: true
        }

        let res = await apiPOST(`/tafsir`, newTafsir)
        let t1 = await apiGET(`/tafsir/2`)

        expect(t1.data.data[0]).toEqual(newTafsir)
        expect(res.data.success).toEqual(true)
    })
    it("updating a tafsir", async () => {
        let updateTafsir = {
            tafsir_id: 2,
            tafsir_text: "the Most Compassionate, Most Merciful",
            book: 1,
            verse_id: 3,
            visible: false
        }
        let t1 = await apiGET(`/tafsir/2`)
        await apiPATCH(`/tafsir`, updateTafsir)
        let t2 = await apiGET(`/tafsir/2`)

        expect(t1.data.data[0].tafsir_text).not.toEqual(updateTafsir.tafsir_text)
        expect(t1.data.data[0].verse_id).not.toEqual(updateTafsir.verse_id)
        expect(t2.data.data[0]).toEqual(updateTafsir)
        expect(t2.data.success).toEqual(true)
    })
    it("deleting a tafsir", async () => {
        let deleteTafsir = seedData.Tafsir[0]
        let res = await apiDELETE(`/tafsir`, { data: { tafsir_id: 1 } })

        expect(res.data.data[0]).toEqual(deleteTafsir)
        expect(res.data.success).toEqual(true)

        let res2 = await apiGET(`/tafsir/1`)
        expect(res2.data.code).toEqual(3)
        expect(res2.data.success).toEqual(false)

        //to make sure future tests have complete seedData
        await apiPOST(`/tafsir`, deleteTafsir)
    })
}


module.exports = { tafsirTests }

