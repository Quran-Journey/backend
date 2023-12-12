import app, { Router, Request, Response } from "express";
import {
    getLessonById,
    getLessonVerses,
    deleteLesson,
    createLesson,
    filterLessons,
    updateLesson,
} from "../../services/postgres/lesson";
import responses from "../../utils/responses";
import { Lesson } from "../../models/lesson/lesson";

const router = app.Router();

router.get("/lessons", async (request, response) => {
    await filterLessons(request.query).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.get("/lesson/:lessonId", async (request, response) => {
    await getLessonById(request.params).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.get("/lesson/:lessonId/verses", async (request, response) => {
    await getLessonVerses(request.params).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.post("/lesson", async (request, response) => {
    await createLesson(request.body).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.patch("/lesson", async (request, response) => {
    await updateLesson(request.body).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

router.delete("/lesson/:lessonId", async (request, response) => {
    await deleteLesson(request.params).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

export default router;
