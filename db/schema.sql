-- We can use surah_number to make an api request to https://api.quran.com/api/v4/chapters/(surah_number)
-- But because I'd prefer to store everything for ourselves, we should make the request to that api only once
-- and store them here.
DROP TABLE IF EXISTS Surah; 
CREATE TABLE IF NOT EXISTS Surah (
    surah_id SERIAL PRIMARY KEY, 
    surah_number INTEGER NOT NULL,
    revelation_place VARCHAR(100),
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50), -- TODO: check if this is how we can store the arabic name, I think it's fine
    verse_count INTEGER NOT NULL
);

DROP TABLE IF EXISTS SurahInfo; 
CREATE TABLE IF NOT EXISTS SurahInfo (
    title VARCHAR(255) PRIMARY KEY,
    info TEXT,
);

DROP TABLE IF EXISTS Verse; 
CREATE TABLE IF NOT EXISTS Verse (
    verse_index SERIAL PRIMARY KEY,
    surah INTEGER NOT NULL,
    FOREIGN KEY (surah)
        REFERENCES Surah(surah_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- This will store the locations for the video and audio file for a lesson
DROP TABLE IF EXISTS Lesson; 
CREATE TABLE IF NOT EXISTS Lesson (
    lesson_id SERIAL PRIMARY KEY,
    lesson_date DATE NOT NULL,
    source TEXT NOT NULL
);

DROP TABLE IF EXISTS LessonSurah; 
CREATE TABLE IF NOT EXISTS LessonSurah (
    lesson_id SERIAL,
    surah_id SERIAL,
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
CREATE TABLE IF NOT EXISTS VerseExplanation (
    explanation_id SERIAL PRIMARY KEY,
    verse_id INTEGER NOT NULL,
    FOREIGN KEY (verse_id)
        REFERENCES Verse(verse_index)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS WordExplaination; 
CREATE TABLE IF NOT EXISTS WordExplaination (
    root_id SERIAL PRIMARY KEY,
    explanation_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
    explaination TEXT,
    FOREIGN KEY (explanation_id)
        REFERENCES VerseExplanation(explanation_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Tafsir; 
CREATE TABLE IF NOT EXISTS Tafsir (
    tafsir_id SERIAL PRIMARY KEY,
    explanation_id INTEGER NOT NULL,
    visible BOOLEAN NOT NULL, 
    FOREIGN KEY (explanation_id)
        REFERENCES VerseExplanation(explanation_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Reflections; 
CREATE TABLE IF NOT EXISTS Reflections (
      reflection_id SERIAL PRIMARY KEY,
    explanation_id INTEGER NOT NULL,
    title TEXT NOT NULL, 
    reflection TEXT
    FOREIGN KEY (explanation_id)
        REFERENCES VerseExplanation(explanation_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);