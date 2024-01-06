import { lessonTests } from './lesson/lesson-tests';
import { reflectionTests } from './reflection-tests';
import { surahInfoTests } from './surah-info-tests';
import { surahTests } from './surah-tests';
import { mufasirTests } from './mufasir-tests';
import { rootTests } from './word/word-tests';
import { meaningTests } from './word/meaning-tests';
import  integratedWordTests  from './word/integrated-word-tests';
import { verseInfoTests } from './verse-info-tests';
import { lessonInfoTests } from './lesson/lesson-info-tests';
import { verseWordTests } from './word/verse-word-tests';
import { tafsirTests } from './tafsir-tests';
import { seedData, seedDatabase } from "../services/postgres/seed";
import connect from '../services/postgres/connect';

const db = connect.db;

describe('Set up', () => {
  test('setup database', async () => {
    await seedDatabase(db);
  }, 30000);
});

describe('Test everything related to lessons', () => {
  lessonTests();
  lessonInfoTests();
});

describe('Test Verse Info', () => {
  verseInfoTests();
});

describe('Test Reflection', () => {
  reflectionTests();
});

describe('Test Surah Related endpoints', () => {
  surahInfoTests();
  surahTests();
});

describe('Test Mufasir', () => {
  mufasirTests();
});

describe('Test everything related to words', () => {
  rootTests();
  meaningTests();
  verseWordTests();
  integratedWordTests();
});

describe('Test Tafsir', () => {
  tafsirTests();
});
