import { DatabaseService } from '../../database/database.service';
import { CreateCourseDetailDto, UpdateCourseDetailDto, UpdateCourseDetailStatusDto } from './dto';
export declare class CourseDetailsService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    create(dto: CreateCourseDetailDto): Promise<{
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
    getAll(): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        data: any[];
    }>;
    getActive(): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        data: any[];
    }>;
    getById(id: number | string): Promise<{
        ok: boolean;
        msg: string;
        data: any;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
    }>;
    getByCourseId(courseId: number | string): Promise<{
        ok: boolean;
        msg: string;
        data: any;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
    }>;
    update(id: number | string, dto: UpdateCourseDetailDto): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    updateStatus(id: number | string, dto: UpdateCourseDetailStatusDto): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    delete(id: number | string): Promise<{
        ok: boolean;
        result: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        result?: undefined;
    }>;
}
