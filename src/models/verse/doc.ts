/**
 *  @schema Verse
 *  type: object
 *  required:
 *      - index
 *      - surah
 *      - aya
 *      - text
 *  properties:
 *      verse_index:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      surah:
 *          type: integer
 *          description: the surah id/number that the verse belongs to
 *          example: 1
 *      verse_number:
 *          type: integer
 *          description: the ayah number within the surah
 *          example: 1
 *      verse_text:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 */

/**
 * @schema VerseWordInformation
 *     type: object
 *     required:
 *         - word
 *         - root_id
 *         - word_explanation
 *         - visible
 *         - root_word
 *         - meaning
 *         - word_id
 *     properties:
 *         word:
 *             type: string
 *             description: the arabic word in the verse
 *             example: الْعَالَمِينَ
 *         root_word:
 *             type: string
 *             description: the root word
 *             example: س م و
 *         word_explanation:
 *             type: string
 *             description: the explanation of the word in the verse.
 *             example: this is the explanation for the word in the verse using the root word
 *         visible:
 *             type: boolean
 *             description: whether this explanation is visible
 *             example: true
 *         root_id:
 *             type: integer
 *             description: the id of the root word
 *             example: 1
 *         meaning:
 *             type: string
 *             description: the meaning of the root word
 *             example: A name.
 *         word_id:
 *             type: integer
 *             description: the id of the word
 *             example: 1
 *
 */

/**
 *  @schema VerseWordMeaning
 *  type: object
 *  required:
 *      - index_id
 *      - word_id
 *      - word
 *      - root_id
 *      - rootword
 *      - meanings
 *  properties:
 *      index_id:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      word_id:
 *          type: integer
 *          description: the id pertaining to a specific word in the verse
 *          example: 2000
 *      word:
 *          type: string
 *          description: a specific word in the verse
 *          example: بِسْمِ
 *      root_id:
 *          type: integer
 *          description: the id of the root word associated with the specific word in the verse
 *          example: 936
 *      rootword:
 *          type: integer
 *          description: string representaiton of the root word with spaces in between each letter.
 *          example: س م و
 *      meanings:
 *          type: array
 *          items:
 *              $ref: '#/definitions/RootMeaning'
 *          description: the meanings associated with the word in the verse
 */