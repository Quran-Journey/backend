import { Router, Request, Response } from "express";
import { createTafsir, deleteTafsir, getTafsirById, updateTafsir } from "../../services/postgres/tafsir";
import responses from "../../utils/responses";
import { Tafsir } from "../../models/tafsir/tafsir";

const router: Router = Router();

router.get("/tafsir/:tafsirId", async (request: Request<Tafsir>, response: Response) => {
    await getTafsirById(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.post("/tafsir", async (request: Request, response: Response) => {
    await createTafsir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/tafsir", async (request: Request, response: Response) => {
    await updateTafsir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/tafsir", async (request: Request, response: Response) => {
    console.log(request.body)
    await deleteTafsir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
