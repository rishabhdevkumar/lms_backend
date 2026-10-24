import { SubjectService } from './subject.service';
import { AddSubjectDto, UpdateSubjectDto, SearchSubjectDto, ToggleSubjectStatusDto, GetByCourseSemesterDto } from './dto/subject.dto';
export declare class SubjectController {
    private readonly subjectService;
    constructor(subjectService: SubjectService);
    add(body: AddSubjectDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getAll(): Promise<any>;
    getAllPost(): Promise<any>;
    update(body: UpdateSubjectDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    updatePost(body: UpdateSubjectDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    updateById(id: string, body: UpdateSubjectDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    updateByIdPost(id: string, body: UpdateSubjectDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    search(body: SearchSubjectDto): Promise<any>;
    searchGet(query: SearchSubjectDto): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getByCourseSemesterGet(courseId: string, semesterId: string): Promise<any>;
    getByCourseSemester(body: GetByCourseSemesterDto): Promise<any>;
    toggleStatus(body: ToggleSubjectStatusDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getChapterCount(paramId?: string, queryId?: string): Promise<any>;
    getChapterCountPost(body?: {
        subject_id?: number;
    }): Promise<any>;
}
