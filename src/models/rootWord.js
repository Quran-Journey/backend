/**
 *  @schema RootWord
 *  type: object
 *  required:
 *      - root_id
 *      - rootword
 *      - meanings
 *  properties:
 *      root_id:
 *          type: integer
 *          description: the id of the root word
 *          example: 936
 *      rootword:
 *          type: string
 *          description: string representaiton of the root word with spaces in between each letter.
 *          example: س م و
 */
class RootWord {
    constructor(rootId, rootWord) {
        this.rootId = rootId;
        this.rootWord = rootWord;
        this.meanings = [];
    }

    /**
     * Adds a single meaning to a the list of meanings
     *
     * @param {string} meaning the meaning to be added
     */
    addMeaning(meaning) {
        this.meanings.push();
    }
    /**
     * Adds a list of meanings to the existing meanings.
     *
     * @param {List[string]} meaning the meaning to be added
     */
    addMeanings(newMeanings) {
        this.meanings = [...this.meanings, ...newMeanings];
    }
    // Define any model methods here
}

module.exports = RootWord;
