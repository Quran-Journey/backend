import { VerseWord } from "../verse/verseWord";
import { ArabicWord } from "./arabicWord";
import { RootMeaning } from "./rootMeaning";
import { RootWord } from "./rootWord";

export type VerseWordExplanations = ArabicWord & RootWord & RootMeaning & VerseWord
