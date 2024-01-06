export class Reflection {
    reflectionId?: number;
    verseId?: number;
    title?: string;
    reflection?: string;

    constructor(
        reflectionId?: number,
        verseId?: number,
        title?: string,
        reflection?: string
    ) {
        this.reflectionId = reflectionId;
        this.verseId = verseId;
        this.title = title;
        this.reflection = reflection;
    }

    // Define any model methods here
}
