export class SurahInfo {
    surahInfoId?: number;
    surah?: number;
    title?: string;
    info?: string;

    constructor(surahInfoId: number, surah: number, title: string, info: string) {
        this.surahInfoId = surahInfoId;
        this.surah = surah;
        this.title = title;
        this.info = info;
    }

    // Define any model methods here
}
