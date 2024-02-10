import app, { Router, Request, Response } from "express";
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from "../../services/postgres/note";
import responses from "../../utils/responses";
import { generateUploadURL, doesObjectExist } from "../../services/s3/s3utils"



const router = app.Router();

router.get("/note/:fileId", async (request, response) => {
    await getNoteById(request.params).then(async function (result: any) {
        return responses.simpleResponse(result, response);
    });
});

router.get("/notes", async (request, response) => {
    await getNotes().then(async function (result: any) {
        return responses.simpleResponse(result, response);
    });
});

// s3 method: {putObject, deleteObject}
// note: getObject is a fixed link stored in the backend
router.post("/note/s3", async (request, response) => {
    console.log(request.body)
    const url = await generateUploadURL(request.body.type, request.body.key, request.body.s3method)
    response.send({ url })
});

//check upload success in s3 + create record in db
router.post("/note", async (request, response) => {
    doesObjectExist(request.body.bucketName, request.body.key).then(async function (result: any) {
        if (!result) {
            return responses.simpleResponse(result, response);
        }
    })
    await createNote(request.body.data).then(async function (result) {
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