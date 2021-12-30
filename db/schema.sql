-- We can use surah_number to make an api request to https://api.quran.com/api/v4/chapters/(surah_number)
-- But because I'd prefer to store everything for ourselves, we should make the request to that api only once
-- and store them here.
CREATE TABLE Surah (
    surah_number INTEGER PRIMARY KEY, -- This is the number corresponding to the surah in question
    revelation_place VARCHAR(20),
    revelation_order INTEGER,
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50), -- TODO: check if this is how we can store the arabic name, I think it's fine
    verses_count INTEGER,
    num_pages INTEGER,
    english_name VARCHAR(50)
);

-- We've separated the notes because they could be used in multiple lessones
CREATE TABLE Notes(
    notes_id SERIAL PRIMARY KEY,
    notes_file VARCHAR(200), -- This is the location of the notes file, essentially just the file name as we will be storing them all in the same place.
    surah INTEGER,
    version INTEGER, -- why is the word version highlighted in blue? This will be the version of the notes (i.e. v1.2). As the notes might get updated for the same surah

    constraint SurahNotesFk foreign key (surah) references Surah(surah_number) on update cascade on delete cascade
);

-- This will store the locations for the video and audio file for a lesson
CREATE TABLE Lesson (
    lesson_id SERIAL PRIMARY KEY, -- This implies we will need to add the lesson number ourselves.
    lesson_date DATE NOT NULL, 
    source TEXT NOT NULL -- The host from which we will fetch the video (i.e. youtube or facebook)
);


-- The following table exists so that we can have multiple surahs in the same lesson, or multiple lessones covering the same surah.
CREATE TABLE LessonSurah (
    lesson_id SERIAL PRIMARY KEY,
    surah_number INTEGER,
    
    constraint SurahLessonFk foreign key (surah_number) references Surah(surah_number) on update cascade on delete cascade
);


CREATE TABLE Verse (
    verse_id SERIAL PRIMARY KEY,
    surah_number INTEGER,
    verse_number INTEGER, -- In order to get the verse using quran.com api, we just need the verse and surah number.
    
    constraint SurahLessonFk foreign key (surah_number) references Surah(surah_number) on update cascade on delete cascade
);


CREATE TABLE VerseExplanation (
    explanation_id SERIAL PRIMARY KEY,
    notes_id INTEGER,
    verse_id INTEGER,
    explanation TEXT, -- In order to get the verse using quran.com api, we just need the verse and surah number.
    
    constraint verseBeingExplainedFk foreign key (verse_id) references Verse(verse_id) on update cascade on delete cascade,
    constraint notesContainingExplanationFk foreign key (notes_id) references Notes(notes_id) on update cascade on delete cascade
);

-- TODO: fix up foreign key references

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