import { Router, Request, Response } from "express";
import {
    getAllReflections,
    getReflectionById,
    getReflectionBySurahVerseId,
    createReflection,
    updateReflection,
    deleteReflection
} from "../../services/postgres/reflection";
import responses from "../../utils/responses";
import { Reflection } from "../../models/reflection/reflection";

const router: Router = Router();

router.get(
    "/reflection/:reflectionId",
    async (request: Request, response: Response) => {
        await getReflectionById(request.params).then(async (result) => {
            return responses.simpleResponse(result, response);
        });
    }
);

router.get(
    "/reflection/:surahId/:verseId",
    async (request: Request<Reflection>, response: Response) => {
        await getReflectionBySurahVerseId(request.params).then(
            async (result) => {
                return responses.simpleResponse(result, response);
            }
        );
    }
);

router.post("/reflection", async (request: Request, response: Response) => {
    await createReflection(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/reflection", async (request: Request, response: Response) => {
    await updateReflection(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.delete(
    "/reflection/:reflectionId",
    async (request: Request<Reflection>, response: Response) => {
        await deleteReflection(request.params).then(async (result) => {
            return responses.simpleResponse(result, response);
        });
    }
);

router.get("/reflection", async (request: Request, response: Response) => {
    await getAllReflections().then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
