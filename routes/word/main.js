const router = require("express").Router();
const root = require("./root");
const meaning = require("./meaning");

router.use("/word", meaning);
router.use("/word", root);

module.exports = router;
