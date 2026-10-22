import { CourseDetailsService } from './course-details.service';
import { CreateCourseDetailDto, UpdateCourseDetailDto, UpdateCourseDetailStatusDto } from './dto';
export declare class CourseDetailsController {
    private readonly courseDetailsService;
    constructor(courseDetailsService: CourseDetailsService);
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
    getAllPost(): Promise<{
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
    getByCourseId(courseId: number): Promise<{
        ok: boolean;
        msg: string;
        data: any;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
    }>;
    getById(id: number): Promise<{
        ok: boolean;
        msg: string;
        data: any;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
    }>;
    updatePost(dto: UpdateCourseDetailDto): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    update(id: number, dto: UpdateCourseDetailDto): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    updateStatusPost(dto: UpdateCourseDetailStatusDto): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    updateStatus(id: number, dto: UpdateCourseDetailStatusDto): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    deletePost(id: number): Promise<{
        ok: boolean;
        result: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        result?: undefined;
    }>;
    delete(id: number): Promise<{
        ok: boolean;
        result: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        result?: undefined;
    }>;
}
