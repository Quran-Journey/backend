/**
 * @schema RootWord
 * type: object
 * required:
 * - root_id
 * - rootword
 * - meanings
 * properties:
 * root_id:
 * type: integer
 * description: the id of the root word
 * example: 936
 * rootword:
 * type: string
 * description: string representation of the root word with spaces in between each letter.
 * example: س م و
 */

class RootWord {
    rootId: number;
    rootWord: string;
    meanings: string[];

    constructor(rootId: number, rootWord: string) {
        this.rootId = rootId;
        this.rootWord = rootWord;
        this.meanings = [];
    }

    /**
     * Adds a single meaning to the list of meanings
     *
     * @param {string} meaning the meaning to be added
     */
    addMeaning(meaning: string) {
        this.meanings.push(meaning);
    }

    /**
     * Adds a list of meanings to the existing meanings.
     *
     * @param {string[]} newMeanings the meanings to be added
     */
    addMeanings(newMeanings: string[]) {
        this.meanings = [...this.meanings, ...newMeanings];
    }

    // Define any model methods here
}

export default RootWord;
