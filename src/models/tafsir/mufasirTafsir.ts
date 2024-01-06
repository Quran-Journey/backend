import { Mufasir } from "./mufasir";
import { Tafsir } from "./tafsir";

/**
 * Represents the relationship between a Mufasir and a Tafsir.
 */
export class MufasirTafsir {
    mufasir?: Mufasir; // Mufasir is the class for Mufasir objects
    tafsir?: Tafsir; // Tafsir is the class for Tafsir objects

    constructor(mufasir: Mufasir, tafsir: Tafsir) {
        this.mufasir = mufasir;
        this.tafsir = tafsir;
    }

    // Define any model methods here
}
