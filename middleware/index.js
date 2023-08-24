const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const lesson = require("../routes/lesson");
const reflection = require("../routes/reflection");
const surahInfo = require("../routes/surah-info");
const word = require("../routes/word/main");
const mufasir = require("../routes/mufasir");
const surah = require("../routes/surah");
const cors = require("cors");
const verseInfo = require("../routes/verseInfo");
const tafsir = require("../routes/tafsir");
const authentication = require("../routes/auth");
const FireBaseAuthService = require("../services/firebase/auth");

// Create the middleware router
var router = express.Router();

// All routes should be using cors, body parser,
// cookieparser, and csrf middleware
const csrfMiddleware = csrf({ cookie: true });
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
app.use(csrfMiddleware);

// Log which routes are being hit
router.use(async (req, res, next) => {
    console.log(`\nEndpoint: ${req.method} ${req.originalUrl}\n`);
    next();
});


router.use("/api", lesson);
router.use("/api", reflection);
router.use("/api", surahInfo);
router.use("/api", mufasir);
router.use("/api", surah);
router.use("/api", word);
router.use("/api", verseInfo);
router.use("/api", tafsir);
router.use("/api", authentication);
router.all("*", (req, res, next) => {
    FireBaseAuthService.checkAuth(req, res, next)
    next();
});
