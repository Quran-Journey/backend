export class Surah {
  surahId?: number;
  surahNumber?: number;
  nameComplex?: string;
  nameArabic?: string;

  constructor(surahId: number, surahNumber: number, nameComplex: string, nameArabic: string) {
      this.surahId = surahId;
      this.surahNumber = surahNumber;
      this.nameComplex = nameComplex;
      this.nameArabic = nameArabic;
  }

  // Define any model methods here
}

