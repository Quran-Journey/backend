export class RootWord {
    rootId?: number;
    rootWord?: string;
    private _meanings: string[];

    constructor(rootId?: number, rootWord?: string) {
        this.rootId = rootId;
        this.rootWord = rootWord;
        this._meanings = [];
    }

    /**
     * Get the meanings of the object.
     *
     * @return {string[]} The meanings of the object.
     */
    get meanings(): string[] {
        return this._meanings;
    }

    /**
     * Sets the meanings of the function.
     *
     * @param {string[]} meanings - An array of strings representing the meanings.
     */
    set meanings(meanings: string[]) {
        this._meanings = meanings;
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
