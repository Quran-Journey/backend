import { VerseWord } from "../verse/verseWord";
import { ArabicWord } from "./arabicWord";
import { RootMeaning } from "./rootMeaning";
import { RootWord } from "./rootWord";

export type VerseArabicWordRootJoin = ArabicWord &
    RootWord &
    RootMeaning &
    VerseWord;

export class VerseWordExplanation extends VerseWord {
    rootWord?: RootWord;
    arabicWord?: ArabicWord;
    wordExplanation?: string;

    constructor(
        rootWord: RootWord,
        verseWord: VerseWord,
        arabicWord: ArabicWord
    ) {
        super(
            verseWord.verseWordId!,
            verseWord.verseId!,
            verseWord.wordId!,
            verseWord.visible!,
            verseWord.wordExplanation!
        );
        this.rootWord = rootWord;
        this.arabicWord = arabicWord;
    }
}
