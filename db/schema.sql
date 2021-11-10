-- We can use surah_number to make an api request to https://api.quran.com/api/v4/chapters/{surah_number}
-- and get all of the remaining information
-- We can use this table along with classSurah to obtain the notes for a class
CREATE TABLE Surah {
    surah_number INTEGER, -- This is the number corresponding to the surah in question
    revelation_place VARCHAR(20),
    revelation_order INTEGER,
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50), -- TODO: check if this is how we can store the arabic name, I think it's fine
    verses_count INTEGER,
    num_pages INTEGER,
    english_name VARCHAR(50)
    
    UNIQUE surah_number
}

-- We've separated the notes because they could be used in multiple classes
CREATE TABLE Notes{
    notes_file VARCHAR(200), -- This is the location of the notes file
    surah INTEGER,

    constraint SurahClassFk foreign key (surah) references Surah(title) on update cascade on delete cascade,
    UNIQUE notes_file
}

-- This will store the locations for the video and audio file for a class
CREATE TABLE Class {
    class_number INTEGER NOT NULL PRIMARY KEY, -- This column only exists in the case that the serial primary key loses sync.
    source TEXT NOT NULL, -- The url from which we will fetch the video
    audio_file VARCHAR(200), -- This is the name of the audio file

    UNIQUE class_number
}


-- The following table exists so that we can have multiple surahs in the same class, or multiple classes covering the same surah.
CREATE TABLE ClassSurah {
    class_number INTEGER NOT NULL PRIMARY KEY, -- This column only exists in the case that the serial primary key loses sync.
    surah_number INTEGER,
    
    UNIQUE(class_number),
    constraint classSurahFk foreign key (class_number) references Class(class_number) on update cascade on delete cascade,
    constraint SurahClassFk foreign key (surah_number) references Surah(title) on update cascade on delete cascade
}


-- This will allow us to connect more than one Notes file to each class, and more than one class can use a notes file.
-- CREATE TABLE ClassNotes{
--     cn_id SERIAL PRIMARY KEY,
--     class INTEGER,
--     notes INTEGER,

--     constraint classNotesFk foreign key (class) references Class(class_number) on update cascade on delete cascade,
--     constraint notesClassFk foreign key (notes) references Class(notes_file) on update cascade on delete cascade
-- }

-- TODO: add tables that store the words that are mentioned in the documents (maybe that should be part of another microservice?)