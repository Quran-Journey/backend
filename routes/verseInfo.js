const router = require("express").Router();
const verseInfo = require("../model/verseInfo");
const utils = require("./utils");
const Ucreate = require("../model/utils");

/*
 * @api [get] /verse/{verse_id}
 *  summary: "Get Verse"
 *  description: "Fetch a verse by ID."
 *  tags:
 *    - Verse Endpoints
 *  produces:
 *    - application/json
 *
 *  parameters:
 *      - in: path
 *        name: verse_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The verse's complete information.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Verse'
 *
 */

router.get("/verse/tafsir", async (request, response) => {
    //let sql = "SELECT * FROM Tafsir WHERE tafsir_id=$1";
    let sql = "SELECT * FROM Tafsir";
    //var params = [request.body.tafsir_id];
    let result = await Ucreate.retrieve(
        sql,
        [],
        new Ucreate.Message({
            success: `Successfully fetched all tafsir info.`,
        })
    );
    return utils.simpleResponse(result, response);
})

router.get("/verse/verse", async (request, response) => {
    //let sql = "SELECT * FROM Verse WHERE verse_id=$1";
    let sql = "SELECT * FROM Verse";
    //var params = [request.body.verse_id];
    let result = await Ucreate.retrieve(
        sql,
        [],
        new Ucreate.Message({
            success: `Successfully fetched all verse info.`,
        })
    );
    return utils.simpleResponse(result, response);
})

router.get("/verse/:verse_id", async (request, response) => {
    await verseInfo.getAllVerseInfo(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    })
})


//add a message in the body
router.post("/verse/setup", async (request, response) => {
    // console.log(request.body.message);
    // var sql_verse =
    //     "INSERT INTO Verse (verse_index,surah,verse_number,verse_text) VALUES ($1, $2, $3, $4) RETURNING *;";
    // await Ucreate.create(sql_verse, [1, 1, 1, "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ"])

    var sql_tafsir_info =
        "INSERT INTO Tafsir (tafsir_id, content, verse_id, visible, book) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    var params = [request.body.tafsir.tafsir_id, request.body.tafsir.content, request.body.tafsir.verse_id, request.body.tafsir.visible, request.body.tafsir.book];
    await Ucreate.create(
        sql_tafsir_info,
        params,
        new Ucreate.Message({ success: "Successfully created a Tafsir Info." })
    );

    await Ucreate.create(
        "INSERT INTO RootWord (root_id, root_word) VALUES ($1, $2) RETURNING *;",
        [1, "س م و"],
        new Ucreate.Message({ success: "Successfully created a RootWord Info." })
    );

    await Ucreate.create(
        "INSERT INTO RootMeaning (root_word, meaning) VALUES ($1, $2) RETURNING *;",
        ["س م و", "to be high/lofty, raised, name, attribute."],
        new Ucreate.Message({ success: "Successfully created a RootMeaning Info." })
    );

    await Ucreate.create(
        "INSERT INTO ArabicWord (word_id, word, root_id) VALUES ($1, $2, $3) RETURNING *;",
        [1, "بِسْمِ", 1],
        new Ucreate.Message({ success: "Successfully created a ArabicWord Info." })
    );

    await Ucreate.create(
        "INSERT INTO VerseWord (verse_word_id, verse_id, word_id, visible, word_explaination) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        [1, 1, 1, false, "In the Name of Allah"],
        new Ucreate.Message({ success: "Successfully created a VerseWord Info." })
    );
    return { "msg": "setup completed successfully" }
})



module.exports = router;