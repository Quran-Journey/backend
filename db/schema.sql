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
    source TEXT NOT NULL
);

DROP TABLE IF EXISTS LessonSurah; 
CREATE TABLE IF NOT EXISTS LessonSurah (
    lesson_id INTEGER,
    surah_id INTEGER,
    PRIMARY KEY (lesson_id, surah_id),
    FOREIGN KEY (lesson_id) REFERENCES Lesson(lesson_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (surah_id) REFERENCES Surah(surah_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS VerseExplanation; 
CREATE TABLE IF NOT EXISTS VerseExplanation (
    verse_explanation_id SERIAL PRIMARY KEY,
    verse_id INTEGER NOT NULL,
    FOREIGN KEY (verse_id) REFERENCES Verse(verse_index) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS WordExplanation; 
CREATE TABLE IF NOT EXISTS WordExplanation (
    word_explanation_id SERIAL PRIMARY KEY,
    verse_explanation_id INTEGER,
    root_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
    word_explaination TEXT,
    FOREIGN KEY (verse_explanation_id) REFERENCES VerseExplanation(verse_explanation_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Tafsir; 
CREATE TABLE IF NOT EXISTS Tafsir (
    tafsir_id SERIAL PRIMARY KEY,
    verse_explanation_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
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

--- Some comments on the table below 
--- the quran_text table is defined in quran-simple.sql

DROP TABLE IF EXISTS RootWord CASCADE;
CREATE TABLE IF NOT EXISTS RootWord (
    RootID INT PRIMARY KEY,
    RootWord VARCHAR(225) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS ArabicWord CASCADE;
CREATE TABLE IF NOT EXISTS ArabicWord (
    WordID INT PRIMARY KEY,
    Word VARCHAR(255) NOT NULL,
    RootID INT NOT NULL,
    FOREIGN KEY (RootID)
        REFERENCES RootWord(RootID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
DROP TABLE IF EXISTS TextToWord CASCADE;
CREATE TABLE IF NOT EXISTS TextToWord  (
    IndexID INT NOT NULL,
    WordID INT NOT NULL,
    PRIMARY KEY (IndexID, WordID),
    FOREIGN KEY (IndexID)
        REFERENCES quran_text("index")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (WordID)
		REFERENCES ArabicWord(WordID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
DROP TABLE IF EXISTS RootMeaning CASCADE;
CREATE TABLE IF NOT EXISTS RootMeaning  (
    RootWord VARCHAR(225) PRIMARY KEY,
    Meanings TEXT,
    FOREIGN KEY (RootWord)
        REFERENCES RootWord(RootWord)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
