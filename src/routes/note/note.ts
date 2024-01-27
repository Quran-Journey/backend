import app, { Router, Request, Response } from "express";
import {
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from "../../services/postgres/note";
import responses from "../../utils/responses";
import { generateUploadURL } from "../../services/s3/accessUrl"



const router = app.Router();

//FIXME: Only authorized users (include auth middleware)
// method: {putObject, deleteObject}
// note: getObject is a fixed link stored in the backend
router.get("/note/s3", async (request, response) => {
    const url = await generateUploadURL(request.body.type, request.body.key, request.body.method)
    response.send({ url })
});

router.get("/note/:fileId", async (request, response) => {
    await getNoteById(request.params).then(async function (result: any) {
        return responses.simpleResponse(result, response);
    });
});
router.post("/note", async (request, response) => { 
    await createNote(request.body).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});
router.patch("/note", async (request, response) => {
    await updateNote(request.body).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
 });
router.delete("/note/:fileId", async (request, response) => { 
    await deleteNote(request.params).then(async function (result) {
        return responses.simpleResponse(result, response);
    });
});

export default router;