import { ChapterService } from './chapter.service';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    search(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
    getById(id: string): Promise<any>;
}
