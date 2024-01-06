import { Router, Request, Response } from "express";
import { getVerseInfo } from "../../services/postgres/verseInfo";
import responses from "../../utils/responses";
import { Reflection } from "../../models/reflection/reflection";

const router: Router = Router();

router.get("/verse/:verseId", async (request: Request<{verseId:number}>, response: Response) => {
    await getVerseInfo(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
