-- We can use surah_number to make an api request to https://api.quran.com/api/v4/chapters/(surah_number)
-- But because I'd prefer to store everything for ourselves, we should make the request to that api only once
-- and store them here.
CREATE TABLE Surah (
    surah_id INTEGER NOT NULL, 
    surah_number INTEGER,
    revelation_place VARCHAR(50),
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50), -- TODO: check if this is how we can store the arabic name, I think it's fine
    verses_count INTEGER,
    PRIMARY KEY (surah_id)
);

CREATE TABLE IF NOT EXISTS SurahInfo(
    title VARCHAR(255) NOT NULL,
    text VARCHAR(255),
    PRIMARY KEY (title)
)

CREATE TABLE IF NOT EXISTS LessonSurah(
    lesson_id INTEGER NOT NULL,
    surah_number INTEGER,
    PRIMARY KEY (lesson_id),
    FOREIGN KEY (surah_number)
        REFERENCES Surah(surah_number)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Verse(
    verse_idex INTEGER NOT NULL,
    surah INTEGER,
    PRIMARY KEY (verse_idex),
    FOREIGN KEY (surah)
        REFERENCES Surah(surah_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- This will store the locations for the video and audio file for a lesson
CREATE TABLE IF NOT EXISTS Lesson(
    lesson_id INTEGER NOT NULL,  
    lesson_date DATE NOT NULL,
    source TEXT NOT NULL,
    PRIMARY KEY (lesson_id)
);

CREATE TABLE IF NOT EXISTS VerseExplanation(
    explanation_id INTEGER NOT NULL,
    verse_id INTEGER NOT NULL,
    PRIMARY KEY (explanation_id),
    FOREIGN KEY (verse_id)
        REFERENCES Verse(verse_idex)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

--- 6 Tables done, finish / fix the ones below ---

CREATE TABLE Word (
    word_id SERIAL PRIMARY KEY,
    word INTEGER,
    arabic_representation INTEGER,
    word_meaning TEXT,
    relation TEXT,
    explanation_id INTEGER,
    
    constraint WordExplanationFk foreign key (explanation_id) references VerseExplanation(explanation_id) on update cascade on delete cascade
);

CREATE TABLE RelatedVerse (
    related_verse_id SERIAL PRIMARY KEY,
    verse_1 INTEGER,
    verse_2 INTEGER,
    explanation_of_connection TEXT,
    explanation_id INTEGER,
    
    constraint RelatedVerseExplanationFk foreign key (explanation_id) references VerseExplanation(explanation_id) on update cascade on delete cascade,
    constraint verse1Fk foreign key (verse_1) references verse(verse_id) on update cascade on delete cascade,
    constraint verse2Fk foreign key (verse_2) references verse(verse_id) on update cascade on delete cascade
);

CREATE TABLE Hadith (
    hadith_id SERIAL PRIMARY KEY,
    hadith TEXT,
    source VARCHAR(50),
    authentication_level varchar(50),
    explanation_id INTEGER,
    
    constraint HadithVerseExplanationFk foreign key (explanation_id) references VerseExplanation(explanation_id) on update cascade on delete cascade
);


-- We've separated the notes because they could be used in multiple lessones
CREATE TABLE Notes(
    notes_id SERIAL PRIMARY KEY,
    notes_file VARCHAR(200), -- This is the location of the notes file, essentially just the file name as we will be storing them all in the same place.
    surah INTEGER,
    version INTEGER, -- why is the word version highlighted in blue? This will be the version of the notes (i.e. v1.2). As the notes might get updated for the same surah

    constraint SurahNotesFk foreign key (surah) references Surah(surah_number) on update cascade on delete cascade
);

