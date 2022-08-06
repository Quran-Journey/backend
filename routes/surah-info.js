const router = require("express").Router();
const surahInfo = require("../model/surah-info");
const utils = require("./utils");

/*
 * @api [get] /surah/info/{surah}
 *  summary: "Fetch a surah-info by ID"
 *  description: "This is a fetch and has surah ID parameter. It will fetch all of the surah-info in the database based on parameter."
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: surah
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding surah-info.
 *      schema:
 *          $ref: '#/definitions/SurahInfo'
 *    404:
 *      description: No surah info found with that ID.
 *
 */
router.get("/surah/info/:surah", async (request, response) => {
    await surahInfo.getSurahInfoBySurahID(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /surah/info
 *  summary: "Create a surah info"
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the surah info to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/SurahInfo'
 *  responses:
 *    200:
 *      description: Surah Info has been created.
 *
 */
router.post("/surah/info", async (request, response) => {
    await surahInfo.createSurahIntroInfo(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});


/*
 * @api [patch] /surah/info
 *  summary: "Update a surah info"
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the surah info to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/SurahInfo'
 *  responses:
 *    200:
 *      description: Surah Info has been updated.
 *    404:
 *      description: Could not find a surah info with that id.
 *
 */
router.patch("/surah/info", async (request, response) => {
    await surahInfo.updateSurahIntroInfo(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [delete] /surah/info/{surah_info_id}
 *  summary: "Delete a surah info"
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: path
 *          name: id
 *          description: the surah info to be deleted
 *          schema:
 *              $ref: '#/definitions/SurahInfo'
 *  responses:
 *    200:
 *      description: The Surah Info has been deleted.
 *      schema:
 *          $ref: '#/definitions/SurahInfo'
 *    404:
 *      description: Could not find a surah info with that id.
 *
 */
router.delete("/surah/info/:surah_info_id", async (request, response) => {
    await surahInfo.deleteSurahIntroInfo(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});



module.exports = router;