/**
 *  @schema SurahInfo
 *  type: object
 *  required:
 *      - surah_info_id
 *      - surah
 *      - title
 *      - info
 *  properties:
 *      surah_info_id:
 *          type: integer
 *          description: to uniquely identify the surah info from others
 *          example: 1
 *      surah:
 *          type: integer
 *          description: to identify the surah that the surah info is refering to
 *          example: 23
 *      title:
 *          type: string
 *          description: a title to the surah info section
 *          example: "Opening of The Quran"
 *      info:
 *          type: string
 *          description: information regarding the surah
 *          example: "This surah was..."
 */
class SurahInfo {
    constructor(surahInfoId, surah, title, info) {
        this.surahInfoId = surahInfoId;
        this.surah = surah;
        this.title = title;
        this.info = info;
    }

    // Define any model methods here
}

module.exports = SurahInfo;
