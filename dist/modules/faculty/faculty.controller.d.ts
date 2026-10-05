import { FacultyService } from './faculty.service';
export declare class FacultyController {
    private readonly facultyService;
    constructor(facultyService: FacultyService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    search(body: any): Promise<any>;
    update(body: any): Promise<any>;
    authenticate(body: any): Promise<any>;
    count(): Promise<{
        ok: boolean;
        total_faculty: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        total_faculty?: undefined;
    }>;
    getSelf(user: any): Promise<{
        ok: boolean;
        user: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user: {};
    }>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}
