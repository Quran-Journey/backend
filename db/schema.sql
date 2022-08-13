DROP TABLE IF EXISTS Surah; 
CREATE TABLE IF NOT EXISTS Surah (
    surah_id SERIAL PRIMARY KEY, 
    surah_number INTEGER NOT NULL,
    revelation_place VARCHAR(100),
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50),
    verse_count INTEGER NOT NULL
);

DROP TABLE IF EXISTS SurahInfo; 
CREATE TABLE IF NOT EXISTS SurahInfo (
    surah_info_id SERIAL PRIMARY KEY,
    surah INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    info TEXT NOT NULL,
    FOREIGN KEY (surah) REFERENCES Surah(surah_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Verse; 
CREATE TABLE IF NOT EXISTS Verse (
    verse_index INTEGER PRIMARY KEY,
    surah INTEGER NOT NULL,
    FOREIGN KEY (surah) REFERENCES Surah(surah_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Lesson; 
CREATE TABLE IF NOT EXISTS Lesson (
    lesson_id SERIAL PRIMARY KEY,
    lesson_date DATE NOT NULL,
    source TEXT NOT NULL,
    surah_id INTEGER,

    FOREIGN KEY (surah_id) REFERENCES Surah(surah_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS VerseExplanation; 
CREATE TABLE IF NOT EXISTS VerseExplanation (
    verse_explanation_id SERIAL PRIMARY KEY,
    verse_id INTEGER NOT NULL,
    
    FOREIGN KEY (verse_id) REFERENCES Verse(verse_index) ON DELETE CASCADE ON UPDATE CASCADE
);

-- We may still keep the table below since we may have multiple explanations for the same word

DROP TABLE IF EXISTS WordExplanation; 
CREATE TABLE IF NOT EXISTS WordExplanation (
    word_explanation_id SERIAL PRIMARY KEY,
    verse_explanation_id INTEGER,
    root_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
    word_explaination TEXT, -- This is the contextual explanation that we will give.
    FOREIGN KEY (verse_explanation_id) REFERENCES VerseExplanation(verse_explanation_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Reflection; 
CREATE TABLE IF NOT EXISTS Reflection (
    reflection_id SERIAL PRIMARY KEY,
    verse_explanation_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    reflection TEXT,
    FOREIGN KEY (verse_explanation_id) REFERENCES VerseExplanation(verse_explanation_id) ON DELETE CASCADE ON UPDATE CASCADE
);

--- the quran_text table is defined in quran-simple.sql

DROP TABLE IF EXISTS RootWord CASCADE;
CREATE TABLE IF NOT EXISTS RootWord (
    root_id SERIAL PRIMARY KEY,
    root_word VARCHAR(225) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS ArabicWord CASCADE;
CREATE TABLE IF NOT EXISTS ArabicWord (
    word_id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    root_id INT NOT NULL,
    FOREIGN KEY (root_id) REFERENCES RootWord(root_id) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE IF EXISTS TextToWord CASCADE;
CREATE TABLE IF NOT EXISTS TextToWord  (
    index_id INT NOT NULL,
    word_id INT NOT NULL,
    PRIMARY KEY (index_id, word_id),
    FOREIGN KEY (index_id) REFERENCES Verse(verse_index) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (word_id) REFERENCES ArabicWord(word_id) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE IF EXISTS RootMeaning CASCADE;
CREATE TABLE IF NOT EXISTS RootMeaning  (
    root_word VARCHAR(225) PRIMARY KEY,
    meanings TEXT,
    FOREIGN KEY (root_word) REFERENCES RootWord(root_word) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Tafsir CASCADE;
CREATE TABLE IF NOT EXISTS Tafsir (
    tafsir_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    book TEXT NOT NULL,
    verse_explanation_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
    FOREIGN KEY (verse_explanation_id) REFERENCES VerseExplanation(verse_explanation_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Mufasir CASCADE;
CREATE TABLE IF NOT EXISTS Mufasir (
    mufasir_id SERIAL PRIMARY KEY,
    mufasir_name TEXT NOT NULL,
    death VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS Book CASCADE;
CREATE TABLE IF NOT EXISTS Tafsir (
    book_id SERIAL PRIMARY KEY,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (author) REFERENCES Mufasir(mufasir_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS MufasirTafsir CASCADE;
CREATE TABLE IF NOT EXISTS MufasirTafsir (
    mufasir INT,
    tafsir INT,
    FOREIGN KEY (mufasir) REFERENCES Mufasir(mufasir_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tafsir) REFERENCES Tafsir(tafsir_id) ON DELETE CASCADE ON UPDATE CASCADE
);
