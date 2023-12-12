/**
 *  @schema Verse
 *  type: object
 *  required:
 *      - index
 *      - surah
 *      - aya
 *      - text
 *  properties:
 *      verseIndex:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      surah:
 *          type: integer
 *          description: the surah id/number that the verse belongs to
 *          example: 1
 *      verseNumber:
 *          type: integer
 *          description: the ayah number within the surah
 *          example: 1
 *      verseText:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 */

/**
 * @schema VerseWordInformation
 *     type: object
 *     required:
 *         - word
 *         - rootId
 *         - wordExplanation
 *         - visible
 *         - rootWord
 *         - meaning
 *         - wordId
 *     properties:
 *         word:
 *             type: string
 *             description: the arabic word in the verse
 *             example: الْعَالَمِينَ
 *         rootWord:
 *             type: string
 *             description: the root word
 *             example: س م و
 *         wordExplanation:
 *             type: string
 *             description: the explanation of the word in the verse.
 *             example: this is the explanation for the word in the verse using the root word
 *         visible:
 *             type: boolean
 *             description: whether this explanation is visible
 *             example: true
 *         rootId:
 *             type: integer
 *             description: the id of the root word
 *             example: 1
 *         meaning:
 *             type: string
 *             description: the meaning of the root word
 *             example: A name.
 *         wordId:
 *             type: integer
 *             description: the id of the word
 *             example: 1
 *
 */

/**
 *  @schema VerseWordMeaning
 *  type: object
 *  required:
 *      - indexId
 *      - wordId
 *      - word
 *      - rootId
 *      - rootword
 *      - meanings
 *  properties:
 *      indexId:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      wordId:
 *          type: integer
 *          description: the id pertaining to a specific word in the verse
 *          example: 2000
 *      word:
 *          type: string
 *          description: a specific word in the verse
 *          example: بِسْمِ
 *      rootId:
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

/**
 *  @schema VerseInformation
 *  type: object
 *  required:
 *      - verseIndex
 *      - surah
 *      - verseNumber
 *      - verseText
 *      - reflections
 *      - tafsirs
 *      - roots
 *  properties:
 *      verseIndex:
 *          type: integer
 *          description: the index of the verse in the quran
 *          example: 1
 *      surah:
 *          type: integer
 *          description: the sura id/number that the verse belongs to
 *          example: 1
 *      verseNumber:
 *          type: integer
 *          description: the aya number within the surah
 *          example: 1
 *      verseText:
 *          type: string
 *          description: the text representation of the verse
 *          example: بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
 *      reflections:
 *          type: array
 *          items:
 *              $ref: "#/definitions/Reflection"
 *          description: collection of reflections associated with a verse
 *      tafsirs:
 *          type: array
 *          description: collection of tafsirs for a verse from different mufasirs
 *          items:
 *              $ref: "#/definitions/Tafsir"
 *      words:
 *          type: array
 *          items:
 *              $ref: "#/definitions/VerseWordInformation"
 *
 */