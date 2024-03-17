/**
 * @schema Note
 * type: object
 * required:
 *   - fileName
 *   - fileSize
 *   - url
 *   - dateModifeid
 * properties:
 *   fileName:
 *     type: String
 *     description: Identifier to distinguish the note from others, saved under same name in s3.
 *     example: surah12
 *   fileSize:
 *     type: integer
 *     description: The size of the file in KB.
 *     example: 68
 *   url:
 *     type: string
 *     description: The url to access the resources over the web.
 *     example: "https://qj-notes-bucket/surah12"
 *   dateModified:
 *     type: string
 *     description: Date when the lesson was taught (YYYY-MM-DD format).
 *     example: "2023-01-09"
 * */
