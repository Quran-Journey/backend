export class Book {
    bookId?: number;
    author?: number;
    title?: string;
    constructor(bookId: number, author: number, title: string) {
        this.bookId = bookId;
        this.author = author;
        this.title = title;
    }

    // Define any model methods here
}
