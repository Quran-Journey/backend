/**
 * @schema SurahInfo
 * type: object
 * required:
 * - surah_info_id
 * - surah
 * - title
 * - info
 * properties:
 * surah_info_id:
 * type: integer
 * description: to uniquely identify the surah info from others
 * example: 1
 * surah:
 * type: integer
 * description: to identify the surah that the surah info is referring to
 * example: 23
 * title:
 * type: string
 * description: a title to the surah info section
 * example: "Opening of The Quran"
 * info:
 * type: string
 * description: information regarding the surah
 * example: "This surah was..."
 */

class SurahInfo {
    surahInfoId: number;
    surah: number;
    title: string;
    info: string;

    constructor(surahInfoId: number, surah: number, title: string, info: string) {
        this.surahInfoId = surahInfoId;
        this.surah = surah;
        this.title = title;
        this.info = info;
    }

    // Define any model methods here
}

export default SurahInfo;
