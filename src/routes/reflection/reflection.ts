import { Router, Request, Response } from "express";
import reflection from "../../services/postgres/reflection";
import responses from "../../utils/responses";
import Reflection from "../../models/reflection";

const router: Router = Router();

interface ReflectionData {
    reflection_id?: number;
    verse_id: number;
    title: string;
    reflection: string;
    surah_id?: number;
}

router.get("/reflection/:reflection_id", async (request: Request<ReflectionData>, response: Response) => {
    await reflection.getReflectionById(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/reflection/:surah_id/:verse_id", async (request: Request<ReflectionData>, response: Response) => {
    await reflection.getReflectionBySurahVerseId(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.post("/reflection", async (request: Request, response: Response) => {
    await reflection.createReflection(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/reflection", async (request: Request, response: Response) => {
    await reflection.updateReflection(request.body).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/reflection/:reflection_id", async (request: Request<ReflectionData>, response: Response) => {
    await reflection.deleteReflection(request.params).then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

router.get("/reflection", async (request: Request, response: Response) => {
    await reflection.getAllReflections().then(async (result) => {
        return responses.simpleResponse(result, response);
    });
});

export default router;
