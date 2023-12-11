class VerseWord {
  verseWordId: number;
  verseId: number;
  wordId: number;
  visible: boolean;
  wordExplanation: string;

  constructor(verseWordId: number, verseId: number, wordId: number, visible: boolean, wordExplanation: string) {
      this.verseWordId = verseWordId;
      this.verseId = verseId;
      this.wordId = wordId;
      this.visible = visible;
      this.wordExplanation = wordExplanation;
  }

  // Define any model methods here
}

export default VerseWord;
