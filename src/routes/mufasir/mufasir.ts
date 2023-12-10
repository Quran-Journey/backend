import { Router, Request, Response } from "express";
import mufasir from "../../services/postgres/mufasir";
import responses from "../../utils/responses";

const router: Router = Router();

router.get("/mufasir", async (request: Request, response: Response) => {
    await mufasir.getMufasireen().then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/mufasir/:mufasir_id", async (request: Request, response: Response) => {
    await mufasir.getMufasir(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.post("/mufasir", async (request: Request, response: Response) => {
    await mufasir.addMufasir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.put("/mufasir", async (request: Request, response: Response) => {
    await mufasir.updateMufasir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/mufasir/:mufasir_id", async (request: Request, response: Response) => {
    await mufasir.deleteMufasir(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
