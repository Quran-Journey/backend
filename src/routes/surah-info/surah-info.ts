import { Router, Request, Response } from "express";
import { createSurahIntroInfo, deleteSurahIntroInfo, getSurahInfo, updateSurahIntroInfo } from "../../services/postgres/surah-info";
import responses from "../../utils/responses";

const router: Router = Router();

router.get("/surah/info", async (request: Request, response: Response) => {
    await getSurahInfo(request.query).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.post("/surah/info", async (request: Request, response: Response) => {
    await createSurahIntroInfo(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/surah/info", async (request: Request, response: Response) => {
    await updateSurahIntroInfo(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/surah/info", async (request: Request, response: Response) => {
    await deleteSurahIntroInfo(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
