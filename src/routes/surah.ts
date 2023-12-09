import { Router, Request, Response } from "express";
import surah from "../services/postgres/surah";
import responses from "../utils/responses";

const router: Router = Router();

interface SurahParams{
    surah_id:number
}

router.get("/surah/:surah_id?", async (request: Request<SurahParams>, response: Response) => {
    await surah.getSurahById(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/surah/:surah_id/verses", async (request: Request<SurahParams>, response: Response) => {
    await surah.getSurahVerses(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/surah/:surah_id/lessons", async (request: Request<SurahParams>, response: Response) => {
    await surah.getSurahLessons(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.put("/surah", async (request: Request, response: Response) => {
    await surah.updateSurah(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/surahs", async (request: Request, response: Response) => {
    await surah.getSurahs().then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
