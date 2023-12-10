import { Router, Request, Response } from "express";
import tafsir from "../../services/postgres/tafsir";
import responses from "../../utils/responses";

const router: Router = Router();

interface TafsirParam{
    tafsir_id:number
}

router.get("/tafsir/:tafsir_id", async (request: Request<TafsirParam>, response: Response) => {
    await tafsir.getTafsirById(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.post("/tafsir", async (request: Request, response: Response) => {
    await tafsir.createTafsir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/tafsir", async (request: Request, response: Response) => {
    await tafsir.updateTafsir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/tafsir", async (request: Request, response: Response) => {
    console.log(request.body)
    await tafsir.deleteTafsir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
