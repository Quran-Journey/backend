const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const cors = require("cors");

const lesson = require("../routes/lesson");
const reflection = require("../routes/reflection");
const surahInfo = require("../routes/surah-info");
const word = require("../routes/word/main");
const mufasir = require("../routes/mufasir");
const surah = require("../routes/surah");
const verseInfo = require("../routes/verseInfo");
const tafsir = require("../routes/tafsir");
const authentication = require("../routes/auth");

const AuthMiddleware = require("../middleware/auth");

class AppRouter {
    constructor(app) {
        this.app = app;
        // this.router = express.Router();
    }

    route() {
        this.applyMiddleware();
        this.mountApiRoutes();
        this.mountAuthenticationRoutes();
    }

    applyMiddleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        // const csrfMiddleware = csrf({ cookie: true });
        // this.app.use(csrfMiddleware);
        this.app.use(this.logRoutes);
    }

    logRoutes(req, res, next) {
        console.log(`\nEndpoint: ${req.method} ${req.originalUrl}\n`);
        next();
    }

    mountApiRoutes() {
        console.log("Setting up API routes");
        const apiRouter = express.Router();
        apiRouter.use(this.apiRouteMiddleware);
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
        apiRouter.all("*", (req, res) => {
            res.status(404).json({ error: "This endpoint doesn't exist." });
        });
        this.app.use("/api", apiRouter);
    }

    apiRouteMiddleware(req, res, next) {
        if (req.method !== "GET") {
            AuthMiddleware.authorize(req, res, next);
        }
        next();
    }

    mountAuthenticationRoutes() {
        this.app.use("/auth", authentication);
    }
}

module.exports = AppRouter;
