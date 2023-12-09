
class Book {
  private author: string;
  private bookId: number;
  private title: string;
  constructor(bookId:number, author:string, title:string) {
    this.bookId = bookId;
    this.author = author;
    this.title = title;
  }

  // Define any model methods here
}

export default Book;
