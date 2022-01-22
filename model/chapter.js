/*
The following is a file used to fetch data from the Quran.com APIs and parse the information. 
*/

var axios = require("axios")

/* For each surah from 144 to 110, get the surah name */

for(var chapter_number=111; chapter_number < 114; chapter_number++){
    axios.get(`https://api.quran.com/api/v4/chapters/${chapter_number}?language=en`)
    .then((response) => {
    console.log(response.data);
    });

    /* Get the verses for each surah */
    axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${chapter_number}?per_page=10&page=1&words=true&language=en`)
    .then((response) => {
    console.log(response.data);
    });

}



/* Extract the data in JSON format 
What the JSON data for verses should return: 

Dictionary: {"verses", [ {"verse1", "" ; }]}
---> Above is incorrect, its a JSON object and shuld be read in as stated here: https://stackoverflow.com/questions/47832013/how-to-read-nested-json-object 
{
  "verses": [
    {
      "id": 6231,
      "verse_number": 1,
      "verse_key": "114:1",
      "juz_number": 30,
      "hizb_number": 60,
      "rub_number": 240,
      "sajdah_type": null,
      "sajdah_number": null,
      "page_number": 604,
      "words": [
        {
          "id": 115,
          "position": 1,
          "audio_url": "wbw/114_001_001.mp3",
          "char_type_name": "word",
          "code_v1": "ﮀ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮀ",
          "translation": {
            "text": "Say",
            "language_name": "english"
          },
          "transliteration": {
            "text": "qul",
            "language_name": "english"
          }
        },
        {
          "id": 116,
          "position": 2,
          "audio_url": "wbw/114_001_002.mp3",
          "char_type_name": "word",
          "code_v1": "ﮁ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮁ",
          "translation": {
            "text": "I seek refuge",
            "language_name": "english"
          },
          "transliteration": {
            "text": "aʿūdhu",
            "language_name": "english"
          }
        },
        {
          "id": 117,
          "position": 3,
          "audio_url": "wbw/114_001_003.mp3",
          "char_type_name": "word",
          "code_v1": "ﮂ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮂ",
          "translation": {
            "text": "in (the) Lord",
            "language_name": "english"
          },
          "transliteration": {
            "text": "birabbi",
            "language_name": "english"
          }
        },
        {
          "id": 118,
          "position": 4,
          "audio_url": "wbw/114_001_004.mp3",
          "char_type_name": "word",
          "code_v1": "ﮃ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮃ",
          "translation": {
            "text": "(of) mankind",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-nāsi",
            "language_name": "english"
          }
        },
        {
          "id": 119,
          "position": 5,
          "audio_url": null,
          "char_type_name": "end",
          "code_v1": "ﮄ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮄ",
          "translation": {
            "text": "(1)",
            "language_name": "english"
          },
          "transliteration": {
            "text": null,
            "language_name": "english"
          }
        }
      ]
    },
    {
      "id": 6232,
      "verse_number": 2,
      "verse_key": "114:2",
      "juz_number": 30,
      "hizb_number": 60,
      "rub_number": 240,
      "sajdah_type": null,
      "sajdah_number": null,
      "page_number": 604,
      "words": [
        {
          "id": 932,
          "position": 1,
          "audio_url": "wbw/114_002_001.mp3",
          "char_type_name": "word",
          "code_v1": "ﮅ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮅ",
          "translation": {
            "text": "(The) King",
            "language_name": "english"
          },
          "transliteration": {
            "text": "maliki",
            "language_name": "english"
          }
        },
        {
          "id": 933,
          "position": 2,
          "audio_url": "wbw/114_002_002.mp3",
          "char_type_name": "word",
          "code_v1": "ﮆ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮆ",
          "translation": {
            "text": "(of) mankind",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-nāsi",
            "language_name": "english"
          }
        },
        {
          "id": 934,
          "position": 3,
          "audio_url": null,
          "char_type_name": "end",
          "code_v1": "ﮇ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮇ",
          "translation": {
            "text": "(2)",
            "language_name": "english"
          },
          "transliteration": {
            "text": null,
            "language_name": "english"
          }
        }
      ]
    },
    {
      "id": 6233,
      "verse_number": 3,
      "verse_key": "114:3",
      "juz_number": 30,
      "hizb_number": 60,
      "rub_number": 240,
      "sajdah_type": null,
      "sajdah_number": null,
      "page_number": 604,
      "words": [
        {
          "id": 2819,
          "position": 1,
          "audio_url": "wbw/114_003_001.mp3",
          "char_type_name": "word",
          "code_v1": "ﮈ",
          "page_number": 604,
          "line_number": 12,
          "text": "ﮈ",
          "translation": {
            "text": "(The) God",
            "language_name": "english"
          },
          "transliteration": {
            "text": "ilāhi",
            "language_name": "english"
          }
        },
        {
          "id": 2820,
          "position": 2,
          "audio_url": "wbw/114_003_002.mp3",
          "char_type_name": "word",
          "code_v1": "ﮉ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮉ",
          "translation": {
            "text": "(of) mankind",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-nāsi",
            "language_name": "english"
          }
        },
        {
          "id": 2821,
          "position": 3,
          "audio_url": null,
          "char_type_name": "end",
          "code_v1": "ﮊ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮊ",
          "translation": {
            "text": "(3)",
            "language_name": "english"
          },
          "transliteration": {
            "text": null,
            "language_name": "english"
          }
        }
      ]
    },
    {
      "id": 6234,
      "verse_number": 4,
      "verse_key": "114:4",
      "juz_number": 30,
      "hizb_number": 60,
      "rub_number": 240,
      "sajdah_type": null,
      "sajdah_number": null,
      "page_number": 604,
      "words": [
        {
          "id": 4131,
          "position": 1,
          "audio_url": "wbw/114_004_001.mp3",
          "char_type_name": "word",
          "code_v1": "ﮋ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮋ",
          "translation": {
            "text": "From",
            "language_name": "english"
          },
          "transliteration": {
            "text": "min",
            "language_name": "english"
          }
        },
        {
          "id": 4132,
          "position": 2,
          "audio_url": "wbw/114_004_002.mp3",
          "char_type_name": "word",
          "code_v1": "ﮌ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮌ",
          "translation": {
            "text": "(the) evil",
            "language_name": "english"
          },
          "transliteration": {
            "text": "sharri",
            "language_name": "english"
          }
        },
        {
          "id": 4133,
          "position": 3,
          "audio_url": "wbw/114_004_003.mp3",
          "char_type_name": "word",
          "code_v1": "ﮍ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮍ",
          "translation": {
            "text": "(of) the whisperer",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-waswāsi",
            "language_name": "english"
          }
        },
        {
          "id": 4134,
          "position": 4,
          "audio_url": "wbw/114_004_004.mp3",
          "char_type_name": "word",
          "code_v1": "ﮎ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮎ",
          "translation": {
            "text": "the one who withdraws",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-khanāsi",
            "language_name": "english"
          }
        },
        {
          "id": 4135,
          "position": 5,
          "audio_url": null,
          "char_type_name": "end",
          "code_v1": "ﮏ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮏ",
          "translation": {
            "text": "(4)",
            "language_name": "english"
          },
          "transliteration": {
            "text": null,
            "language_name": "english"
          }
        }
      ]
    },
    {
      "id": 6235,
      "verse_number": 5,
      "verse_key": "114:5",
      "juz_number": 30,
      "hizb_number": 60,
      "rub_number": 240,
      "sajdah_type": null,
      "sajdah_number": null,
      "page_number": 604,
      "words": [
        {
          "id": 5496,
          "position": 1,
          "audio_url": "wbw/114_005_001.mp3",
          "char_type_name": "word",
          "code_v1": "ﮐ",
          "page_number": 604,
          "line_number": 13,
          "text": "ﮐ",
          "translation": {
            "text": "The one who",
            "language_name": "english"
          },
          "transliteration": {
            "text": "alladhī",
            "language_name": "english"
          }
        },
        {
          "id": 5497,
          "position": 2,
          "audio_url": "wbw/114_005_002.mp3",
          "char_type_name": "word",
          "code_v1": "ﮑ",
          "page_number": 604,
          "line_number": 14,
          "text": "ﮑ",
          "translation": {
            "text": "whispers",
            "language_name": "english"
          },
          "transliteration": {
            "text": "yuwaswisu",
            "language_name": "english"
          }
        },
        {
          "id": 5498,
          "position": 3,
          "audio_url": "wbw/114_005_003.mp3",
          "char_type_name": "word",
          "code_v1": "ﮒ",
          "page_number": 604,
          "line_number": 14,
          "text": "ﮒ",
          "translation": {
            "text": "in",
            "language_name": "english"
          },
          "transliteration": {
            "text": "fī",
            "language_name": "english"
          }
        },
        {
          "id": 5499,
          "position": 4,
          "audio_url": "wbw/114_005_004.mp3",
          "char_type_name": "word",
          "code_v1": "ﮓ",
          "page_number": 604,
          "line_number": 14,
          "text": "ﮓ",
          "translation": {
            "text": "(the) breasts",
            "language_name": "english"
          },
          "transliteration": {
            "text": "ṣudūri",
            "language_name": "english"
          }
        },
        {
          "id": 5500,
          "position": 5,
          "audio_url": "wbw/114_005_005.mp3",
          "char_type_name": "word",
          "code_v1": "ﮔ",
          "page_number": 604,
          "line_number": 14,
          "text": "ﮔ",
          "translation": {
            "text": "(of) mankind",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-nāsi",
            "language_name": "english"
          }
        },
        {
          "id": 5501,
          "position": 6,
          "audio_url": null,
          "char_type_name": "end",
          "code_v1": "ﮕ",
          "page_number": 604,
          "line_number": 14,
          "text": "ﮕ",
          "translation": {
            "text": "(5)",
            "language_name": "english"
          },
          "transliteration": {
            "text": null,
            "language_name": "english"
          }
        }
      ]
    },
    {
      "id": 6236,
      "verse_number": 6,
      "verse_key": "114:6",
      "juz_number": 30,
      "hizb_number": 60,
      "rub_number": 240,
      "sajdah_type": null,
      "sajdah_number": null,
      "page_number": 604,
      "words": [
        {
          "id": 6729,
          "position": 1,
          "audio_url": "wbw/114_006_001.mp3",
          "char_type_name": "word",
          "code_v1": "ﮖ",
          "page_number": 604,
          "line_number": 15,
          "text": "ﮖ",
          "translation": {
            "text": "From",
            "language_name": "english"
          },
          "transliteration": {
            "text": "mina",
            "language_name": "english"
          }
        },
        {
          "id": 6730,
          "position": 2,
          "audio_url": "wbw/114_006_002.mp3",
          "char_type_name": "word",
          "code_v1": "ﮗ",
          "page_number": 604,
          "line_number": 15,
          "text": "ﮗ",
          "translation": {
            "text": "the jinn",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-jinati",
            "language_name": "english"
          }
        },
        {
          "id": 6731,
          "position": 3,
          "audio_url": "wbw/114_006_003.mp3",
          "char_type_name": "word",
          "code_v1": "ﮘ",
          "page_number": 604,
          "line_number": 15,
          "text": "ﮘ",
          "translation": {
            "text": "and men",
            "language_name": "english"
          },
          "transliteration": {
            "text": "wal-nāsi",
            "language_name": "english"
          }
        },
        {
          "id": 6732,
          "position": 4,
          "audio_url": null,
          "char_type_name": "end",
          "code_v1": "ﮙ",
          "page_number": 604,
          "line_number": 15,
          "text": "ﮙ",
          "translation": {
            "text": "(6)",
            "language_name": "english"
          },
          "transliteration": {
            "text": null,
            "language_name": "english"
          }
        }
      ]
    }
  ],
  "pagination": {
    "per_page": 10,
    "current_page": 1,
    "next_page": null,
    "total_pages": 1,
    "total_records": 6
  }
}



/*
 * @api [get] /Chapters
 *  summary: "Fetch all Chapters"
 *  description: "This is a general fetch and has no parameters. It will fetch all of the Chapters in the database."
 *  tags:
 *    - Chapters
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: A list of Chapters.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: No Chapters found.
 *
 */
router.get("/model", async (request, response) => {
  await l.getChapters(request.body).then(async function (result) {
      return c.simpleResponse(result, response);
  });
});

/*
* @api [get] /lesson/{lesson_id}
*  summary: "Fetch a lesson by ID"
*  description: "This is a general fetch and has no parameters. It will fetch all of the lessons in the database."
*  tags:
*    - Lessons
*  produces:
*    - application/json
*  parameters:
*      - in: path
*        name: lesson_id
*        type: integer
*        required: true
*        example: 1
*  responses:
*    200:
*      description: A list of lessons.
*      schema:
*          $ref: '#/definitions/Lesson'
*    404:
*      description: No lessons found with that ID.
*
*/
router.get("/lesson/:lesson_id", async (request, response) => {
  await l.getLessonById(request.params).then(async function (result) {
      return c.simpleResponse(result, response);
  });
});

/*
* @api [post] /lesson
*  summary: "Create a lesson"
*  tags:
*    - Lessons
*  produces:
*    - application/json
*  parameters:
*        - in: body
*          name: id
*          description: the lesson to update and it's new attributes
*          schema:
*              type: object
*              required:
*                  - lesson_id
*                  - lesson_date
*                  - source
*              properties:
*                  lesson_id:
*                      type: integer
*                      example: 1
*                  lesson_date:
*                      type: date
*                      example: 2025-1-30
*                  source:
*                      type: string
*                      example: "aURL.com/video"
*  responses:
*    200:
*      description: Lesson has been created.
*
*/
router.post("/lesson", async (request, response) => {
  await l.createLesson(request.body).then(async function (result) {
      return c.simpleResponse(result, response);
  });
});

/*
* @api [patch] /lesson
*  summary: "Update a lesson"
*  tags:
*    - Lessons
*  produces:
*    - application/json
*  parameters:
*        - in: body
*          name: id
*          description: the lesson to update and it's new attributes
*          schema:
*              type: object
*              required:
*                  - lesson_id
*                  - lesson_date
*                  - source
*              properties:
*                  lesson_id:
*                      type: integer
*                      example: 1
*                  lesson_date:
*                      type: date
*                      example: 2022-1-30
*                  source:
*                      type: string
*                      example: "aNewURL.com/video"
*  responses:
*    200:
*      description: Lesson has been updated.
*    404:
*      description: Could not find a lesson with that id.
*
*/
router.patch("/lesson", async (request, response) => {
  await l.updateLesson(request.body).then(async function (result) {
      return c.simpleResponse(result, response);
  });
});

module.exports = router;
