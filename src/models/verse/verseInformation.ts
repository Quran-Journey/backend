import { Reflection } from "../reflection/reflection";
import { Tafsir } from "../tafsir/tafsir";
import { VerseWordExplanations } from "../word";
import { Verse } from "./verse";

export class VerseInformation {
    verse?: Verse[];
    reflection?: Reflection[];
    tafsir?: Tafsir[];
    words?: VerseWordExplanations[];

    constructor(
        verse: Verse[],
        reflection: Reflection[],
        tafsir: Tafsir[],
        words: VerseWordExplanations[]
    ) {
        this.verse = verse;
        this.reflection = reflection;
        this.tafsir = tafsir;
        this.words = words;
    }

}
