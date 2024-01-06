import { Reflection } from "../reflection/reflection";
import { Tafsir } from "../tafsir/tafsir";
import { VerseWordExplanation } from "../word";
import { Verse } from "./verse";

export class VerseInformation {
    verse?: Verse;
    reflection?: Reflection[];
    tafsir?: Tafsir[];
    words?: VerseWordExplanation[];

    constructor(
        verse: Verse,
        reflection: Reflection[],
        tafsir: Tafsir[],
        words: VerseWordExplanation[]
    ) {
        this.verse = verse;
        this.reflection = reflection;
        this.tafsir = tafsir;
        this.words = words;
    }

}
