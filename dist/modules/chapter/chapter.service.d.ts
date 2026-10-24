import { DatabaseService } from '../../database/database.service';
import { AddChapterDto, UpdateChapterDto, SearchChapterDto, ToggleChapterStatusDto } from './dto/chapter.dto';
export declare class ChapterService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    private parseSpResponse;
    add(dto: AddChapterDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getAll(): Promise<any>;
    update(dto: UpdateChapterDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    search(c: SearchChapterDto): Promise<any>;
    delete(id: number | string): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getBySubject(subjectId: number | string): Promise<any>;
    toggleStatus(dto: ToggleChapterStatusDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getById(id: number | string): Promise<{
        ok: boolean;
        msg: string;
        data?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        error: any;
        data?: undefined;
    }>;
}
