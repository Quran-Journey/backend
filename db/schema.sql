-- We can use surah_number to make an api request to https://api.quran.com/api/v4/chapters/(surah_number)
-- and get all of the remaining information
-- We can use this table along with lessonSurah to obtain the notes for a lesson
CREATE TABLE Surah (
    surah_number INTEGER, -- This is the number corresponding to the surah in question
    revelation_place VARCHAR(20),
    revelation_order INTEGER,
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50), -- TODO: check if this is how we can store the arabic name, I think it's fine
    verses_count INTEGER,
    num_pages INTEGER,
    english_name VARCHAR(50),
    
    UNIQUE (surah_number)
);

-- We've separated the notes because they could be used in multiple lessones
CREATE TABLE Notes(
    notes_file VARCHAR(200), -- This is the location of the notes file, essentially just the file name as we will be storing them all in the same place.
    surah INTEGER,
    version INTEGER, -- why is the word version highlighted in blue? This will be the version of the notes (i.e. v1.2). As the notes might get updated for the same surah

    constraint SurahNotesFk foreign key (surah) references Surah(surah_number) on update cascade on delete cascade
);

-- This will store the locations for the video and audio file for a lesson
CREATE TABLE Lesson (
    lesson_number INTEGER NOT NULL PRIMARY KEY, -- This implies we will need to add the lesson number ourselves.
    lesson_date DATE NOT NULL, 
    source TEXT NOT NULL, -- The host from which we will fetch the video (i.e. youtube or facebook)
    audio_file VARCHAR(200), -- This is the name of the audio file

    UNIQUE (lesson_number)
);


-- The following table exists so that we can have multiple surahs in the same lesson, or multiple lessones covering the same surah.
CREATE TABLE LessonSurah (
    lesson_number INTEGER NOT NULL PRIMARY KEY, -- This column only exists in the case that the serial primary key loses sync.
    surah_number INTEGER,
    
    UNIQUE (lesson_number),
    constraint lessonSurahFk foreign key (lesson_number) references Lesson(lesson_number) on update cascade on delete cascade,
    constraint SurahLessonFk foreign key (surah_number) references Surah(surah_number) on update cascade on delete cascade
);


-- This will allow us to connect more than one Notes file to each lesson, and more than one lesson can use a notes file.
-- CREATE TABLE LessonNotes(
--     cn_id SERIAL PRIMARY KEY,
--     lesson INTEGER,
--     notes INTEGER,

--     constraint lessonNotesFk foreign key (lesson) references Lesson(lesson_number) on update cascade on delete cascade,
--     constraint notesLessonFk foreign key (notes) references Lesson(notes_file) on update cascade on delete cascade
-- )

-- TODO: add tables that store the words that are mentioned in the documents (maybe that should be part of another microservice?)