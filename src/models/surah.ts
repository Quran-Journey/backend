/**
 * @schema Surah
 * type: object
 * required:
 * - surah_id
 * - surah_number
 * - name_complex
 * - name_arabic
 * properties:
 * surah_number:
 * type: integer
 * description: the number of the surah (acting as the surah id)
 * example: 1
 * surah_id:
 * type: integer
 * description: the id of the surah
 * example: 1
 * name_complex:
 * type: string
 * description: the name of the surah in english (with complex characters)
 * example: al-Fātihah
 * name_arabic:
 * type: string
 * description: the name of the surah in arabic
 * example: al-Fātihah
 */

class Surah {
  surahId: number;
  surahNumber: number;
  nameComplex: string;
  nameArabic: string;

  constructor(surahId: number, surahNumber: number, nameComplex: string, nameArabic: string) {
      this.surahId = surahId;
      this.surahNumber = surahNumber;
      this.nameComplex = nameComplex;
      this.nameArabic = nameArabic;
  }

  // Define any model methods here
}

export default Surah;
