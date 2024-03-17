export class Note {
    fileName?: string;
    fileSize?: number;
    url?: string;
    dateModified?: string;

    constructor(
        fileName?: string,
        fileSize?: number,
        url?: string,
        dateModified?: string
    ) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.url = url;
        this.dateModified = dateModified;
    }

}
