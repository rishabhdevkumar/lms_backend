import { ChapterService } from './chapter.service';
import { AddChapterDto, UpdateChapterDto, SearchChapterDto, ToggleChapterStatusDto } from './dto/chapter.dto';
export declare class ChapterController {
    private readonly chapterService;
    constructor(chapterService: ChapterService);
    add(body: AddChapterDto): Promise<{
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
    getAllPost(): Promise<any>;
    update(body: UpdateChapterDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    updatePost(body: UpdateChapterDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    updateById(id: string, body: UpdateChapterDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    updateByIdPost(id: string, body: UpdateChapterDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    search(body: SearchChapterDto): Promise<any>;
    searchGet(query: SearchChapterDto): Promise<any>;
    getById(id: string): Promise<{
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
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getBySubjectGet(subjectId: string): Promise<any>;
    getBySubjectPost(body: {
        subject_id: number;
    }): Promise<any>;
    toggleStatus(body: ToggleChapterStatusDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
        affected?: number;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
}
