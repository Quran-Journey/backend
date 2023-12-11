/**
 *  @schema Mufasir
 *  type: object
 *  required:
 *      - mufasir_id
 *      - mufasir_name
 *      - death
 *  properties:
 *      mufasir_id:
 *          type: integer
 *          description: the id of the mufasir
 *          example: 1
 *      mufasir_name:
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
 *      -tafsir_id,
 *      -tafsir_text,
 *      -book,
 *      -verse_id,
 *      -visible
 *  properties:
 *      tafsir_id:
 *          type: integer
 *          description: to identify the tafsir from others
 *          example: 1
 *      tafsir_text:
 *          type: string
 *          description: content of verse tafsir
 *          example: "In the Name of Allah—the Most Compassionate, Most Merciful."
 *      book:
 *          type: integer
 *          description: unique identifier for book in which tafsir is
 *          example: 3
 *      verse_id:
 *          type: integer
 *          description: the verse id
 *          example: 23
 *      visible:
 *          type: integer
 *          description: flag to display information
 * */