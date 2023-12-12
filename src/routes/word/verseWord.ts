import { Router, Request, Response } from "express";
import verseWordService from "../../services/postgres/word/verseWord";
import responses from "../../utils/responses";

const router: Router = Router();

interface verseParam{
    verseWordId:number
}

router.get("/verse/:verseWordId", async (request: Request<verseParam>, response: Response) => {
    await verseWordService
        .getVerseWordById(request.params)
        .then(async function (result:any) {
            return responses.simpleResponse(result, response);
        });
});

router.post("/verse", async (request: Request, response: Response) => {
    await verseWordService.linkVerseToWord(request.body).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/verse", async (request: Request, response: Response) => {
    await verseWordService.updateVerseWord(request.body).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/verse/:verseWordId", async (request: Request<verseParam>, response: Response) => {
    await verseWordService
        .deleteVerseWord(request.params)
        .then(async function (result:any) {
            return responses.simpleResponse(result, response);
        });
});

export default router;
