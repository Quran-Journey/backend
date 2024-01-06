import { Router, Request, Response } from "express";
import { getMufasir, addMufasir, getMufasireen, updateMufasir, deleteMufasir} from "../../services/postgres/mufasir";
import responses from "../../utils/responses";

const router: Router = Router();

router.get("/mufasir", async (request: Request, response: Response) => {
    await getMufasireen().then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/mufasir/:mufasirId", async (request: Request, response: Response) => {
    await getMufasir(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.post("/mufasir", async (request: Request, response: Response) => {
    await addMufasir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.put("/mufasir", async (request: Request, response: Response) => {
    await updateMufasir(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/mufasir/:mufasirId", async (request: Request, response: Response) => {
    await deleteMufasir(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
