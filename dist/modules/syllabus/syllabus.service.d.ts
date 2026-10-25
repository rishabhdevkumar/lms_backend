import { DatabaseService } from '../../database/database.service';
import { AddSyllabusDto, UpdateSyllabusDto, SearchSyllabusDto } from './dto';
export declare class SyllabusService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    private parseSpResponse;
    private checkDuplicateName;
    add(dto: AddSyllabusDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    getAll(): Promise<any>;
    update(dto: UpdateSyllabusDto): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
    search(dto: SearchSyllabusDto): Promise<any>;
    getByCourseSemester(courseId: number | string, semesterId: number | string): Promise<any>;
    delete(id: number | string): Promise<{
        ok: boolean;
        msg: string;
        data?: any;
    } | {
        ok: boolean;
        msg: string;
        error: any;
    }>;
}
