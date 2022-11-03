const router = require("express").Router();
const root = require("./root");
const meaning = require("./meaning");
const verseWord = require("./verseWord");

router.use("/word", meaning);
router.use("/word", root);
router.use("/word", verseWord);

module.exports = router;
