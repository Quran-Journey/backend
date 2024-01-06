export class Tafsir {
    tafsirId?: number;
    tafsirText?: string;
    book?: number;
    verseId?: number;
    visible?: boolean;

    constructor(
        tafsirId: number,
        tafsirText: string,
        book: number,
        verseId: number,
        visible: boolean
    ) {
        this.tafsirId = tafsirId;
        this.tafsirText = tafsirText;
        this.book = book;
        this.verseId = verseId;
        this.visible = visible;
    }

    // Define any model methods here
}
