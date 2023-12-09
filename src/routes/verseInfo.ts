import { Router, Request, Response } from "express";
import verseInfo from "../services/postgres/verseInfo";
import responses from "../utils/responses";

const router: Router = Router();

interface VerseInfoParam{
    verse_id:number
}

router.get("/verse/:verse_id", async (request: Request<VerseInfoParam>, response: Response) => {
    await verseInfo.getVerseInfo(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
