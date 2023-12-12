export class RootWord {
    rootId?: number;
    rootWord?: string;
    meanings?: string[];

    // TODO:  
    constructor(rootId?: number, rootWord?: string) {
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
        this.meanings?.push(meaning);
    }

    /**
     * Adds a list of meanings to the existing meanings.
     *
     * @param {string[]} newMeanings the meanings to be added
     */
    addMeanings(newMeanings: string[]) {
        this.meanings = [...this.meanings!, ...newMeanings];
    }

    // Define any model methods here
}
