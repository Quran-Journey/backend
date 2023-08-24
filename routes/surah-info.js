const router = require("express").Router();
const surahInfo = require("../services/postgres/surah-info");
const utils = require("./utils");

/*
 * @api [get] /surah/info
 *  summary: "Fetch information about a surah"
 *  description: "Fetch information about a surah based on either the surah info id or the surah id. The request must contains one of these two query parameters."
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: query
 *        name: surah
 *        type: integer
 *        example: 1
 *      - in: query
 *        name: surah_info_id
 *        type: integer
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
router.get("/surah/info", async (request, response) => {
    await surahInfo.getSurahInfo(request.query).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /surah/info
 *  summary: "Add information about a surah"
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the surah info to update and it's new attributes
 *          schema:
 *              type: object
 *              required:
 *                  - surah
 *                  - title
 *                  - info
 *              properties:
 *                  surah:
 *                      type: integer
 *                      description: to identify the surah that the surah info is refering to
 *                      example: 23
 *                  title:
 *                      type: string
 *                      description: a title to the surah info section
 *                      example: "Place of revelation"
 *                  info:
 *                      type: string
 *                      description: information regarding the surah
 *                      example: "This surah was revealed in place x"
 *  responses:
 *    200:
 *      description: Surah Info has been created.
 *      schema:
 *          $ref: '#/definitions/SurahInfo'
 *
 */
router.post("/surah/info", async (request, response) => {
    await surahInfo
        .createSurahIntroInfo(request.body)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

/*
 * @api [patch] /surah/info
 *  summary: "Update specific information about a surah"
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: Surah Info
 *          schema:
 *              $ref: '#/definitions/SurahInfo'
 *  responses:
 *    200:
 *      description: Surah Info has been updated.
 *      schema:
 *          $ref: '#/definitions/SurahInfo'
 *    404:
 *      description: Could not find a surah info with that id.
 *
 */
router.patch("/surah/info", async (request, response) => {
    await surahInfo
        .updateSurahIntroInfo(request.body)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

/*
 * @api [delete] /surah/info/{surah_info_id}
 *  summary: "Delete some information aobut a surah"
 *  tags:
 *    - SurahInfo Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: path
 *          name: surah_info_id
 *          description: the surah info to be deleted
 *          required: true
 *          type: integer
 *  responses:
 *    200:
 *      description: The Surah Info has been deleted.
 *      schema:
 *          $ref: '#/definitions/SurahInfo'
 *    404:
 *      description: Could not find a surah info with that id.
 *
 */
router.delete("/surah/info", async (request, response) => {
    await surahInfo
        .deleteSurahIntroInfo(request.body)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

module.exports = router;
