import { DatabaseService } from '../../database/database.service';
import { AddSubjectDto, UpdateSubjectDto, SearchSubjectDto, ToggleSubjectStatusDto } from './dto/subject.dto';
export declare class SubjectService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    private parseSpResponse;
    add(dto: AddSubjectDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getAll(): Promise<any>;
    update(dto: UpdateSubjectDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    search(c: SearchSubjectDto): Promise<any>;
    delete(id: number | string): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getByCourseSemester(courseId: number | string, semesterId: number | string): Promise<any>;
    toggleStatus(dto: ToggleSubjectStatusDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getChapterCount(subjectId?: number | string): Promise<any>;
}
