import { Router, Request, Response } from "express";
import { getSurahById, getSurahLessons, getSurahVerses, getSurahs, updateSurah } from "../../services/postgres/surah";
import responses from "../../utils/responses";

const router: Router = Router();

interface SurahParams{
    surahId:number
}

router.get("/surah/:surahId?", async (request: Request<SurahParams>, response: Response) => {
    await getSurahById(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/surah/:surahId/verses", async (request: Request<SurahParams>, response: Response) => {
    await getSurahVerses(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/surah/:surahId/lessons", async (request: Request<SurahParams>, response: Response) => {
    await getSurahLessons(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.put("/surah", async (request: Request, response: Response) => {
    await updateSurah(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/surahs", async (request: Request, response: Response) => {
    await getSurahs().then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
