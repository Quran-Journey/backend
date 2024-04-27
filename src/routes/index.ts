import express, { Application, Request, Response, NextFunction, Router } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import lesson from "./lesson/lesson";
import reflection from "./reflection/reflection";
import surahInfo from "./surah-info/surah-info";
import word from "../routes/word/main";
import mufasir from "./mufasir/mufasir";
import surah from "./surah/surah";
import verseInfo from "./verseInfo/verseInfo";
import tafsir from "./tafsir/tafsir";
import authentication from "./auth/auth";
import note from "./note/note";

import AuthMiddleware from "../middleware/auth";

class AppRouter {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public route(): void {
        this.applyMiddleware();
        this.mountApiRoutes();
        this.mountAuthenticationRoutes();
    }

    private applyMiddleware(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(this.logRoutes);
    }

    private logRoutes(req: Request, res: Response, next: NextFunction): void {
        console.log(`\nEndpoint: ${req.method} ${req.originalUrl}\n`);
        next();
    }

    private mountApiRoutes(): void {
        console.log("Setting up API routes");
        const apiRouter: Router = express.Router();
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
            note,
        ];
        apiRoutes.forEach((route) => {
            apiRouter.use(route);
        });
        apiRouter.all("*", (req: Request, res: Response) => {
            res.status(404).json({ error: "This endpoint doesn't exist." });
        });
        this.app.use("/api", apiRouter);
    }

    private apiRouteMiddleware(req: Request, res: Response, next: NextFunction): void {
        if (req.method !== "GET") {
            AuthMiddleware.authorize(req.cookies);
        }
        next();
    }

    private mountAuthenticationRoutes(): void {
        this.app.use("/auth", authentication);
    }
}

export default AppRouter;
