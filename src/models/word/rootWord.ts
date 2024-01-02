import { RootMeaning } from "./rootMeaning";

export class RootWord {
    rootId?: number;
    rootWord?: string;
    private _meanings: RootMeaning[];

    constructor(rootId?: number, rootWord?: string) {
        this.rootId = rootId;
        this.rootWord = rootWord;
        this._meanings = [];
    }

    /**
     * Get the meanings of the object.
     *
     * @return {RootMeaning[]} The meanings of the object.
     */
    get meanings(): RootMeaning[] {
        return this._meanings;
    }

    /**
     * Sets the meanings of the function.
     *
     * @param {RootMeaning[]} meanings - An array of strings representing the meanings.
     */
    set meanings(meanings: RootMeaning[]) {
        this._meanings = meanings;
    }

    /**
     * Adds a single meaning to the list of meanings
     *
     * @param {RootMeaning} meaning the meaning to be added
     */
    addMeaning(meaning: RootMeaning) {
        if (!this._meanings.includes(meaning)) {
            this._meanings?.push(meaning);
        }
    }

    /**
     * Adds a list of meanings to the existing meanings.
     *
     * @param {RootMeaning[]} newMeanings the meanings to be added
     */
    addMeanings(newMeanings: RootMeaning[]) {
        this.meanings = [...this.meanings!, ...newMeanings];
    }

    // Define any model methods here
}
