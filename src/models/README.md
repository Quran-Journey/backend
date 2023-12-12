# Models

This folder contains all of our models. Models are not direct mappings from the database, rather they are abstractions that help us to structure the data in more useful ways. Closely related models may be placed in sub folders.

For example, lets say we store root words and their meanings in our database like so (please note that this may not be an exact example taken from the database):
```
CREATE TABLE
    IF NOT EXISTS RootWord (
        rootId SERIAL PRIMARY KEY,
        rootWord VARCHAR(225) NOT NULL UNIQUE
    );

CREATE TABLE
    IF NOT EXISTS RootMeaning (
        meaningId SERIAL PRIMARY KEY,
        rootId INTEGER NOT NULL,
        meaning TEXT,
        FOREIGN KEY (rootId) REFERENCES RootWord(rootId) ON DELETE CASCADE ON UPDATE CASCADE
    );
```

The model for this table could look something like this:
```
class RootWord {
    constructor(rootId, rootWord) {
        this.rootId = rootId;
        this.rootWord = rootWord;
        this.meanings = [];
    }

    /**
     * Adds a single meaning to a the list of meanings
     *
     * @param {string} meaning the meaning to be added
     */
    addMeaning(meaning) {
        this.meanings.push();
    }
    /**
     * Adds a list of meanings to the existing meanings.
     *
     * @param {List[string]} meaning the meaning to be added
     */
    addMeanings(newMeanings) {
        this.meanings = [...this.meanings, ...newMeanings];
    }
    // Define any model methods here
}
```

In this example, the `meanings` attribute inside of the `RootWord` class constructor allows us to store multiple meanings associated with the root word.

## Documentation
Each file in this folder is prepended with schema documentation using oas formatting in a javascript block comment. Our documentation process pulls directly from this block comment, so ensure to keep these comments as accurate as possible.

To see our database schema, see the `/db` folder.
