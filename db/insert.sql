-- We'll use these as the basis for the first couple of get request tests

-- Connecting youtube videos to classes
INSERT INTO Class (class_number, host) VALUES (1, 'facebook');
INSERT INTO Class (class_number, host) VALUES (2, 'facebook');
INSERT INTO Class (class_number, host) VALUES (3, 'facebook');
INSERT INTO Class (class_number, host) VALUES (4, 'facebook');
INSERT INTO Class (class_number, host) VALUES (5, 'facebook');

-- Identifying the surah numbers that quran journey has covered/ is covering
INSERT INTO Surah (surah_number) VALUES (79);
INSERT INTO Surah (surah_number) VALUES (80);
INSERT INTO Surah (surah_number) VALUES (81);
INSERT INTO Surah (surah_number) VALUES (82);
INSERT INTO Surah (surah_number) VALUES (83);

-- Identifying the notes coresponding to each surah
INSERT INTO Notes (surah, notes_file) VALUES (1, "app/notes/QJ-79-Surat al-Naba.pdf");
INSERT INTO Notes (surah, notes_file) VALUES (2, "app/notes/QJ-80-Surat al-Nazi'at.pdf");
INSERT INTO Notes (surah, notes_file) VALUES (3, "app/notes/QJ-081-'Abasa - full .pdf");
INSERT INTO Notes (surah, notes_file) VALUES (4, "app/notes/QJ-Class-4-Post-Class-Notes-Surat-At-Takweer.pdf");
INSERT INTO Notes (surah, notes_file) VALUES (5, "app/notes/QJ-Surah-082-Al-Infitar.pdf");

-- Pointing out which surahs were covered in each class
-- Class 1
INSERT INTO ClassSurah (class_number, surah_number) VALUES (1, 1);
-- Class 2
INSERT INTO ClassSurah (class_number, surah_number) VALUES (2, 2);
-- Class 3
INSERT INTO ClassSurah (class_number, surah_number) VALUES (3, 2);
INSERT INTO ClassSurah (class_number, surah_number) VALUES (3, 3);
-- Class 4
INSERT INTO ClassSurah (class_number, surah_number) VALUES (4, 3);
INSERT INTO ClassSurah (class_number, surah_number) VALUES (4, 4);
-- Class 5
INSERT INTO ClassSurah (class_number, surah_number) VALUES (5, 4);
