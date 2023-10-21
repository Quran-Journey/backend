// Middleware Imports
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const cors = require("cors");

// routes to be used in application
const lesson = require("../routes/lesson");
const reflection = require("../routes/reflection");
const surahInfo = require("../routes/surah-info");
const word = require("../routes/word/main");
const mufasir = require("../routes/mufasir");
const surah = require("../routes/surah");
const verseInfo = require("../routes/verseInfo");
const tafsir = require("../routes/tafsir");
const authentication = require("../routes/auth");

// Services and Middleware
const AuthMiddlware = require("../middleware/auth");

// Initialize app and routes
const app = express();
const router = express.Router();

// Apply middleware at the application level
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const csrfMiddleware = csrf({ cookie: true });
app.use(csrfMiddleware);

// Create a function to log routes
const logRoutes = (req, res, next) => {
    console.log(`\nEndpoint: ${req.method} ${req.originalUrl}\n`);
    next();
};

// Shared middleware for all routes under "/api"
const apiRouter = express.Router();
apiRouter.use((req, res, next) => {
    // catch all non get requests
    if (req.method != "GET") {
        AuthMiddlware.authorize(req, res, next);
    }
    next();
});

// Define your route handlers for different paths under "/api"
const apiRoutes = [
    lesson,
    reflection,
    surahInfo,
    mufasir,
    surah,
    word,
    verseInfo,
    tafsir,
];
apiRoutes.forEach((route) => {
    apiRouter.use(route);
});

// Define a catch-all route for unmatched routes
apiRouter.all("*", (req, res) => {
    res.status(404).json({ error: "It seems this endpoint doesn't exist." });
});

// Use the logRoutes middleware for logging
apiRouter.use(logRoutes);

// Mount the API router under "/api"
router.use("/api", apiRouter);

// Authentication routes
router.use("/auth", authentication);

// Export the router
module.exports = router;
