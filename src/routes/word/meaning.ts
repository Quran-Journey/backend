import { Router, Request, Response } from "express";
import * as meaningService from "../../services/postgres/word/meaning";
import responses from "../../utils/responses";

const router: Router = Router();
interface MeaningParams{
    verse_id: number;
    meaning_id:number
}
router.get("/meanings/verse/:verse_id/", async (request: Request<MeaningParams>, response: Response) => {
    await meaningService.getVerseRootWordsSentences(request.params).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.get("/meaning/:meaning_id", async (request: Request<MeaningParams>, response: Response) => {
    await meaningService.getMeaning(request.params).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.post("/meaning", async (request: Request, response: Response) => {
    await meaningService.addMeaning(request.body).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.put("/meaning", async (request: Request, response: Response) => {
    await meaningService.editMeaning(request.body).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/meaning/:meaning_id", async (request: Request<MeaningParams>, response: Response) => {
    await meaningService.deleteMeaning(request.params).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

export default router;
