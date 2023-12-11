/**
 *  @schema Surah
 *  type: object
 *  required:
 *      - surah_id
 *      - surah_number
 *      - name_complex
 *      - name_arabic
 *  properties:
 *      surah_number:
 *          type: integer
 *          description: the number of the surah (acting as the surah id)
 *          example: 1
 *      surah_id:
 *          type: integer
 *          description: the id of the surah
 *          example: 1
 *      name_complex:
 *          type: string
 *          description: the name of the surah in english (with complex characters)
 *          example: al-Fātihah
 *      name_arabic:
 *          type: string
 *          description: the name of the surah in arabic
 *          example: al-Fātihah
 */

/**
 *  @schema SurahInfo
 *  type: object
 *  required:
 *      - surah_info_id
 *      - surah
 *      - title
 *      - info
 *  properties:
 *      surah_info_id:
 *          type: integer
 *          description: to uniquely identify the surah info from others
 *          example: 1
 *      surah:
 *          type: integer
 *          description: to identify the surah that the surah info is refering to
 *          example: 23
 *      title:
 *          type: string
 *          description: a title to the surah info section
 *          example: "Opening of The Quran"
 *      info:
 *          type: string
 *          description: information regarding the surah
 *          example: "This surah was..."
 */