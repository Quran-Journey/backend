DROP TABLE IF EXISTS Surah; 
CREATE TABLE IF NOT EXISTS Surah (
    surah_id INTEGER NOT NULL, 
    surah_number INTEGER NOT NULL,
    revelation_place VARCHAR(100),
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50),
    verse_count INTEGER NOT NULL,
    PRIMARY KEY (surah_id)
);

DROP TABLE IF EXISTS SurahInfo; 
CREATE TABLE IF NOT EXISTS SurahInfo(
    title VARCHAR(255) NOT NULL,
    info TEXT,
    PRIMARY KEY (title)
);

DROP TABLE IF EXISTS Verse; 
CREATE TABLE IF NOT EXISTS Verse(
    verse_index INTEGER NOT NULL,
    surah INTEGER NOT NULL,
    PRIMARY KEY (verse_index),
    FOREIGN KEY (surah)
        REFERENCES Surah(surah_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Lesson; 
CREATE TABLE IF NOT EXISTS Lesson(
    lesson_id INTEGER NOT NULL,  
    lesson_date DATE NOT NULL,
    source TEXT NOT NULL,
    PRIMARY KEY (lesson_id)
);

DROP TABLE IF EXISTS LessonSurah; 
CREATE TABLE IF NOT EXISTS LessonSurah(
    lesson_id INTEGER NOT NULL,
    surah_id INTEGER NOT NULL,
    PRIMARY KEY (lesson_id, surah_id),
    FOREIGN KEY (lesson_id)
        REFERENCES Lesson(lesson_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (surah_id)
        REFERENCES Surah(surah_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS VerseExplanation; 
CREATE TABLE IF NOT EXISTS VerseExplanation(
    explanation_id INTEGER NOT NULL,
    verse_id INTEGER NOT NULL,
    PRIMARY KEY (explanation_id),
    FOREIGN KEY (verse_id)
        REFERENCES Verse(verse_index)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS WordExplaination; 
CREATE TABLE IF NOT EXISTS WordExplaination(
    explanation_id INTEGER NOT NULL,
    root_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
    explaination TEXT,
    PRIMARY KEY (root_id),
    FOREIGN KEY (explanation_id)
        REFERENCES VerseExplanation(explanation_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Tafsir; 
CREATE TABLE IF NOT EXISTS Tafsir(
    explanation_id INTEGER NOT NULL,
    tafsir_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
    PRIMARY KEY (tafsir_id),
    FOREIGN KEY (explanation_id)
        REFERENCES VerseExplanation(explanation_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Reflections; 
CREATE TABLE IF NOT EXISTS Reflections(
    explanation_id INTEGER NOT NULL,
    reflection_id INTEGER NOT NULL,
    title TEXT NOT NULL, 
    reflection TEXT,
    PRIMARY KEY (reflection_id),
    FOREIGN KEY (explanation_id)
        REFERENCES VerseExplanation(explanation_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);