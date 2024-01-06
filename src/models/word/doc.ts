/**
 *  @schema RootWord
 *  type: object
 *  required:
 *      - rootId
 *      - rootword
 *      - meanings
 *  properties:
 *      rootId:
 *          type: integer
 *          description: the id of the root word
 *          example: 936
 *      rootword:
 *          type: string
 *          description: string representaiton of the root word with spaces in between each letter.
 *          example: س م و
 */

/**
 * @schema RootMeaning
 * type: object
 * required:
 *   - meaningId
 *   - rootId
 *   - meaning
 * properties:
 *   meaningId:
 *     type: integer
 *     description: Identifier to distinguish the meaning from others.
 *     example: 1
 *   rootId:
 *     type: integer
 *     description: Identifier to associate the meaning with a root.
 *     example: 23
 *   meaning:
 *     type: string
 *     description: The meaning associated with the root.
 *     example: "To understand or signify"
*/