import {Tafsir} from "./Tafsir";
import {Word} from "./Word";

export interface Verse {
    reflections: Tafsir[];
    verse_index: number;
    tafsirs: Tafsir[];
    words: Word[];
}