import { SyllabusService } from './syllabus.service';
import { AddSyllabusDto, UpdateSyllabusDto, SearchSyllabusDto, GetSyllabusByCourseSemesterDto } from './dto';
export declare class SyllabusController {
    private readonly syllabusService;
    constructor(syllabusService: SyllabusService);
    add(body: AddSyllabusDto): Promise<{
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
    update(body: UpdateSyllabusDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    search(body: SearchSyllabusDto): Promise<any>;
    getByCourseSemester(body: GetSyllabusByCourseSemesterDto): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
}
