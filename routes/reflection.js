const router = require("express").Router();
const reflection = require("../model/reflection");
const utils = require("./utils");


router.get("/reflection", async (request, response) => {
    await reflection.test().then(async function (result) {
        return utils.simpleResponse(result, response);
    })
})

router.get("/reflection/:reflection_id", async (request, response) => {
    await reflection.getReflectionById(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

router.post("/reflection", async (request, response) => {
    await reflection.createReflection(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

router.patch("/reflection", async (request, response) => {
    await reflection.updateReflection(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

router.delete("/reflection/:reflection_id", async (request, response) => {
    await reflection.deleteReflection(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});


module.exports = router;