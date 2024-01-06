/**
 *  @schema Surah
 *  type: object
 *  required:
 *      - surahId
 *      - surahNumber
 *      - nameComplex
 *      - nameArabic
 *  properties:
 *      surahNumber:
 *          type: integer
 *          description: the number of the surah (acting as the surah id)
 *          example: 1
 *      surahId:
 *          type: integer
 *          description: the id of the surah
 *          example: 1
 *      nameComplex:
 *          type: string
 *          description: the name of the surah in english (with complex characters)
 *          example: al-Fātihah
 *      nameArabic:
 *          type: string
 *          description: the name of the surah in arabic
 *          example: al-Fātihah
 */

/**
 *  @schema SurahInfo
 *  type: object
 *  required:
 *      - surahInfoId
 *      - surah
 *      - title
 *      - info
 *  properties:
 *      surahInfoId:
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