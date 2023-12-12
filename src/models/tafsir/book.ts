export class Book {
    bookId?: number;
    author?: string;
    title?: string;
    constructor(bookId: number, author: string, title: string) {
        this.bookId = bookId;
        this.author = author;
        this.title = title;
    }

    // Define any model methods here
}
