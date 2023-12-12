import { Router, Request, Response } from "express";
import * as rootService from "../../services/postgres/word/root";
import responses from "../../utils/responses";

const router: Router = Router();

interface rootParams {
    rootId: number;
}

router.get("/root/:rootId", async (request: Request<rootParams>, response: Response) => {
    await rootService.getRootWordById(request.params).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.post("/root", async (request: Request, response: Response) => {
    await rootService.createRootWord(request.body).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/root", async (request: Request, response: Response) => {
    await rootService.updateRootWord(request.body).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/root/:rootId", async (request: Request<rootParams>, response: Response) => {
    await rootService.deleteRootWord(request.params).then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

router.get("/roots", async (request: Request, response: Response) => {
    await rootService.getAllRootWords().then(async function (result:any) {
        return responses.simpleResponse(result, response);
    });
});

export default router;
