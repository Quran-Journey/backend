import app, { Router, Request, Response } from "express";
import lesson from "../../services/postgres/lesson";
import responses from "../../utils/responses";

const router = app.Router();

interface lessonParam{
    lesson_id: number;
}

router.get("/lessons", async (request, response) => {
    await lesson.filterLessons(request.query).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.get("/lesson/:lesson_id", async (request: Request<lessonParam>, response) => {
    await lesson.getLessonById(request.params).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.get("/lesson/:lesson_id/verses", async (request:Request<lessonParam>, response) => {
    await lesson.getLessonVerses(request.params).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.post("/lesson", async (request, response) => {
    await lesson.createLesson(request.body).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/lesson", async (request, response) => {
    await lesson.updateLesson(request.body).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/lesson/:lesson_id", async (request:Request<lessonParam>, response) => {
    await lesson.deleteLesson(request.params).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

export  default router;
