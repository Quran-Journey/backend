/**
 *  @schema Mufasir
 *  type: object
 *  required:
 *      - mufasirId
 *      - mufasirName
 *      - death
 *  properties:
 *      mufasirId:
 *          type: integer
 *          description: the id of the mufasir
 *          example: 1
 *      mufasirName:
 *          type: string
 *          description: The name of the mufasir
 *          example: "Ibn Kathir"
 *      death:
 *          type: string
 *          description: The date that the mufasir passed away
 *          example: 1203 H
 */

/**
 *  @schema Tafsir
 *  type: object
 *  required:
 *      -tafsirId,
 *      -tafsirText,
 *      -book,
 *      -verseId,
 *      -visible
 *  properties:
 *      tafsirId:
 *          type: integer
 *          description: to identify the tafsir from others
 *          example: 1
 *      tafsirText:
 *          type: string
 *          description: content of verse tafsir
 *          example: "In the Name of Allah—the Most Compassionate, Most Merciful."
 *      book:
 *          type: integer
 *          description: unique identifier for book in which tafsir is
 *          example: 3
 *      verseId:
 *          type: integer
 *          description: the verse id
 *          example: 23
 *      visible:
 *          type: integer
 *          description: flag to display information
 * */