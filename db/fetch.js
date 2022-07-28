// This file will be used whenever we want to grab any data from a third party database and store it in a json file
// which can be used to store it in our own database.

const fs = require("fs");
const axios = require("axios");

API_URL = "https://api.quran.com/api/v4/";

async function apiPOST(path, body = {}) {
    return await axios
        .post(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiGET(path) {
    return await axios
        .get(API_URL + path, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiPATCH(path, body = {}) {
    return await axios
        .patch(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

async function apiDELETE(path, body = {}) {
    return await axios
        .delete(API_URL + path, body, { validateStatus: false })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

/**
 * @returns A list of the metadata for each chapter
 */
async function fetch_chapters() {
    return await apiGET("chapters/").then((response) => {
        let chapter_metadata = [];
        let name_simple, name_complex, name_arabic, translated_name;
        for (chapter of response.data.chapters) {
            // Destructuring the required chapter information and storing it into vars
            ({ id, name_simple, name_complex, name_arabic, translated_name } =
                chapter);
            chapter_metadata.push({
                chapter_id: id,
                name_simple,
                name_complex,
                name_arabic,
                translated_name,
            });
        }
        return chapter_metadata;
    });

    // TODO: Insert into db.
}

fetch_chapters();

// We should get the information section for each chapter
// And then populate each of them as a row in the surahInfo table
async function fetch_chapter_info(chapter) {
    let chapter_info = [];
    for (var id = 1; id <= 114; id++) {
        let info = await apiGET(`chapters/${id}/info?language=en`).then(
            (response) => {
                ({ source, text } = response.data.chapter_info);
                return { source, text };
            }
        );
        chapter_info.push(info);
    }
    // TODO: Insert into db.
}

fetch_chapter_info();
