import app, { Router, Request, Response } from "express";
// import {
//     getNoteByName,
//     createNote,
//     updateNote,
//     deleteNote
// } from "../../services/postgres/note";
import responses from "../../utils/responses";
import { Note } from "../../models/note/note";
import { generateUploadURL } from "../../services/s3/accessUrl"



const router = app.Router();

//FIXME: Only authorized users (include auth middleware)
router.get("/note/s3", async (request, response) => {
    const url = await generateUploadURL("application/pdf")
    // const url = await generateUploadURL(request.body.file.type)
    response.send({ url })
});

router.get("/note", async (request, response) => {
    response.send("ready...")
});
router.post("/note", async (request, response) => { });
router.patch("/note", async (request, response) => { });
router.delete("/note", async (request, response) => { });

export default router;