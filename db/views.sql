-- This view will connect each surah to it's notes (we've assumed each surah might have multiple notes)
create view surahNotes as SELECT * from Surah s join Notes n on n.surah=s.surah_number;


create view lessonContents as select source, surah from program join (select source, audio_file, l.lesson_number, surah_number from Lesson l join LessonSurah ls on l.lesson_number = ls.lesson_number) as foo on foo.surah_number=program.program_id;



GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO maadmin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO maadmin;